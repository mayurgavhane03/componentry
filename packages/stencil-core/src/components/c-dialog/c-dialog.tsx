import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method,
  Watch,
  Listen,
  h,
} from "@stencil/core";

let openDialogs = 0;

@Component({
  tag: "c-dialog",
  styleUrl: "c-dialog.css",
  shadow: true,
})
export class CDialog {
  @Element() el!: HTMLElement;

  private panel!: HTMLDivElement;
  private overlay!: HTMLDivElement;
  private originalTrigger!: HTMLElement | null;
  private closeWatcher: any;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop({ reflect: true }) label = "";
  @Prop({ attribute: "no-header", reflect: true }) noHeader = false;
  @State() hasFooter = false;

  @Event({ eventName: "c-show" }) cShow!: EventEmitter<void>;
  @Event({ eventName: "c-after-show" }) cAfterShow!: EventEmitter<void>;
  @Event({ eventName: "c-hide" }) cHide!: EventEmitter<void>;
  @Event({ eventName: "c-after-hide" }) cAfterHide!: EventEmitter<void>;
  @Event({ eventName: "c-initial-focus", cancelable: true })
  cInitialFocus!: EventEmitter<void>;
  @Event({ eventName: "c-request-close", cancelable: true })
  cRequestClose!: EventEmitter<{
    source: "close-button" | "keyboard" | "overlay";
  }>;

  componentDidLoad() {
    this.updateFooterSlot();
    if (this.open) {
      this.addOpenListeners();
      this.lockScroll();
    }
  }

  disconnectedCallback() {
    this.removeOpenListeners();
    this.unlockScroll();
  }

  private updateFooterSlot = () => {
    const slot = this.el.shadowRoot?.querySelector(
      'slot[name="footer"]',
    ) as HTMLSlotElement | null;
    this.hasFooter = !!slot && slot.assignedNodes({ flatten: true }).length > 0;
  };

  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const event = this.cRequestClose.emit({ source });
    if (event.defaultPrevented) {
      this.panel.animate(
        [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }] as Keyframe[],
        { duration: 250, easing: "ease" },
      );
      return;
    }
    this.hide();
  }

  private addOpenListeners() {
    if ("CloseWatcher" in window) {
      this.closeWatcher?.destroy();
      this.closeWatcher = new (window as any).CloseWatcher();
      this.closeWatcher.onclose = () => this.requestClose("keyboard");
    } else {
      document.addEventListener("keydown", this.handleDocumentKeyDown);
    }
  }

  private removeOpenListeners() {
    this.closeWatcher?.destroy();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.open) {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  };

  @Listen("keydown")
  handleFocusTrap(event: KeyboardEvent) {
    if (!this.open || event.key !== "Tab") return;
    const focusable = this.panel.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.el.shadowRoot?.activeElement || document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private lockScroll() {
    openDialogs++;
    if (openDialogs === 1) document.body.style.overflow = "hidden";
  }

  private unlockScroll() {
    if (!this.open) return;
    openDialogs = Math.max(0, openDialogs - 1);
    if (openDialogs === 0) document.body.style.overflow = "";
  }

  @Watch("open")
  async handleOpenChange(open: boolean) {
    if (open) {
      this.cShow.emit();
      this.addOpenListeners();
      this.originalTrigger = document.activeElement as HTMLElement;
      this.lockScroll();

      requestAnimationFrame(() => {
        const initialFocus = this.cInitialFocus.emit();
        if (!initialFocus.defaultPrevented) {
          this.panel.focus({ preventScroll: true });
        }
      });

      await Promise.all([
        this.panel.animate(
          [
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1 },
          ] as Keyframe[],
          {
            duration: 250,
            easing: "ease",
            fill: "forwards",
          },
        ).finished,
        this.overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 250,
          fill: "forwards",
        }).finished,
      ]);

      this.cAfterShow.emit();
    } else {
      (this.el.shadowRoot?.activeElement as HTMLElement | null)?.blur();
      this.cHide.emit();
      this.removeOpenListeners();

      await Promise.all([
        this.overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 250,
          fill: "forwards",
        }).finished,
        this.panel.animate(
          [
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.8 },
          ] as Keyframe[],
          {
            duration: 250,
            easing: "ease",
            fill: "forwards",
          },
        ).finished,
      ]);

      this.unlockScroll();

      if (typeof this.originalTrigger?.focus === "function") {
        setTimeout(() => this.originalTrigger?.focus());
      }

      this.cAfterHide.emit();
    }
  }

  /** Shows the dialog. */
  @Method()
  async show() {
    if (this.open) return;
    this.open = true;
  }

  /** Hides the dialog. */
  @Method()
  async hide() {
    if (!this.open) return;
    this.open = false;
  }

  render() {
    return (
      <div
        part="base"
        class={{
          dialog: true,
          "dialog--open": this.open,
          "dialog--has-footer": this.hasFooter,
        }}
      >
        <div
          part="overlay"
          class="dialog__overlay"
          onClick={() => this.requestClose("overlay")}
          tabindex="-1"
          ref={(el) => (this.overlay = el as HTMLDivElement)}
        ></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden={this.open ? "false" : "true"}
          aria-label={this.noHeader ? this.label : undefined}
          aria-labelledby={!this.noHeader ? "title" : undefined}
          tabindex="-1"
          ref={(el) => (this.panel = el as HTMLDivElement)}
        >
          {!this.noHeader && (
            <header part="header" class="dialog__header">
              <h2 part="title" class="dialog__title" id="title">
                <slot name="label">
                  {this.label.length > 0 ? this.label : "\uFEFF"}
                </slot>
              </h2>
              <div part="header-actions" class="dialog__header-actions">
                <slot name="header-actions"></slot>
                <c-icon-button
                  part="close-button"
                  exportparts="base:close-button__base"
                  class="dialog__close"
                  name="x-lg"
                  label="Close"
                  library="system"
                  onClick={() => this.requestClose("close-button")}
                ></c-icon-button>
              </div>
            </header>
          )}

          <div part="body" class="dialog__body" tabindex="-1">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer" onSlotchange={this.updateFooterSlot}></slot>
          </footer>
        </div>
      </div>
    );
  }
}
