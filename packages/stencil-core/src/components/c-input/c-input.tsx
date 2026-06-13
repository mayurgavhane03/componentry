import {
  Component,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Method,
  Watch,
  h,
} from "@stencil/core";

/**
 * @summary Inputs collect data from the user.
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the input.
 * @slot suffix - Used to append a presentational icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event c-blur    - Emitted when the control loses focus.
 * @event c-change  - Emitted when an alteration to the control's value is committed by the user.
 * @event c-clear   - Emitted when the clear button is activated.
 * @event c-focus   - Emitted when the control gains focus.
 * @event c-input   - Emitted when the control receives input.
 * @event c-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control           - The form control that wraps the label, input, and help text.
 * @csspart form-control-label     - The label's wrapper.
 * @csspart form-control-input     - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base                   - The component's base wrapper.
 * @csspart input                  - The internal <input> control.
 * @csspart prefix                 - The container that wraps the prefix.
 * @csspart clear-button           - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix                 - The container that wraps the suffix.
 */
@Component({
  tag: "c-input",
  styleUrl: "c-input.css", // reuse your existing CSS file
  shadow: true,
})
export class CInput {
  @Element() el!: HTMLElement;

  private inputEl!: HTMLInputElement;

  // ─── Internal state ───────────────────────────────────────────────────────

  @State() private hasFocus = false;
  @State() private passwordVisible = false;

  // Used to mirror valueAsDate / valueAsNumber without a rendered element
  private __numberInput = Object.assign(document.createElement("input"), {
    type: "number",
  });
  private __dateInput = Object.assign(document.createElement("input"), {
    type: "date",
  });

  // ─── Public props ─────────────────────────────────────────────────────────

  /**
   * The type of input. Works the same as a native <input> element, but only a subset of types are
   * supported. Defaults to `text`.
   */
  @Prop({ reflect: true }) type:
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url" = "text";

  /** The name of the input, submitted as a name/value pair with form data. */
  @Prop() name = "";

  /** The current value of the input. */
  @Prop({ mutable: true }) value = "";

