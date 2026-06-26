import { Component, Prop, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "c-combobox-item",
  styleUrl: "c-combobox-item.css",
  shadow: true,
})
export class CComboboxItem {
  @Prop() value: string = "";
  @Prop() label: string = "";
  @Prop() selected: boolean = false;
  @Prop() highlighted: boolean = false;
  @Prop() hidden: boolean = false;

  @Event({ bubbles: true, composed: true }) itemSelect!: EventEmitter<string>;

  private handleClick(): void {
    this.itemSelect.emit(this.value);
  }

  componentWillLoad(): void {
    if (!this.label && this.value) {
      this.el.textContent?.trim();
    }
  }

  get el(): HTMLElement {
    return this as unknown as HTMLElement;
  }

  render() {
    return (
      <div
        part="base"
        class={{
          item: true,
          "item--selected": this.selected,
          "item--highlighted": this.highlighted,
          "item--hidden": this.hidden,
        }}
        onClick={() => this.handleClick()}
        role="option"
        aria-selected={this.selected.toString()}
        aria-hidden={this.hidden.toString()}
      >
        <slot />
        {this.selected && (
          <span part="check" class="item__check">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
    );
  }
}
