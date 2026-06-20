import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-carousel-item',
  styleUrl: 'c-carousel-item.css',
  shadow: true,
})
export class CCarouselItem {
  render() {
    return <Host><slot /></Host>;
  }
}