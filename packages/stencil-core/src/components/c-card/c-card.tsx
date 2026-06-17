import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'c-card',
  styleUrl: 'c-card.css',
  shadow: true,
})
export class CCard {
  /** Controls spacing density. 'sm' uses tighter padding. */
  @Prop() size: 'default' | 'sm' = 'default';

  render() {
    return (
      <Host
        data-slot="card"
        data-size={this.size}
      >
        <slot />
      </Host>
    );
  }
}