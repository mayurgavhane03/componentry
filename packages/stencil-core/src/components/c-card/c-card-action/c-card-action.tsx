import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-card-action',
  styleUrl: 'c-card-action.css',
  scoped: true,   // ← not shadow
})
export class CCardAction {
  render() {
    return (
      <Host data-slot="card-action">
        <slot />
      </Host>
    );
  }
}