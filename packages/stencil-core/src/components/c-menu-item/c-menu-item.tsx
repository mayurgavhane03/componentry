import {
  Component,
  Host,
  h,
  Prop,
  Watch,
  Element,
  Event,
  EventEmitter,
  Method,
  State,
  Listen,
} from "@stencil/core";

/**
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 * @slot submenu - Used to denote a nested menu.
 *
 * @part base - The component's base wrapper.
 * @part checked-icon - The checked icon, visible only when the menu item is checked.
 * @part prefix - The prefix container.
 * @part label - The menu item label.
 * @part suffix - The suffix container.
 *
 * @cssprop [--submenu-offset=-2px] - The distance submenus shift to overlap the parent menu.
 */
@Component({
  tag: "c-menu-item",
  styleUrl: "c-menu-item.css",
  shadow: true,
})
export class CMenuItem {
  @Element() el!: HTMLElement;
  @Prop({ reflect: true }) type: "normal" | "checkbox" = "normal";
  @Prop({ reflect: true, mutable: true }) checked = false;
  @Prop({ reflect: true }) value = "";
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) disabled = false;
  @State() hasSubmenuSlot = false;

  private cachedTextLabel: string | undefined;
  private defaultSlotEl!: HTMLSlotElement;

  @Event({
    bubbles: true,
    composed: false,
    cancelable: false,
  })
  cSlotChange!: EventEmitter<void>;

  connectedCallback() {
    this.syncTypeAria();
    this.syncDisabledAria();
  }

  @Watch("checked")
  handleCheckedChange() {
    if (this.checked && this.type !== "checkbox") {
      this.checked = false;
      console.error(
        'The checked prop can only be used on menu items with type="checkbox"',
        this.el,
      );
      return;
    }
    if (this.type === "checkbox") {
      this.el.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.el.removeAttribute("aria-checked");
    }
  }

  @Watch("disabled")
  handleDisabledChange() {
    this.syncDisabledAria();
  }

  @Watch("type")
  handleTypeChange() {
    this.syncTypeAria();
  }


  @Listen("click")
  handleHostClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @Listen("mouseover")
  handleMouseOver(event: MouseEvent) {
    this.el.focus();
    event.stopPropagation();
  }


  @Method()
  async getTextLabel(): Promise<string> {
    return this.readTextLabel();
  }


  private syncTypeAria() {
    if (this.type === "checkbox") {
      this.el.setAttribute("role", "menuitemcheckbox");
      this.el.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.el.setAttribute("role", "menuitem");
      this.el.removeAttribute("aria-checked");
    }
  }

  private syncDisabledAria() {
    this.el.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }

  private readTextLabel(): string {
    if (!this.defaultSlotEl) return "";
    return [...this.defaultSlotEl.assignedNodes({ flatten: true })]
      .map((node) =>
        node.nodeType === Node.TEXT_NODE
          ? (node.textContent ?? "")
          : ((node as HTMLElement).innerText ?? ""),
      )
      .join("")
      .trim();
  }

  private handleDefaultSlotChange = () => {
    const textLabel = this.readTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.cSlotChange.emit();
    }
  };

  private handleSubmenuSlotChange = () => {
    const submenuSlot = this.el.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="submenu"]',
    );
    this.hasSubmenuSlot = !!(
      submenuSlot && submenuSlot.assignedElements({ flatten: true }).length > 0
    );
  };

  render() {
    const { checked, disabled, loading, hasSubmenuSlot } = this;

    return (
      <Host>
        <div
          id="anchor"
          part="base"
          class={{
            "menu-item": true,
            "menu-item--checked": checked,
            "menu-item--disabled": disabled,
            "menu-item--loading": loading,
            "menu-item--has-submenu": hasSubmenuSlot,
          }}
          aria-haspopup={hasSubmenuSlot ? "true" : null}
        >
          <span part="checked-icon" class="menu-item__check">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>

          <slot name="prefix" />

          <slot
            ref={(el) => (this.defaultSlotEl = el as HTMLSlotElement)}
            onSlotchange={this.handleDefaultSlotChange}
          />

          <slot name="suffix" />

          <span part="submenu-icon" class="menu-item__chevron">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>

          <slot name="submenu" onSlotchange={this.handleSubmenuSlotChange} />

          {loading && (
            <span
              part="spinner"
              class="menu-item__spinner"
              role="status"
              aria-label="Loading"
            >
              <svg
                class="spinner"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  class="spinner__track"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  class="spinner__indicator"
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
