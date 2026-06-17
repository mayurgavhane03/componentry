import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-card-footer',
  styleUrl: 'c-card-footer.css',
  shadow: true,
})
export class CCardFooter {
  render() {
    return (
      <Host data-slot="card-footer">
        <slot />
      </Host>
    );
  }
}