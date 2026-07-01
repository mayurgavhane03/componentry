import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Method,
  Watch,
  h,
  Host,
} from "@stencil/core";

let openDrawerCount = 0;
let originalBodyOverflow = "";

/**
 * @part base - The component's base wrapper.
 * @part overlay - The overlay that covers the screen behind the drawer.
 * @part panel - The drawer's panel (where the drawer and its content are rendered).
 * @part header - The drawer's header. This element wraps the title and header actions.
 * @part header-actions - Optional actions to add to the header.
 * @part title - The drawer's title.
 * @part close-button - The close button.
 * @part body - The drawer's body.
 * @part footer - The drawer's footer.
 *
 * @slot - The drawer's main content.
 * @slot label - The drawer's label. Alternatively, use the `label` prop.
 * @slot header-actions - Optional actions to add to the header.
 * @slot footer - The drawer's footer, usually one or more buttons.
 *
 * @event cShow - Emitted when the drawer opens.
 * @event cAfterShow - Emitted after the drawer opens and all animations are complete.
 * @event cHide - Emitted when the drawer closes.
 * @event cAfterHide - Emitted after the drawer closes and all animations are complete.
 * @event cInitialFocus - Emitted when the drawer opens and is ready to receive focus.
 *   Calling `event.preventDefault()` prevents focusing and lets you set it elsewhere.
 * @event cRequestClose - Emitted when the user attempts to close the drawer by clicking the
 *   close button, clicking the overlay, or pressing escape. `event.detail.source` is one of
 *   'close-button' | 'keyboard' | 'overlay'. Calling `event.preventDefault()` keeps it open.
 */
@Component({
  tag: "c-drawer",
  styleUrl: "c-drawer.css",
  shadow: true,
})
export class CDrawer {
  @Element() el!: HTMLElement;

  private drawerEl?: HTMLElement;
  private panelEl?: HTMLElement;
  private overlayEl?: HTMLElement;
  private originalTrigger: HTMLElement | null = null;
  private closeWatcher: any | null = null;
  private didInit = false;

  /** Indicates whether or not the drawer is open. Toggle this to show/hide, or use show()/hide(). */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. Always provide one even with `noHeader`,
   * for accessibility. For HTML content use the `label` slot instead.
   */
  @Prop({ reflect: true }) label = "";

  /** The direction from which the drawer will open. */
  @Prop({ reflect: true }) placement: "top" | "end" | "bottom" | "start" =
    "end";

  /**
   * By default the drawer slides out of its containing block (usually the viewport). Set this
   * to make it slide out of its parent element instead — add `position: relative` to the parent.
   */
  @Prop({ reflect: true }) contained = false;

  /**
   * Removes the header. This also removes the default close button, so ensure you provide an
   * easy, accessible way for users to dismiss the drawer.
   */
  @Prop({ attribute: "no-header", reflect: true }) noHeader = false;
  /**
   * When true, clicking the overlay (mask) will not close the drawer.
   */
  @Prop({ attribute: "no-mask-closable", reflect: true }) noMaskClosable =
    false;
  /** Internal flag used purely to drive a CSS class for showing/hiding the footer slot. */
  @State() hasFooter = false;

  @Event({ eventName: "cShow" }) cShow!: EventEmitter<void>;
  @Event({ eventName: "cAfterShow" }) cAfterShow!: EventEmitter<void>;
  @Event({ eventName: "cHide" }) cHide!: EventEmitter<void>;
  @Event({ eventName: "cAfterHide" }) cAfterHide!: EventEmitter<void>;
  @Event({ eventName: "cInitialFocus", cancelable: true })
  cInitialFocus!: EventEmitter<void>;
  @Event({ eventName: "cRequestClose", cancelable: true })
  cRequestClose!: EventEmitter<{
    source: "close-button" | "keyboard" | "overlay";
  }>;

  componentDidLoad() {
    this.didInit = true;
    this.updateFooterSlotState();

    if (this.drawerEl) {
      this.drawerEl.hidden = !this.open;
    }

    if (this.open) {
      this.addOpenListeners();
      if (!this.contained) {
        this.lockBodyScrolling();
      }
    }
  }

  disconnectedCallback() {
    this.unlockBodyScrolling();
    this.removeOpenListeners();
  }

