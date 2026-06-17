import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-card-description',
  styleUrl: 'c-card-description.css',
  scoped: true,   // ← not shadow
})
export class CCardDescription {
  render() {
    return (
      <Host data-slot="card-description">
        <slot />
      </Host>
    );
  }
}