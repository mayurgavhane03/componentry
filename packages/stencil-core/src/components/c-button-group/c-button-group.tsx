import { Component, Host, Prop, State, Element, h } from '@stencil/core';

@Component({
  tag: 'c-button-group',
  styleUrl: 'c-button-group.css',
  shadow: true,
})
export class CButtonGroup {
  @Element() el!: HTMLElement;

  @Prop() label: string = '';
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  @State() disableRole: boolean = false;

  private defaultSlot!: HTMLSlotElement;

  private findButton(el: HTMLElement): HTMLElement | null {
    const selector = 'c-button, c-radio-button';
    return (el.closest(selector) ?? el.querySelector(selector)) as HTMLElement | null;
  }

  private handleFocus = (event: Event) => {
    const button = this.findButton(event.target as HTMLElement);
    button?.toggleAttribute('data-c-button-group__button--focus', true);
  };

  private handleBlur = (event: Event) => {
    const button = this.findButton(event.target as HTMLElement);
    button?.toggleAttribute('data-c-button-group__button--focus', false);
  };

  private handleMouseOver = (event: Event) => {
    const button = this.findButton(event.target as HTMLElement);
    button?.toggleAttribute('data-c-button-group__button--hover', true);
  };

  private handleMouseOut = (event: Event) => {
    const button = this.findButton(event.target as HTMLElement);
    button?.toggleAttribute('data-c-button-group__button--hover', false);
  };

  private handleSlotChange = () => {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })] as HTMLElement[];

    slottedElements.forEach(el => {
      const index = slottedElements.indexOf(el);
      const button = this.findButton(el);

      if (button) {
        button.toggleAttribute('data-c-button-group__button', true);
        button.toggleAttribute('data-c-button-group__button--first', index === 0);
        button.toggleAttribute('data-c-button-group__button--inner', index > 0 && index < slottedElements.length - 1);
        button.toggleAttribute('data-c-button-group__button--last', index === slottedElements.length - 1);
        button.toggleAttribute(
          'data-c-button-group__button--radio',
          button.tagName.toLowerCase() === 'c-radio-button'
        );
      }
    });
  };

  render() {
    return (
      <Host>
        <div
          part="base"
          class={{
            'button-group': true,
            'button-group--horizontal': this.orientation === 'horizontal',
            'button-group--vertical': this.orientation === 'vertical',
          }}
          role={this.disableRole ? 'presentation' : 'group'}
          aria-label={this.label}
          aria-orientation={this.orientation}
          onFocusout={this.handleBlur}
          onFocusin={this.handleFocus}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <slot
            ref={el => (this.defaultSlot = el as HTMLSlotElement)}
            onSlotchange={this.handleSlotChange}
          />
        </div>
      </Host>
    );
  }
}