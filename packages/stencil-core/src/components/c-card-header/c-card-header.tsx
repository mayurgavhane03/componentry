import { Component, Host,   h } from '@stencil/core';
@Component({
  tag: 'c-card-header',
  styleUrl: 'c-card-header.css',
  shadow: true,    
})
export class CCardHeader {
  render() {
    return (
      <Host data-slot="card-header">
        <div class="header-main">
          <slot name="title" />
          <slot name="description" />
        </div>
        <div class="header-action">
          <slot name="action" />
        </div>
      </Host>
    );
  }
}