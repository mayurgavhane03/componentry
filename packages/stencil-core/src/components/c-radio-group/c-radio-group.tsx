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
  State,
  Watch,
} from "@stencil/core";

/**
 * @summary Radio groups wrap a set of radios so they function as a single form control with one shared value.
 * They handle keyboard navigation, labeling, and validation for the group as a whole.
 *
 * @slot         - The default slot where `<c-radio>` elements are placed.
 * @slot label   - The radio group's label. Required for proper accessibility. Alternatively, use the `label` attribute.
 * @slot hint    - Text that describes how to use the radio group. Alternatively, use the `hint` attribute.
 *
 * @event change    - Emitted when the radio group's selected value changes.
 * @event input     - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control       - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint               - The hint's wrapper.
 */
@Component({
  tag: "c-radio-group",
  shadow: true,
  styleUrl: "c-radio-group.css",
})
export class CRadioGroup {
  @Element() el!: HTMLElement;

  // ─── Internal state ────────────────────────────────────────────────────────

  /** Tracks whether value has been set programmatically so we can fall back to defaultValue. */
  private valueHasChanged = false;

  /** Whether a label slot node is present (checked after slotchange). */
  @State() hasLabelSlot = false;

  /** Whether a hint slot node is present (checked after slotchange). */
  @State() hasHintSlot = false;

  // ─── Public props ──────────────────────────────────────────────────────────

  /** The radio group's label. Required for proper accessibility. */
  @Prop() label = "";

  /** The radio group's hint text. */
  @Prop() hint = "";

  /** The name submitted with form data. */
  @Prop({ reflect: true }) name: string | null = null;

  /** Disables the radio group and all child radios. */
  @Prop({ reflect: true }) disabled = false;

  /** The orientation in which to show radio items. */
  @Prop({ reflect: true }) orientation: "horizontal" | "vertical" = "vertical";

  /**
   * The current value of the radio group.
   * Setting this property marks `valueHasChanged` so the default value is no longer used as a fallback.
   */
  @Prop({ mutable: true }) value: string | null = null;

  /** The default value of the form control (used on form reset). */
  @Prop({ reflect: true, attribute: "value" }) defaultValue: string | null =
    null;

  /** The radio group's size — propagated to all child `<c-radio>` elements. */
  @Prop({ reflect: true }) size!:
    | "xs"
    | "s"
    | "m"
    | "l"
    | "xl"
    | "small"
    | "medium"
    | "large";

  /** Ensures a child radio is checked before the containing form can submit. */
  @Prop({ reflect: true }) required = false;

  @Event({ bubbles: true, composed: true }) change!: EventEmitter<void>;
  @Event({ bubbles: true, composed: true }) input!: EventEmitter<void>;

  @Watch("disabled")
  @Watch("size")
  @Watch("value")
  @Watch("defaultValue")
  handlePropChange() {
    this.syncRadioElements();
  }

  componentDidLoad() {
    this.syncRadioElements();
    this.updateSlotState();
  }

  // ─── Slot helpers ──────────────────────────────────────────────────────────

  private updateSlotState() {
    this.hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    this.hasHintSlot = !!this.el.querySelector('[slot="hint"]');
  }

  private handleSlotChange = () => {
    this.updateSlotState();
    this.syncRadioElements();
  };

  private getAllRadios(): HTMLElement[] {
    // Collect light-DOM c-radio children.
    return Array.from(this.el.querySelectorAll<HTMLElement>("c-radio"));
  }

  private getEffectiveValue(): string | null {
    if (this.valueHasChanged) return this.value;
    return this.value ?? this.defaultValue;
  }

  private syncRadioElements() {
    const radios = this.getAllRadios();
    const effectiveValue = this.getEffectiveValue();

    radios.forEach((radio, index) => {
      // Size propagation
      if (this.size) radio.setAttribute("size", this.size);

      // Orientation data attributes (mirrors the Lit component)
      radio.toggleAttribute(
        "data-wa-radio-horizontal",
        this.orientation !== "vertical",
      );
      radio.toggleAttribute(
        "data-wa-radio-vertical",
        this.orientation === "vertical",
      );
      radio.toggleAttribute("data-wa-radio-first", index === 0);
      radio.toggleAttribute(
        "data-wa-radio-inner",
        index !== 0 && index !== radios.length - 1,
      );
      radio.toggleAttribute("data-wa-radio-last", index === radios.length - 1);

      // Disabled propagation
      if (this.disabled) {
        radio.setAttribute("force-disabled", "");
      } else {
        radio.removeAttribute("force-disabled");
      }

      // Checked state
      const radioValue = radio.getAttribute("value");
      const isChecked =
        !radio.hasAttribute("disabled") && radioValue === effectiveValue;
      radio.toggleAttribute("checked", isChecked);
    });

    // Tabindex management
    if (this.disabled) {
      radios.forEach((r) => r.setAttribute("tabindex", "-1"));
    } else {
      const enabled = radios.filter((r) => !r.hasAttribute("disabled"));
      const checkedRadio = enabled.find((r) => r.hasAttribute("checked"));

      if (enabled.length > 0) {
        if (checkedRadio) {
          enabled.forEach((r) =>
            r.setAttribute("tabindex", r === checkedRadio ? "0" : "-1"),
          );
        } else {
          enabled.forEach((r, i) =>
            r.setAttribute("tabindex", i === 0 ? "0" : "-1"),
          );
        }
      }

      radios
        .filter((r) => r.hasAttribute("disabled"))
        .forEach((r) => r.setAttribute("tabindex", "-1"));
    }
  }

