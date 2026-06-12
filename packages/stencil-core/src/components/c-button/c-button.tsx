import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method,
} from "@stencil/core";

/**
 * @summary Buttons represent actions that are available to the user.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon.
 * @csspart spinner - The spinner shown in loading state.
 */
@Component({
  tag: "c-button",
  styleUrl: "c-button.css",
  shadow: true,
})
export class CButton {
  @Element() el!: HTMLElement;

  // ── Props ────────────────────────────────────────────────────────────────

  /** The button's theme variant. */
  @Prop({ reflect: true }) variant:
    | "default"
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "danger"
    | "text" = "default";

  /** The button's size. */
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  /** Draws the button with a caret. */
  @Prop({ reflect: true }) caret: boolean = false;

  /** Disables the button. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Draws the button in a loading state. */
  @Prop({ reflect: true }) loading: boolean = false;

  /** Draws an outlined button. */
  @Prop({ reflect: true }) outline: boolean = false;

  /** Draws a pill-style button with rounded edges. */
  @Prop({ reflect: true }) pill: boolean = false;

  /** Draws a circular icon button. */
  @Prop({ reflect: true }) circle: boolean = false;

  /** The type of button. Defaults to `button`. Set to `submit` to submit the surrounding form. */
  @Prop() type: "button" | "submit" | "reset" = "button";

  /** The name of the button, submitted as a name/value pair with form data. */
  @Prop() name: string = "";

  /** The value of the button, submitted as a pair with the button's name. */
  @Prop() value: string = "";

  /** When set, renders as an `<a>` with this href instead of a `<button>`. */
  @Prop() href: string = "";

  /** Tells the browser where to open the link. Only used when `href` is present. */
  @Prop() target?: "_blank" | "_parent" | "_self" | "_top";

  /** Maps to the underlying link's `rel` attribute. Only used when `href` is present. */
  @Prop() rel: string = "noreferrer noopener";

  /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
  @Prop() download?: string;

  /** Tooltip title passed through to the native element. */
  @Prop() tooltip: string = "";

  // ── Events ───────────────────────────────────────────────────────────────

  /** Emitted when the button loses focus. */
  @Event({
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  cBlur!: EventEmitter<void>;

  /** Emitted when the button gains focus. */
  @Event({
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  cFocus!: EventEmitter<void>;

  /** Emitted when the form control fails constraint validation. */
  @Event({
    composed: true,
    bubbles: true,
    cancelable: true,
  })
  cInvalid!: EventEmitter<void>;
  // ── Internal state ───────────────────────────────────────────────────────

  @State() private hasFocus: boolean = false;
  @State() private hasPrefix: boolean = false;
  @State() private hasSuffix: boolean = false;
  @State() private hasLabel: boolean = false;

  private buttonEl?: HTMLButtonElement | HTMLAnchorElement;

  // ── Lifecycle ────────────────────────────────────────────────────────────

  componentDidLoad() {
    this.updateSlotState();
    this.el.shadowRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.updateSlotState());
    });
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private updateSlotState() {
    const defaultSlot = this.el.shadowRoot?.querySelector(
      "slot:not([name])",
    ) as HTMLSlotElement | null;
    const prefixSlot = this.el.shadowRoot?.querySelector(
      'slot[name="prefix"]',
    ) as HTMLSlotElement | null;
    const suffixSlot = this.el.shadowRoot?.querySelector(
      'slot[name="suffix"]',
    ) as HTMLSlotElement | null;

    this.hasLabel =
      !!defaultSlot && defaultSlot.assignedNodes({ flatten: true }).length > 0;
    this.hasPrefix =
      !!prefixSlot && prefixSlot.assignedNodes({ flatten: true }).length > 0;
    this.hasSuffix =
      !!suffixSlot && suffixSlot.assignedNodes({ flatten: true }).length > 0;
  }

  private isLink() {
    return !!this.href;
  }

  private handleBlur = () => {
    this.hasFocus = false;
    this.cBlur.emit();
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.cFocus.emit();
  };

  private handleClick = () => {
    if (this.disabled || this.loading) return;

    if (!this.isLink()) {
      if (this.type === "submit") {
        const form = this.el.closest("form");
        if (form) {
          const submitter = document.createElement("button");
          submitter.type = "submit";
          submitter.hidden = true;
          if (this.name) submitter.name = this.name;
          if (this.value) submitter.value = this.value;
          form.appendChild(submitter);
          submitter.click();
          form.removeChild(submitter);
        }
      }
      if (this.type === "reset") {
        this.el.closest("form")?.reset();
      }
    }
  };

  private classNames(): string {
    const map: Record<string, boolean> = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--has-label": this.hasLabel,
      "button--has-prefix": this.hasPrefix,
      "button--has-suffix": this.hasSuffix,
    };
    return Object.entries(map)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(" ");
  }

  // ── Public methods ───────────────────────────────────────────────────────

  /** Simulates a click on the button. */
  @Method()
  async triggerClick() {
    this.buttonEl?.click();
  }

  /** Sets focus on the button. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.buttonEl?.focus(options);
  }

  /** Removes focus from the button. */
  @Method()
  async removeFocus() {
    this.buttonEl?.blur();
  }

  /** Checks validity without showing a validation message. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.isLink()
      ? true
      : ((this.buttonEl as HTMLButtonElement)?.checkValidity() ?? true);
  }

  /** Checks validity and shows the browser's validation message if invalid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.isLink()
      ? true
      : ((this.buttonEl as HTMLButtonElement)?.reportValidity() ?? true);
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  @Method()
  async setCustomValidity(message: string) {
    if (!this.isLink()) {
      (this.buttonEl as HTMLButtonElement)?.setCustomValidity(message);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  private renderInner() {
    return [
      <span class="button__prefix" part="prefix">
        <slot name="prefix" />
      </span>,

      <span class="button__label" part="label">
        <slot />
      </span>,

      <span class="button__suffix" part="suffix">
        <slot name="suffix" />
      </span>,

      this.caret && (
        <span class="button__caret" part="caret" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      ),

      this.loading && (
        <span class="button__spinner" part="spinner" aria-hidden="true">
          <svg class="spinner__svg" viewBox="0 0 50 50">
            <circle
              class="spinner__track"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
            />
            <circle
              class="spinner__indicator"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
            />
          </svg>
        </span>
      ),
    ];
  }
  render() {
    const classes = this.classNames();
    const tabIndex = this.disabled ? -1 : 0;

    if (this.isLink()) {
      return (
        <Host>
          <a
            part="base"
            class={classes}
            href={this.disabled ? undefined : this.href}
            target={this.target}
            download={this.download}
            rel={this.rel}
            role="button"
            aria-disabled={this.disabled ? "true" : "false"}
            tabindex={tabIndex}
            title={this.tooltip}
            ref={(el) => {
              this.buttonEl = el;
            }}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onClick={this.handleClick}
          >
            {this.renderInner()}
          </a>
        </Host>
      );
    }

    return (
      <Host>
        <button
          part="base"
          class={classes}
          type={this.type}
          name={this.name || undefined}
          value={this.value || undefined}
          disabled={this.disabled}
          aria-disabled={this.disabled ? "true" : "false"}
          tabindex={tabIndex}
          title={this.tooltip}
          ref={(el) => {
            this.buttonEl = el;
          }}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onClick={this.handleClick}
        >
          {this.renderInner()}
        </button>
      </Host>
    );
  }
}
