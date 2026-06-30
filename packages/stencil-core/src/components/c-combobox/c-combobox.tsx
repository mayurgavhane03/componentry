import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Watch,
  h,
  ComponentInterface,
} from "@stencil/core";

interface CComboboxItemElement extends HTMLElement {
  value: string;
  label: string;
  selected: boolean;
  highlighted: boolean;
  itemHidden: boolean;
}

@Component({
  tag: "c-combobox",
  styleUrl: "c-combobox.css",
  shadow: true,
})
export class CCombobox implements ComponentInterface {
  @Element() el!: HTMLElement;

  @Prop() multiple: boolean = false;
  @Prop() value: string | string[] = "";
  @Prop() placeholder: string = "Select...";
  @Prop() disabled: boolean = false;
  @Prop() showClear: boolean = false;
  @Prop() autoHighlight: boolean = false;
  @Prop() invalid: boolean = false;

  @Event({ bubbles: true, composed: true }) valueChange!: EventEmitter<
    string | string[]
  >;
  @Event({ bubbles: true, composed: true }) openChange!: EventEmitter<boolean>;

  @State() open: boolean = false;
  @State() filterText: string = "";
  @State() highlightedIndex: number = -1;
  @State() selectedValues: string[] = [];

  private itemElements: CComboboxItemElement[] = [];
  private clickOutsideHandler: (e: MouseEvent) => void;

  constructor() {
    this.clickOutsideHandler = this.handleClickOutside.bind(this);
  }

  @Watch("value")
  onValueChange(val: string | string[]) {
    this.selectedValues = Array.isArray(val) ? val : val ? [val] : [];
  }

  componentWillLoad() {
    this.selectedValues = Array.isArray(this.value)
      ? this.value
      : this.value
        ? [this.value]
        : [];
  }