  @Listen("click")
  handleRadioClick(e: Event) {
    const clickedRadio = (e.target as HTMLElement).closest<HTMLElement>(
      "c-radio",
    );
    if (
      !clickedRadio ||
      clickedRadio.hasAttribute("disabled") ||
      clickedRadio.hasAttribute("force-disabled") ||
      this.disabled
    )
      return;

    const oldValue = this.getEffectiveValue();

    this.valueHasChanged = true;
    this.value = clickedRadio.getAttribute("value");

    const radios = this.getAllRadios();
    radios.forEach((radio) => {
      const isClicked = radio === clickedRadio;
      radio.toggleAttribute("checked", isClicked);
      radio.setAttribute("tabindex", isClicked ? "0" : "-1");
    });

    if (this.value !== oldValue) {
      // Defer to let DOM settle (mirrors Lit's updateComplete.then)
      requestAnimationFrame(() => {
        this.input.emit();
        this.change.emit();
      });
    }
  }

  @Listen("keydown")
  handleKeyDown(event: KeyboardEvent) {
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
    if (!validKeys.includes(event.key) || this.disabled) return;

    const radios = this.getAllRadios().filter(
      (r) => !r.hasAttribute("disabled"),
    );
    if (radios.length === 0) return;

    event.preventDefault();

    const oldValue = this.getEffectiveValue();
    const checkedIdx = radios.findIndex((r) => r.hasAttribute("checked"));
    const baseIdx = checkedIdx >= 0 ? checkedIdx : 0;
    const incr =
      event.key === " "
        ? 0
        : ["ArrowUp", "ArrowLeft"].includes(event.key)
          ? -1
          : 1;

    let nextIdx = baseIdx + incr;
    if (nextIdx < 0) nextIdx = radios.length - 1;
    if (nextIdx > radios.length - 1) nextIdx = 0;

    this.getAllRadios().forEach((r) => {
      r.removeAttribute("checked");
      r.setAttribute("tabindex", "-1");
    });

    const nextRadio = radios[nextIdx];
    const nextValue = nextRadio.getAttribute("value");

    this.valueHasChanged = true;
    this.value = nextValue;
    nextRadio.setAttribute("checked", "");
    nextRadio.setAttribute("tabindex", "0");
    nextRadio.focus();

    if (this.value !== oldValue) {
      requestAnimationFrame(() => {
        this.input.emit();
        this.change.emit();
      });
    }
  }

  /** Sets focus on the radio group (focuses the checked radio, or the first enabled one). */
  @Method()
  async setFocus(options?: FocusOptions) {
    if (this.disabled) return;

    const radios = this.getAllRadios();
    const checked = radios.find((r) => r.hasAttribute("checked"));
    const first = radios.find((r) => !r.hasAttribute("disabled"));
    const target = checked ?? first;

    target?.focus(options);
  }

  render() {
    const hasLabel = !!this.label || this.hasLabelSlot;
    const hasHint = !!this.hint || this.hasHintSlot;

    return (
      <Host>
        <fieldset
          part="form-control"
          class={{
            "form-control": true,
            "form-control-radio-group": true,
            "form-control-has-label": hasLabel,
            "radio-group-required": this.required,
          }}
          role="radiogroup"
          aria-labelledby="label"
          aria-describedby="hint"
          aria-orientation={this.orientation}
        >
          <legend
            part="form-control-label"
            id="label"
            class={{ label: true, "has-label": hasLabel }}
            aria-hidden={hasLabel ? "false" : "true"}
            onClick={() => this.setFocus()}
          >
            <slot name="label">{this.label}</slot>
          </legend>

          <div part="form-control-input" class="form-control-input">
            <slot onSlotchange={this.handleSlotChange} />
          </div>

          <div
            part="hint"
            id="hint"
            class={{ hint: true, "has-hint": hasHint }}
            aria-hidden={hasHint ? "false" : "true"}
          >
            <slot name="hint">{this.hint}</slot>
          </div>
        </fieldset>
      </Host>
    );
  }
}
