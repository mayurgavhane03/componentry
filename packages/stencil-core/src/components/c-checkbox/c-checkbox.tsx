import {
  Component,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  Method,
  Element,
  h,
} from "@stencil/core";

/**
 * @summary Checkboxes allow the user to toggle an option on or off.
 *
 * @slot - The checkbox's label.
 * @slot help-text - Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute.
 *
 * @event c-blur    - Emitted when the checkbox loses focus.
 * @event c-change  - Emitted when the checked state changes.
 * @event c-focus   - Emitted when the checkbox gains focus.
 * @event c-input   - Emitted when the checkbox receives input.
 * @event c-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base                   - The component's base wrapper.
 * @csspart control                - The square container that wraps the checkbox's checked state.
 * @csspart control--checked       - Matches the control part when the checkbox is checked.
 * @csspart control--indeterminate - Matches the control part when the checkbox is indeterminate.
 * @csspart checked-icon           - The checked icon element.
 * @csspart indeterminate-icon     - The indeterminate icon element.
 * @csspart label                  - The container that wraps the checkbox's label.
 * @csspart form-control-help-text - The help text's wrapper.
 */
@Component({
  tag: "c-checkbox",
  styleUrl: "c-checkbox.css", // same CSS file — no changes needed
  shadow: true,
})
export class CCheckbox {
  @Element() el!: HTMLElement;

  private inputEl!: HTMLInputElement;

  @State() private hasFocus = false;
  @State() private hasHelpTextSlot = false;

 
  /** Passed through to the native input's title attribute. */
  @Prop() checkBoxtitle: string = "";

  /** The name of the checkbox, submitted as a name/value pair with form data. */
  @Prop() name: string = "";

  /** The current value of the checkbox, submitted as a name/value pair with form data. */
  @Prop() value!: string;

  /** The checkbox's size. */
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  /** Disables the checkbox. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Draws the checkbox in a checked state. */
  @Prop({ reflect: true, mutable: true }) checked: boolean = false;

  /**
   * Draws the checkbox in an indeterminate state. Usually applied to "select all/none"
   * checkboxes when associated checkboxes have a mix of checked and unchecked states.
   */
  @Prop({ reflect: true, mutable: true }) indeterminate: boolean = false;

  /** The default checked state. Primarily used for resetting the form control. */
  @Prop() defaultChecked: boolean = false;

  /**
   * Associates the control with a form element by id.
   * The form must be in the same document or shadow root.
   */
  @Prop({ reflect: true }) form: string = "";

  /** Makes the checkbox a required field. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The checkbox's help text. Use the `help-text` slot for HTML content. */
  @Prop({ attribute: "help-text" }) helpText: string = "";

  // ─── Events ────────────────────────────────────────────────────────────────

  @Event({ eventName: "cBlur" }) cBlur!: EventEmitter<void>;
  @Event({ eventName: "cChange" }) cChange!: EventEmitter<void>;
  @Event({ eventName: "cFocus" }) cFocus!: EventEmitter<void>;
  @Event({ eventName: "cInput" }) cInput!: EventEmitter<void>;
  @Event({ eventName: "cInvalid" }) cInvalid!: EventEmitter<void>;

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  componentDidLoad() {
    // Detect whether a help-text slot is being used
    this.hasHelpTextSlot = !!this.el.querySelector('[slot="help-text"]');

    // Sync indeterminate — can only be set via JS, not an HTML attribute
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  // ─── Watchers ──────────────────────────────────────────────────────────────

  @Watch("checked")
  @Watch("indeterminate")
  handleStateChange() {
    if (this.inputEl) {
      this.inputEl.checked = this.checked;
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  @Watch("disabled")
  handleDisabledChange() {
    // Disabled controls are always considered valid — no built-in
    // FormControlController here, so consumers can hook into this event.
  }

 
  /** Simulates a click on the checkbox. */
  @Method()
  async checkClick() {
    this.inputEl?.click();
  }

  /** Sets focus on the checkbox. */
  @Method()
  async checkFocus(options?: FocusOptions) {
    this.inputEl?.focus(options);
  }

  /** Removes focus from the checkbox. */
  @Method()
  async checkBlur() {
    this.inputEl?.blur();
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.inputEl?.checkValidity() ?? true;
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.inputEl?.reportValidity() ?? true;
  }

  /**
   * Sets a custom validation message. Pass an empty string to clear it.
   */
  @Method()
  async setCustomValidity(message: string) {
    this.inputEl?.setCustomValidity(message);
  }

  /** Returns the validity state of the underlying input. */
  get validity(): ValidityState | undefined {
    return this.inputEl?.validity;
  }

  /** Returns the validation message of the underlying input. */
  get validationMessage(): string {
    return this.inputEl?.validationMessage ?? "";
  }

  // ─── Private event handlers ────────────────────────────────────────────────

  private handleClick = () => {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.cChange.emit();
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.cBlur.emit();
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.cFocus.emit();
  };

  private handleInput = () => {
    this.cInput.emit();
  };

  private handleInvalid = (e: Event) => {
    e.preventDefault(); // suppress native browser bubble
    this.cInvalid.emit();
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const hasHelpText = !!this.helpText || this.hasHelpTextSlot;

    // ── form-control wrapper classes ──
    const formControlClasses = [
      "form-control",
      `form-control--${this.size}`,
      hasHelpText ? "form-control--has-help-text" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // ── label / checkbox root classes ──
    const checkboxClasses = [
      "checkbox",
      this.checked ? "checkbox--checked" : "",
      this.disabled ? "checkbox--disabled" : "",
      this.hasFocus ? "checkbox--focused" : "",
      this.indeterminate ? "checkbox--indeterminate" : "",
      `checkbox--${this.size}`,
    ]
      .filter(Boolean)
      .join(" ");

    // ── control span parts ──
    const controlPart = [
      "control",
      this.checked ? "control--checked" : "",
      this.indeterminate ? "control--indeterminate" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Host>
        <div class={formControlClasses}>
          <label part="base" class={checkboxClasses}>
            <input
              ref={(el) => (this.inputEl = el as HTMLInputElement)}
              class="checkbox__input"
              type="checkbox"
              title={this.checkBoxtitle}
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              required={this.required}
              aria-checked={this.checked ? "true" : "false"}
              aria-describedby="help-text"
              onClick={this.handleClick}
              onInput={this.handleInput}
              onInvalid={this.handleInvalid}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />

            <span part={controlPart} class="checkbox__control">
              {this.checked && (
                <svg
                  part="checked-icon"
                  class="checkbox__checked-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  {/* Bootstrap Icons – check */}
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              )}

              {!this.checked && this.indeterminate && (
                <svg
                  part="indeterminate-icon"
                  class="checkbox__indeterminate-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  {/* Bootstrap Icons – dash (indeterminate) */}
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
              )}
            </span>

            <div part="label" class="checkbox__label">
              <slot />
            </div>
          </label>

          <div
            aria-hidden={hasHelpText ? "false" : "true"}
            class="form-control__help-text"
            id="help-text"
            part="form-control-help-text"
          >
            <slot name="help-text">{this.helpText}</slot>
          </div>
        </div>
      </Host>
    );
  }
}