  componentDidLoad() {
    document.addEventListener("click", this.clickOutsideHandler);
    this.el.addEventListener(
      "itemSelect",
      this.handleItemSelect.bind(this) as EventListener,
    );
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.clickOutsideHandler);
  }

  componentDidRender() {
    this.syncItems();
  }

  private getItems(): CComboboxItemElement[] {
    return Array.from(
      this.el.querySelectorAll("c-combobox-item"),
    ) as CComboboxItemElement[];
  }

  private syncItems(): void {
    this.itemElements = this.getItems();

    let visibleIndex = 0;
    this.itemElements.forEach((item) => {
      const label = item.label || item.textContent?.trim() || "";
      const matchesFilter =
        !this.filterText ||
        label.toLowerCase().includes(this.filterText.toLowerCase());

      item.hidden = !matchesFilter;

      if (matchesFilter) {
        const isSelected = this.selectedValues.includes(item.value);
        const isHighlighted = visibleIndex === this.highlightedIndex;
        item.selected = isSelected;
        item.highlighted = isHighlighted;
        visibleIndex++;
      } else {
        item.selected = this.selectedValues.includes(item.value);
        item.highlighted = false;
      }
    });
  }

  private getVisibleItems(): CComboboxItemElement[] {
    return this.itemElements.filter((item) => !item.hidden);
  }

  private handleClickOutside(e: MouseEvent): void {
    const path = e.composedPath();
    if (!path.includes(this.el)) {
      this.open = false;
      this.filterText = "";
      this.highlightedIndex = -1;
    }
  }

  private handleItemSelect(e: CustomEvent<string>): void {
    const itemValue = e.detail;

    if (this.multiple) {
      const index = this.selectedValues.indexOf(itemValue);
      if (index > -1) {
        this.selectedValues = [
          ...this.selectedValues.slice(0, index),
          ...this.selectedValues.slice(index + 1),
        ];
      } else {
        this.selectedValues = [...this.selectedValues, itemValue];
      }
      this.valueChange.emit(this.selectedValues);
      this.filterText = "";
      this.highlightedIndex = -1;
    } else {
      this.selectedValues = [itemValue];
      this.valueChange.emit(itemValue);
      this.filterText = "";
      this.open = false;
      this.highlightedIndex = -1;
    }
  }

  private handleInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.filterText = target.value;

    if (this.autoHighlight && this.filterText) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex = -1;
    }

    if (!this.open) {
      this.open = true;
    }
  }

  private handleFocus(): void {
    if (!this.disabled) {
      this.open = true;
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const visibleItems = this.getVisibleItems();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this.highlightedIndex = Math.min(
            this.highlightedIndex + 1,
            visibleItems.length - 1,
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (this.open) {
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        }
        break;

      case "Enter":
        e.preventDefault();
        if (this.open && this.highlightedIndex >= 0) {
          const item = visibleItems[this.highlightedIndex];
          if (item) {
            this.handleItemSelect({
              detail: item.value,
            } as CustomEvent<string>);
          }
        }
        break;

      case "Escape":
        e.preventDefault();
        this.open = false;
        this.filterText = "";
        this.highlightedIndex = -1;
        break;

      case "Backspace":
        if (
          this.multiple &&
          this.filterText === "" &&
          this.selectedValues.length > 0
        ) {
          this.selectedValues = this.selectedValues.slice(0, -1);
          this.valueChange.emit(this.selectedValues);
        }
        break;
    }
  }

  private handleClear(e: Event): void {
    e.stopPropagation();
    this.selectedValues = [];
    this.filterText = "";
    this.highlightedIndex = -1;

    if (this.multiple) {
      this.valueChange.emit([]);
    } else {
      this.valueChange.emit("");
    }
  }

  private removeChip(value: string, e: Event): void {
    e.stopPropagation();
    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues = [
        ...this.selectedValues.slice(0, index),
        ...this.selectedValues.slice(index + 1),
      ];
      this.valueChange.emit(this.selectedValues);
    }
  }

  private getDisplayValue(): string {
    if (this.filterText) return this.filterText;
    if (this.selectedValues.length === 0) return "";
    if (this.multiple) return "";

    const selectedItem = this.itemElements.find(
      (item) => item.value === this.selectedValues[0],
    );
    if (selectedItem) {
      return selectedItem.label || selectedItem.textContent?.trim() || "";
    }
    return this.selectedValues[0];
  }

  private getChipLabel(value: string): string {
    const item = this.itemElements.find((i) => i.value === value);
    return item?.label || item?.textContent?.trim() || value;
  }

  render() {
    const hasValue = this.selectedValues.length > 0;
    const displayValue = this.getDisplayValue();

    return (
      <div
        part="base"
        class={{ combobox: true, "combobox--disabled": this.disabled }}
      >
        {this.multiple ? (
          <div
            part="trigger"
            class="combobox__chips-row"
            onClick={() => !this.disabled && (this.open = true)}
          >
            {this.selectedValues.map((val) => (
              <span part="chip" class="combobox__chip">
                <span>{this.getChipLabel(val)}</span>
                <button
                  part="chip-remove"
                  onClick={(e) => this.removeChip(val, e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            <input
              part="input"
              class="combobox__chips-input"
              type="text"
              value={this.filterText}
              placeholder={hasValue ? "" : this.placeholder}
              disabled={this.disabled}
              aria-invalid={this.invalid.toString()}
              onInput={(e) => this.handleInput(e as InputEvent)}
              onFocus={() => this.handleFocus()}
              onKeyDown={(e) => this.handleKeyDown(e)}
            />
            {this.showClear && hasValue && (
              <button
                part="clear"
                class="combobox__clear"
                onClick={(e) => this.handleClear(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <span part="chevron" class="combobox__chevron">
              {this.open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </span>
          </div>
        ) : (
          <div part="trigger" class="combobox__trigger">
            <input
              part="input"
              class="combobox__input"
              type="text"
              value={displayValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              aria-invalid={this.invalid.toString()}
              onInput={(e) => this.handleInput(e as InputEvent)}
              onFocus={() => this.handleFocus()}
              onKeyDown={(e) => this.handleKeyDown(e)}
            />
            {this.showClear && hasValue && (
              <button
                part="clear"
                class="combobox__clear"
                onClick={(e) => this.handleClear(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <span part="chevron" class="combobox__chevron">
              {this.open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </span>
          </div>
        )}

        {this.open && (
          <div part="content" class="combobox__content">
            {this.getVisibleItems().length === 0 && (
              <div part="empty" class="combobox__empty">
                <slot name="empty">No items found.</slot>
              </div>
            )}
            <div part="list" class="combobox__list">
              <slot />
            </div>
          </div>
        )}
      </div>
    );
  }
}
