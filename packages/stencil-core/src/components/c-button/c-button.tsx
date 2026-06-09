import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'c-button',
  styleUrl: 'c-button.css',
  shadow: true,
})
export class CButton {
  /**
   * Visual variant
   */
  @Prop() variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /**
   * Size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disabled state
   */
  @Prop() disabled = false;

  /**
   * Button label
   */
  @Prop() label = 'Button';

  /**
   * Fired when button is clicked
   */
  @Event() cClick!: EventEmitter<void>;

  private handleClick = (): void => {
    if (this.disabled) {
      return;
    }

    this.cClick.emit();
  };

  render() {
    return (
      <button
        type="button"
        class={`btn btn--${this.variant} btn--${this.size}`}
        disabled={this.disabled}
        onClick={this.handleClick}
      >
        <slot>{this.label}</slot>
      </button>
    );
  }
}