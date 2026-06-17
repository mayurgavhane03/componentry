import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-card-content',
  styleUrl: 'c-card-content.css',
  shadow: true,
})
export class CCardContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
