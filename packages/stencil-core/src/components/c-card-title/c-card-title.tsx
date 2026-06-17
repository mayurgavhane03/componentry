import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-card-title',
  styleUrl: 'c-card-title.css',
  scoped: true,  
})
export class CCardTitle {
  render() {
    return (
      <Host data-slot="card-title">
        <slot />
      </Host>
    );
  }
}