  private updateFooterSlotState() {
    const footerSlot = this.el.shadowRoot?.querySelector(
      'slot[name="footer"]',
    ) as HTMLSlotElement | null;
    this.hasFooter =
      !!footerSlot && footerSlot.assignedNodes({ flatten: true }).length > 0;
  }

  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const cRequestClose = this.cRequestClose.emit({ source });

    // Stencil's CustomEvent wrapper exposes defaultPrevented on the returned CustomEvent
    if ((cRequestClose as unknown as CustomEvent).defaultPrevented) {
      this.animateDenyClose();
      return;
    }

    this.hide();
  }

  private animateDenyClose() {
    if (!this.panelEl) return;
    this.panelEl.animate(
      [{ scale: "1" } as any, { scale: "1.01" } as any, { scale: "1" } as any],
      { duration: 250 },
    );
  }

  private addOpenListeners() {
    if ("CloseWatcher" in window) {
      this.closeWatcher?.destroy();
      if (!this.contained) {
        // @ts-ignore - CloseWatcher may not be in the TS lib yet
        this.closeWatcher = new (window as any).CloseWatcher();
        this.closeWatcher.onclose = () => this.requestClose("keyboard");
      }
    } else {
      document.addEventListener("keydown", this.handleDocumentKeyDown);
    }
  }

  private removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    this.closeWatcher?.destroy();
    this.closeWatcher = null;
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Contained drawers aren't modal and don't respond to the escape key
    if (this.contained) return;

    if (event.key === "Escape" && this.open) {
      event.stopImmediatePropagation();
      this.requestClose("keyboard");
    }
  };

  private lockBodyScrolling() {
    if (openDrawerCount === 0) {
      originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    openDrawerCount++;
  }

  private unlockBodyScrolling() {
    if (openDrawerCount > 0) {
      openDrawerCount--;
      if (openDrawerCount === 0) {
        document.body.style.overflow = originalBodyOverflow;
      }
    }
  }

  private getShowKeyframes(): Keyframe[] {
    switch (this.placement) {
      case "top":
        return [
          { opacity: 0, translate: "0 -100%" },
          { opacity: 1, translate: "0 0" },
        ] as Keyframe[];
      case "bottom":
        return [
          { opacity: 0, translate: "0 100%" },
          { opacity: 1, translate: "0 0" },
        ] as Keyframe[];
      case "start":
        return [
          { opacity: 0, translate: "-100%" },
          { opacity: 1, translate: "0" },
        ] as Keyframe[];
      case "end":
      default:
        return [
          { opacity: 0, translate: "100%" },
          { opacity: 1, translate: "0" },
        ] as Keyframe[];
    }
  }

  private getHideKeyframes(): Keyframe[] {
    return [...this.getShowKeyframes()].reverse() as Keyframe[];
  }

  private async animateElement(
    el: HTMLElement | undefined | null,
    keyframes: Keyframe[],
  ): Promise<void> {
    if (!el) return;
    el.getAnimations().forEach((a) => a.cancel());
    const animation = el.animate(keyframes, {
      duration: 250,
      easing: "ease",
      fill: "both",
    });
    return new Promise((resolve) => {
      animation.addEventListener("finish", () => resolve());
      animation.addEventListener("cancel", () => resolve());
    });
  }

  @Watch("open")
  async handleOpenChange(newValue: boolean) {
    if (!this.didInit) return;

    if (newValue) {
      await this.showDrawer();
    } else {
      await this.hideDrawer();
    }
  }

  @Watch("contained")
  handleContainedChange() {
    if (this.open && !this.contained) {
      this.lockBodyScrolling();
    }
    if (this.open && this.contained) {
      this.unlockBodyScrolling();
    }
  }

  private async showDrawer() {
    this.cShow.emit();
    this.addOpenListeners();
    this.originalTrigger = document.activeElement as HTMLElement;

    if (!this.contained) {
      this.lockBodyScrolling();
    }

    // Safari can jitter the open animation when an autofocus target steals focus mid-animation.
    // Temporarily remove the attribute, focus manually, then restore it.
    const autoFocusTarget = this.el.querySelector(
      "[autofocus]",
    ) as HTMLElement | null;
    if (autoFocusTarget) {
      autoFocusTarget.removeAttribute("autofocus");
    }

    if (this.drawerEl) this.drawerEl.hidden = false;

    requestAnimationFrame(() => {
      const cInitialFocus = this.cInitialFocus.emit();

      if (!(cInitialFocus as unknown as CustomEvent).defaultPrevented) {
        if (autoFocusTarget) {
          autoFocusTarget.focus({ preventScroll: true });
        } else if (this.panelEl) {
          this.panelEl.focus({ preventScroll: true });
        }
      }

      if (autoFocusTarget) {
        autoFocusTarget.setAttribute("autofocus", "");
      }
    });

    await Promise.all([
      this.animateElement(this.panelEl, this.getShowKeyframes()),
      this.animateElement(this.overlayEl, [{ opacity: 0 }, { opacity: 1 }]),
    ]);

    this.cAfterShow.emit();
  }

  private async hideDrawer() {
    (document.activeElement as HTMLElement | null)?.blur?.();
    this.cHide.emit();
    this.removeOpenListeners();

    if (!this.contained) {
      this.unlockBodyScrolling();
    }

    await Promise.all([
      this.animateElement(this.overlayEl, [{ opacity: 1 }, { opacity: 0 }]),
      this.animateElement(this.panelEl, this.getHideKeyframes()),
    ]);

    if (this.drawerEl) this.drawerEl.hidden = true;

    const trigger = this.originalTrigger;
    if (typeof trigger?.focus === "function") {
      setTimeout(() => trigger.focus());
    }

    this.cAfterHide.emit();
  }

  /** Shows the drawer. */
  @Method()
  async show() {
    if (this.open) return;
    this.open = true;
    return new Promise<void>((resolve) => {
      const handler = () => {
        this.el.removeEventListener("cAfterShow", handler);
        resolve();
      };
      this.el.addEventListener("cAfterShow", handler);
    });
  }

  /** Hides the drawer. */
  @Method()
  async hide() {
    if (!this.open) return;
    this.open = false;
    return new Promise<void>((resolve) => {
      const handler = () => {
        this.el.removeEventListener("cAfterHide", handler);
        resolve();
      };
      this.el.addEventListener("cAfterHide", handler);
    });
  }

  render() {
    const dir = document.documentElement.dir === "rtl" ? "rtl" : "ltr";

    return (
      <Host>
        <div
          part="base"
          ref={(el) => (this.drawerEl = el as HTMLElement)}
          class={{
            drawer: true,
            "drawer--open": this.open,
            "drawer--top": this.placement === "top",
            "drawer--end": this.placement === "end",
            "drawer--bottom": this.placement === "bottom",
            "drawer--start": this.placement === "start",
            "drawer--contained": this.contained,
            "drawer--fixed": !this.contained,
            "drawer--rtl": dir === "rtl",
            "drawer--has-footer": this.hasFooter,
          }}
        >
          <div
            part="overlay"
            class="drawer__overlay"
            onClick={() => {
              if (!this.noMaskClosable) {
                this.requestClose("overlay");
              }
            }}
            tabIndex={-1}
            ref={(el) => (this.overlayEl = el as HTMLElement)}
          ></div>

          <div
            part="panel"
            class="drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-hidden={this.open ? "false" : "true"}
            aria-label={this.noHeader ? this.label : undefined}
            aria-labelledby={!this.noHeader ? "title" : undefined}
            tabIndex={0}
            ref={(el) => (this.panelEl = el as HTMLElement)}
          >
            {!this.noHeader && (
              <header part="header" class="drawer__header">
                <h2 part="title" class="drawer__title" id="title">
                  {/* If there's no label, use an invisible character to prevent the header from collapsing */}
                  <slot name="label">
                    {this.label.length > 0
                      ? this.label
                      : String.fromCharCode(65279)}
                  </slot>
                </h2>
                <div part="header-actions" class="drawer__header-actions">
                  <slot name="header-actions"></slot>
                  <c-button
                    part="close-button"
                    class="drawer__close"
                    aria-label="Close"
                    onClick={() => this.requestClose("close-button")}
                    varient="text"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 4L12 12M12 4L4 12"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </c-button>
                </div>
              </header>
            )}

            <div part="body" class="drawer__body">
              <slot></slot>
            </div>

            <footer part="footer" class="drawer__footer">
              <slot
                name="footer"
                onSlotchange={() => this.updateFooterSlotState()}
              ></slot>
            </footer>
          </div>
        </div>
      </Host>
    );
  }
}