  /** The input's size. */
  @Prop({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  /** Draws a filled input. */
  @Prop({ reflect: true }) filled = false;

  /** Draws a pill-style input with rounded edges. */
  @Prop({ reflect: true }) pill = false;

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @Prop() label = "";

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @Prop({ attribute: "help-text" }) helpText = "";

  /** Adds a clear button when the input is not empty. */
  @Prop() clearable = false;

  /** Disables the input. */
  @Prop({ reflect: true }) disabled = false;

  /** Placeholder text to show as a hint when the input is empty. */
  @Prop() placeholder = "";

  /** Makes the input readonly. */
  @Prop({ reflect: true }) readonly = false;

  /** Adds a button to toggle the password's visibility. Only applies to password types. */
  @Prop({ attribute: "password-toggle" }) passwordToggle = false;

  /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
  @Prop({ attribute: "no-spin-buttons" }) noSpinButtons = false;

  /** Makes the input a required field. */
  @Prop({ reflect: true }) required = false;

  /** A regular expression pattern to validate input against. */
  @Prop() pattern!: string;

  @Prop() minlength!: number;

  @Prop() maxlength!: number;

  @Prop() min!: number | string;

  @Prop() max!: number | string;

  @Prop() step!: number | "any";

  @Prop() autocapitalize!:
    | "off"
    | "none"
    | "on"
    | "sentences"
    | "words"
    | "characters";

  @Prop() autocorrect!: "off" | "on";

  @Prop() autocomplete!: string;

  @Prop() autofocus!: boolean;

  @Prop() enterkeyhint!:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";

  @Prop() inputmode!:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";

  /** Enables spell checking on the input. */
  @Prop() spellcheck = true;

  /** Tells the browser what type of data will be entered by the user. */

  /** Title attribute passed through to the native input. */
  @Prop() inputTitle = "";

  // ─── Events ───────────────────────────────────────────────────────────────

  @Event({ bubbles: true, composed: true })
  cBlur!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true })
  cChange!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true })
  cClear!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true })
  cFocus!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true })
  cInput!: EventEmitter<void>;

  @Event({ bubbles: true, composed: true })
  cInvalid!: EventEmitter<void>;

  // ─── Watchers ─────────────────────────────────────────────────────────────

  @Watch("disabled")
  handleDisabledChange() {
    // Disabled form controls are always valid — update data attributes accordingly
    this.updateValidityAttributes(this.disabled);
  }

  @Watch("step")
  handleStepChange() {
    if (this.inputEl) {
      this.inputEl.step = String(this.step);
    }
  }

  @Watch("value")
  async handleValueChange() {
    // Nothing extra needed; Stencil re-renders automatically.
    // Call custom validity update if you wire up a FormControlController equivalent.
  }

  // ─── Public methods ───────────────────────────────────────────────────────

  /** Sets focus on the input. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.inputEl?.focus(options);
  }

  /** Removes focus from the input. */

  @Method()
  async removeFocus() {
    this.inputEl?.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    this.inputEl?.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: "forward" | "backward" | "none" = "none",
  ) {
    this.inputEl?.setSelectionRange(
      selectionStart,
      selectionEnd,
      selectionDirection,
    );
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start?: number,
    end?: number,
    selectMode: "select" | "start" | "end" | "preserve" = "preserve",
  ) {
    if (!this.inputEl) return;
    const s = start ?? this.inputEl.selectionStart!;
    const e = end ?? this.inputEl.selectionEnd!;
    this.inputEl.setRangeText(replacement, s, e, selectMode);
    if (this.value !== this.inputEl.value) {
      this.value = this.inputEl.value;
    }
  }

  /** Displays the browser picker for an input element (only works if the browser supports it). */
  @Method()
  async showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      (this.inputEl as any).showPicker();
    }
  }

  /** Increments the value of a numeric input type by the value of the step attribute. */
  @Method()
  async stepUp() {
    this.inputEl?.stepUp();
    if (this.value !== this.inputEl?.value) {
      this.value = this.inputEl.value;
    }
  }

  /** Decrements the value of a numeric input type by the value of the step attribute. */
  @Method()
  async stepDown() {
    this.inputEl?.stepDown();
    if (this.value !== this.inputEl?.value) {
      this.value = this.inputEl.value;
    }
  }

  /** Checks for validity but does not show a validation message. */
  @Method()
  async checkValidity() {
    return this.inputEl?.checkValidity() ?? true;
  }

  /** Checks for validity and shows the browser's validation message if invalid. */
  @Method()
  async reportValidity() {
    return this.inputEl?.reportValidity() ?? true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  @Method()
  async setCustomValidity(message: string) {
    this.inputEl?.setCustomValidity(message);
  }

  // ─── valueAsDate / valueAsNumber getters+setters ──────────────────────────

  get valueAsDate(): Date | null {
    this.__dateInput.type = this.type;
    this.__dateInput.value = this.value;
    return this.inputEl?.valueAsDate ?? this.__dateInput.valueAsDate;
  }

  set valueAsDate(newValue: Date | null) {
    this.__dateInput.type = this.type;
    this.__dateInput.valueAsDate = newValue;
    this.value = this.__dateInput.value;
  }

  get valueAsNumber(): number {
    this.__numberInput.value = this.value;
    return this.inputEl?.valueAsNumber ?? this.__numberInput.valueAsNumber;
  }

  set valueAsNumber(newValue: number) {
    this.__numberInput.valueAsNumber = newValue;
    this.value = this.__numberInput.value;
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private updateValidityAttributes(isValid: boolean) {
    const host = this.el;
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-invalid", !isValid);
  }

  private handleBlur = () => {
    this.hasFocus = false;
    this.cBlur.emit();
  };

  private handleChange = () => {
    this.value = this.inputEl.value;
    this.cChange.emit();
  };

  private handleClearClick = (event: MouseEvent) => {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.cClear.emit();
      this.cInput.emit();
      this.cChange.emit();
    }
    this.inputEl?.focus();
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.cFocus.emit();
  };

  private handleInput = () => {
    this.value = this.inputEl.value;
    this.cInput.emit();
  };

  private handleInvalid = (event: Event) => {
    event.preventDefault();
    this.cInvalid.emit();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const hasModifier =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !(event as any).isComposing) {
          // Submit the closest form if one exists
          const form = this.el.closest("form");
          form?.requestSubmit?.();
        }
      });
    }
  };

  private handlePasswordToggle = () => {
    this.passwordVisible = !this.passwordVisible;
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  render() {
    const hasLabel = !!this.label;
    const hasHelpText = !!this.helpText;

    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible =
      hasClearIcon && (typeof this.value === "number" || this.value.length > 0);

    const inputType =
      this.type === "password" && this.passwordVisible ? "text" : this.type;

    const formControlClasses = {
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText,
    };

    const baseClasses = {
      input: true,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons,
    };

    return (
      <Host>
        <div part="form-control" class={formControlClasses}>
          <label
            part="form-control-label"
            class="form-control__label"
            htmlFor="input"
            aria-hidden={hasLabel ? "false" : "true"}
          >
            <slot name="label">{this.label}</slot>
          </label>

          <div part="form-control-input" class="form-control-input">
            <div part="base" class={baseClasses}>
              <span part="prefix" class="input__prefix">
                <slot name="prefix" />
              </span>

              <input
                part="input"
                id="input"
                class="input__control"
                ref={(el) => (this.inputEl = el as HTMLInputElement)}
                type={inputType}
                title={this.inputTitle}
                name={this.name || undefined}
                disabled={this.disabled}
                readonly={this.readonly}
                required={this.required}
                placeholder={this.placeholder || undefined}
                minLength={this.minlength}
                maxLength={this.maxlength}
                min={this.min as number}
                max={this.max as number}
                step={this.step as number}
                value={this.value}
                autocapitalize={this.autocapitalize}
                autoComplete={this.autocomplete}
                autocorrect={this.autocorrect}
                autoFocus={this.autofocus}
                spellcheck={this.spellcheck}
                pattern={this.pattern || undefined}
                enterKeyHint={this.enterkeyhint}
                inputMode={this.inputmode}
                aria-describedby="help-text"
                onChange={this.handleChange}
                onInput={this.handleInput}
                onInvalid={this.handleInvalid}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />

              {hasClearIcon && (
                <button
                  part="clear-button"
                  class={{
                    input__clear: true,
                    "input__clear--hidden": !isClearIconVisible,
                  }}
                  type="button"
                  aria-label="Clear entry"
                  aria-hidden={!isClearIconVisible ? "true" : "false"}
                  onClick={this.handleClearClick}
                  tabIndex={isClearIconVisible ? -1 : undefined}
                >
                  <slot name="clear-icon">
                    {/* Replace with your icon component if available */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </slot>
                </button>
              )}

              {this.passwordToggle && !this.disabled && (
                <button
                  part="password-toggle-button"
                  class="input__password-toggle"
                  type="button"
                  aria-label={
                    this.passwordVisible ? "Hide password" : "Show password"
                  }
                  onClick={this.handlePasswordToggle}
                  tabIndex={-1}
                >
                  {this.passwordVisible ? (
                    <slot name="show-password-icon">
                      {/* eye-slash icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    </slot>
                  ) : (
                    <slot name="hide-password-icon">
                      {/* eye icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </slot>
                  )}
                </button>
              )}

              <span part="suffix" class="input__suffix">
                <slot name="suffix" />
              </span>
            </div>
          </div>

          <div
            part="form-control-help-text"
            id="help-text"
            class="form-control__help-text"
            aria-hidden={hasHelpText ? "false" : "true"}
          >
            <slot name="help-text">{this.helpText}</slot>
          </div>
        </div>
      </Host>
    );
  }
}
