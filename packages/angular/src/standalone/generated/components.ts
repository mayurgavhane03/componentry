/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@componentry/stencil/components';

import { defineCustomElement as defineCButton } from '@componentry/stencil/components/c-button.js';
@ProxyCmp({
  defineCustomElementFn: defineCButton,
  inputs: ['disabled', 'label', 'size', 'variant']
})
@Component({
  selector: 'c-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'label', 'size', 'variant'],
  outputs: ['cClick'],
})
export class CButton {
  protected el: HTMLCButtonElement;
  @Output() cClick = new EventEmitter<CButtonCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CButtonCustomEvent } from '@componentry/stencil/components';

export declare interface CButton extends Components.CButton {
  /**
   * Fired when button is clicked
   */
  cClick: EventEmitter<CButtonCustomEvent<void>>;
}


