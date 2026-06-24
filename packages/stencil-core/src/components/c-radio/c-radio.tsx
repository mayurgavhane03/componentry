import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  Watch,
} from "@stencil/core";

/**
 * @summary Radios represent a single option within a mutually exclusive set.
 * Use them inside a `<c-radio-group>` when users must pick exactly one choice from a small list.
 *
 * @slot - The radio's label.
 *
 * @event radioBlur  - Emitted when the control loses focus.
 * @event radioFocus - Emitted when the control gains focus.
 *
 * @csspart control      - The circular container that wraps the radio's checked state.
 * @csspart checked-icon - The checked icon (SVG circle).
 * @csspart label        - The container that wraps the radio's label.
 *
 * @cssproperty --checked-icon-color - The color of the checked icon.
 * @cssproperty --checked-icon-scale - The size of the checked icon relative to the radio.
 */
@Component({
  tag: "c-radio",
  shadow: true,
  styleUrl: "c-radio.css",
})
export class CRadio {
  @Element() el!: HTMLElement;

  /** The radio's value. When selected, the parent radio group will receive this value. */
  @Prop({ reflect: true }) value!: string;

  /** The radio's visual appearance. */
  @Prop({ reflect: true }) appearance: "default" | "button" | "card" = "default";

  /**
   * The radio's size. When used inside a `<c-radio-group>`, the group's size overrides this attribute.
   */
  @Prop({ reflect: true }) size!:
    | "xs"
    | "s"
    | "m"
    | "l"
    | "xl"
    | "small"
    | "medium"
    | "large";

  /** Disables the radio. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Whether the radio is checked.
   * Managed externally by `<c-radio-group>` via setAttribute / toggleAttribute.
   */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /**
   * @internal
   * Used by `<c-radio-group>` to force-disable radios while preserving their own `disabled` attribute.
   * Set via `force-disabled` attribute.
   */
  @Prop({ reflect: true, attribute: "force-disabled", mutable: true })
  forceDisabled = false;

  // ─── Events ────────────────────────────────────────────────────────────────

  /** Emitted when the control gains focus. */
  @Event({ bubbles: true, composed: true }) radioFocus!: EventEmitter<void>;

  /** Emitted when the control loses focus. */
  @Event({ bubbles: true, composed: true }) radioBlur!: EventEmitter<void>;

  componentDidLoad() {
    this.setInitialAttributes();
    this.syncAriaChecked();
    this.syncAriaDisabled();
    this.updateDescriptionState();
  }

  @Watch("checked")
  handleCheckedChange(checked: boolean) {
    this.el.setAttribute("aria-checked", checked ? "true" : "false");

    if (!this.disabled && !this.forceDisabled) {
      this.el.tabIndex = checked ? 0 : -1;
    }
  }

  @Watch("disabled")
  @Watch("forceDisabled")
  handleDisabledChange() {
    const effectivelyDisabled = this.disabled || this.forceDisabled;
    this.el.setAttribute(
      "aria-disabled",
      effectivelyDisabled ? "true" : "false",
    );

    if (effectivelyDisabled) {
      this.el.tabIndex = -1;
    } else {
      this.el.tabIndex = this.checked ? 0 : -1;
    }
  }

  private updateDescriptionState() {
    const slot = this.el.shadowRoot?.querySelector(
      'slot[name="description"]',
    ) as HTMLSlotElement;
    const hasContent = (slot?.assignedNodes({ flatten: true }) ?? []).some(
      (n) => n.textContent?.trim(),
    );
    this.el.toggleAttribute("has-description", hasContent);
  }
  private setInitialAttributes() {
    this.el.setAttribute("role", "radio");
    this.el.tabIndex = 0;
  }

  private syncAriaChecked() {
    this.el.setAttribute("aria-checked", this.checked ? "true" : "false");
  }

  private syncAriaDisabled() {
    this.el.setAttribute(
      "aria-disabled",
      this.disabled || this.forceDisabled ? "true" : "false",
    );
  }

  @Listen("click")
  handleClick() {
    if (!this.disabled && !this.forceDisabled) {
      this.checked = true;
    }
  }

  @Listen("focus")
  handleFocus() {
    this.radioFocus.emit();
  }

  @Listen("blur")
  handleBlur() {
    this.radioBlur.emit();
  }

  @Method()
  async setFocus(options?: FocusOptions) {
    this.el.focus(options);
  }

  render() {
    return (
      <Host>
        <span part="control" class="control">
          {this.checked && (
            <svg
              part="checked-icon"
              class="checked-icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
          )}
        </span>

        <span part="label-wrapper" class="label-wrapper">
          <span part="label" class="label">
            <slot />
          </span>
          <span part="description" class="description">
            <slot
              name="description"
              onSlotchange={() => this.updateDescriptionState()}
            />
          </span>
        </span>
      </Host>
    );
  }
}
