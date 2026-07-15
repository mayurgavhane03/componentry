import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Watch,
  Method,
  h,
  Host,
} from "@stencil/core";


@Component({
  tag: "c-accordion",
  styleUrl: "c-accordion.css",
  shadow: true,
})
export class CAccordion {
  @Element() el!: HTMLElement;

  private detailsEl!: HTMLDetailsElement;
  private headerEl!: HTMLElement;
  private bodyEl!: HTMLElement;
  private detailsObserver!: MutationObserver;
  private currentAnimation?: Animation;

  @Prop({ mutable: true, reflect: true }) open = false;

  @Prop() summary!: string;

  @Prop({ reflect: true }) disabled = false;

  @State() isRtl = false;

  @Event({
    eventName: "c-show",
    cancelable: true,
    bubbles: true,
    composed: true,
  })
  cShow!: EventEmitter<void>;

  @Event({ eventName: "cAfterShow", bubbles: true, composed: true })
  cAfterShow!: EventEmitter<void>;

  @Event({
    eventName: "cHide",
    cancelable: true,
    bubbles: true,
    composed: true,
  })
  cHide!: EventEmitter<void>;

  @Event({ eventName: "cAfterHide", bubbles: true, composed: true })
  cAfterHide!: EventEmitter<void>;

  componentDidLoad() {
    this.isRtl = getComputedStyle(this.el).direction === "rtl";

    if (this.bodyEl) {
      this.bodyEl.style.height = this.open ? "auto" : "0";
    }
    if (this.open && this.detailsEl) {
      this.detailsEl.open = true;
    }

    // Keep the native <details> element's open state in sync with the `open` prop, in case
    // something toggles the native element directly (e.g. clicking the native marker).
    this.detailsObserver = new MutationObserver((changes) => {
      for (const change of changes) {
        if (change.type === "attributes" && change.attributeName === "open") {
          if (this.detailsEl.open) {
            this.show();
          } else {
            this.hide();
          }
        }
      }
    });
    this.detailsObserver.observe(this.detailsEl, { attributes: true });
  }

  disconnectedCallback() {
    this.detailsObserver.disconnect();
  }

  private handleSummaryClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
      this.headerEl.focus();
    }
  };

  private handleSummaryKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  };

  private async stopAnimations() {
    this.currentAnimation?.cancel();
    this.currentAnimation = undefined;
  }

  private async animateBody(
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
  ) {
    await this.stopAnimations();
    this.currentAnimation = this.bodyEl.animate(keyframes, options);
    await this.currentAnimation.finished.catch(() => {
      /* animation was canceled */
    });
  }

  @Watch("open")
  async handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.detailsEl.open = true;

      const showEvent = this.cShow.emit();
      if (showEvent.defaultPrevented) {
        this.open = false;
        this.detailsEl.open = false;
        return;
      }

      const scrollHeight = this.bodyEl.scrollHeight;
      await this.animateBody(
        [
          { height: "0", opacity: "0" },
          { height: `${scrollHeight}px`, opacity: "1" },
        ],
        { duration: 250, easing: "linear" },
      );
      this.bodyEl.style.height = "auto";

      this.cAfterShow.emit();
    } else {
      const hideEvent = this.cHide.emit();
      if (hideEvent.defaultPrevented) {
        this.detailsEl.open = true;
        this.open = true;
        return;
      }

      const scrollHeight = this.bodyEl.scrollHeight;
      await this.animateBody(
        [
          { height: `${scrollHeight}px`, opacity: "1" },
          { height: "0", opacity: "0" },
        ],
        { duration: 250, easing: "linear" },
      );
      this.bodyEl.style.height = "auto";

      this.detailsEl.open = false;
      this.cAfterHide.emit();
    }
  }

  /** Shows the accordion. */
  @Method()
  async show() {
    if (this.open || this.disabled) {
      return undefined;
    }

    this.open = true;
    return new Promise<void>((resolve) => {
      this.el.addEventListener("c-after-show", () => resolve(), { once: true });
    });
  }

  /** Hides the accordion. */
  @Method()
  async hide() {
    if (!this.open || this.disabled) {
      return undefined;
    }

    this.open = false;
    return new Promise<void>((resolve) => {
      this.el.addEventListener("c-after-hide", () => resolve(), { once: true });
    });
  }

  private renderChevronIcon() {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style={{ transform: this.isRtl ? "scaleX(-1)" : "none" }}
        part="icon"
      >
        <polyline points="6 4 10 8 6 12"></polyline>
      </svg>
    );
  }

  render() {
    return (
      <Host>
        <details
          part="base"
          class={{
            accordion: true,
            "accordion--open": this.open,
            "accordion--disabled": this.disabled,
            "accordion--rtl": this.isRtl,
          }}
          ref={(el) => (this.detailsEl = el as HTMLDetailsElement)}
        >
          <summary
            part="header"
            id="header"
            class="accordion__header"
            role="button"
            aria-expanded={this.open ? "true" : "false"}
            aria-controls="content"
            aria-disabled={this.disabled ? "true" : "false"}
            tabindex={this.disabled ? -1 : 0}
            onClick={this.handleSummaryClick}
            onKeyDown={this.handleSummaryKeyDown}
            ref={(el) => (this.headerEl = el as HTMLElement)}
          >
            <span part="summary" class="accordion__summary">
              <slot name="summary">{this.summary}</slot>
            </span>

            <span part="summary-icon" class="accordion__summary-icon">
              <slot name="expand-icon">{this.renderChevronIcon()}</slot>
              <slot name="collapse-icon">{this.renderChevronIcon()}</slot>
            </span>
          </summary>

          <div
            class="accordion__body"
            role="region"
            aria-labelledby="header"
            ref={(el) => (this.bodyEl = el as HTMLElement)}
          >
            <span id="content" part="content" class="accordion__content">
              <slot></slot>
            </span>
          </div>
        </details>
      </Host>
    );
  }
}
