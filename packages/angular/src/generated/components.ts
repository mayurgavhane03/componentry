/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@componentry/stencil/dist/components';

import { defineCustomElement as defineCButton } from '@componentry/stencil/dist/components/c-button.js';
@ProxyCmp({
  defineCustomElementFn: defineCButton,
  inputs: ['caret', 'circle', 'disabled', 'download', 'href', 'loading', 'name', 'outline', 'pill', 'rel', 'size', 'target', 'tooltip', 'type', 'value', 'variant'],
  methods: ['triggerClick', 'setFocus', 'removeFocus', 'checkValidity', 'reportValidity', 'setCustomValidity']
})
@Component({
  selector: 'c-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caret', 'circle', 'disabled', 'download', 'href', 'loading', 'name', 'outline', 'pill', 'rel', 'size', 'target', 'tooltip', 'type', 'value', 'variant'],
  outputs: ['cBlur', 'cFocus', 'cInvalid'],
})
export class CButton {
  protected el: HTMLCButtonElement;
  @Output() cBlur = new EventEmitter<CButtonCustomEvent<void>>();
  @Output() cFocus = new EventEmitter<CButtonCustomEvent<void>>();
  @Output() cInvalid = new EventEmitter<CButtonCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CButtonCustomEvent } from '@componentry/stencil/dist/components';

export declare interface CButton extends Components.CButton {
  /**
   * Emitted when the button loses focus.
   */
  cBlur: EventEmitter<CButtonCustomEvent<void>>;
  /**
   * Emitted when the button gains focus.
   */
  cFocus: EventEmitter<CButtonCustomEvent<void>>;
  /**
   * Emitted when the form control fails constraint validation.
   */
  cInvalid: EventEmitter<CButtonCustomEvent<void>>;
}


