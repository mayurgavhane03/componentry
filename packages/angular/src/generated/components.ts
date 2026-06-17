/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@componentry/stencil/dist/components';

import { defineCustomElement as defineCAvatar } from '@componentry/stencil/dist/components/c-avatar.js';
import { defineCustomElement as defineCBadge } from '@componentry/stencil/dist/components/c-badge.js';
import { defineCustomElement as defineCButton } from '@componentry/stencil/dist/components/c-button.js';
import { defineCustomElement as defineCButtonGroup } from '@componentry/stencil/dist/components/c-button-group.js';
import { defineCustomElement as defineCCard } from '@componentry/stencil/dist/components/c-card.js';
import { defineCustomElement as defineCCardAction } from '@componentry/stencil/dist/components/c-card-action.js';
import { defineCustomElement as defineCCardContent } from '@componentry/stencil/dist/components/c-card-content.js';
import { defineCustomElement as defineCCardDescription } from '@componentry/stencil/dist/components/c-card-description.js';
import { defineCustomElement as defineCCardFooter } from '@componentry/stencil/dist/components/c-card-footer.js';
import { defineCustomElement as defineCCardHeader } from '@componentry/stencil/dist/components/c-card-header.js';
import { defineCustomElement as defineCCardTitle } from '@componentry/stencil/dist/components/c-card-title.js';
import { defineCustomElement as defineCCheckbox } from '@componentry/stencil/dist/components/c-checkbox.js';
import { defineCustomElement as defineCInput } from '@componentry/stencil/dist/components/c-input.js';
@ProxyCmp({
  defineCustomElementFn: defineCAvatar,
  inputs: ['image', 'initials', 'label', 'loading', 'shape']
})
@Component({
  selector: 'c-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['image', 'initials', 'label', 'loading', 'shape'],
  outputs: ['cError'],
})
export class CAvatar {
  protected el: HTMLCAvatarElement;
  @Output() cError = new EventEmitter<CAvatarCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CAvatarCustomEvent } from '@componentry/stencil/dist/components';

export declare interface CAvatar extends Components.CAvatar {
  /**
   * Emitted when the image fails to load.
   */
  cError: EventEmitter<CAvatarCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCBadge,
  inputs: ['pill', 'pulse', 'variant']
})
@Component({
  selector: 'c-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['pill', 'pulse', 'variant'],
})
export class CBadge {
  protected el: HTMLCBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CBadge extends Components.CBadge {}


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


@ProxyCmp({
  defineCustomElementFn: defineCButtonGroup,
  inputs: ['label', 'orientation']
})
@Component({
  selector: 'c-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'orientation'],
})
export class CButtonGroup {
  protected el: HTMLCButtonGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CButtonGroup extends Components.CButtonGroup {}


@ProxyCmp({
  defineCustomElementFn: defineCCard,
  inputs: ['size']
})
@Component({
  selector: 'c-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size'],
})
export class CCard {
  protected el: HTMLCCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCard extends Components.CCard {}


@ProxyCmp({
  defineCustomElementFn: defineCCardAction
})
@Component({
  selector: 'c-card-action',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardAction {
  protected el: HTMLCCardActionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardAction extends Components.CCardAction {}


@ProxyCmp({
  defineCustomElementFn: defineCCardContent
})
@Component({
  selector: 'c-card-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardContent {
  protected el: HTMLCCardContentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardContent extends Components.CCardContent {}


@ProxyCmp({
  defineCustomElementFn: defineCCardDescription
})
@Component({
  selector: 'c-card-description',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardDescription {
  protected el: HTMLCCardDescriptionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardDescription extends Components.CCardDescription {}


@ProxyCmp({
  defineCustomElementFn: defineCCardFooter
})
@Component({
  selector: 'c-card-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardFooter {
  protected el: HTMLCCardFooterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardFooter extends Components.CCardFooter {}


@ProxyCmp({
  defineCustomElementFn: defineCCardHeader
})
@Component({
  selector: 'c-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardHeader {
  protected el: HTMLCCardHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardHeader extends Components.CCardHeader {}


@ProxyCmp({
  defineCustomElementFn: defineCCardTitle
})
@Component({
  selector: 'c-card-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCardTitle {
  protected el: HTMLCCardTitleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCardTitle extends Components.CCardTitle {}


@ProxyCmp({
  defineCustomElementFn: defineCCheckbox,
  inputs: ['checkBoxtitle', 'checked', 'defaultChecked', 'disabled', 'form', 'helpText', 'indeterminate', 'name', 'required', 'size', 'value'],
  methods: ['checkClick', 'checkFocus', 'checkBlur', 'checkValidity', 'reportValidity', 'setCustomValidity']
})
@Component({
  selector: 'c-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkBoxtitle', 'checked', 'defaultChecked', 'disabled', 'form', 'helpText', 'indeterminate', 'name', 'required', 'size', { name: 'value', required: true }],
  outputs: ['cBlur', 'cChange', 'cFocus', 'cInput', 'cInvalid'],
})
export class CCheckbox {
  protected el: HTMLCCheckboxElement;
  @Output() cBlur = new EventEmitter<CCheckboxCustomEvent<void>>();
  @Output() cChange = new EventEmitter<CCheckboxCustomEvent<void>>();
  @Output() cFocus = new EventEmitter<CCheckboxCustomEvent<void>>();
  @Output() cInput = new EventEmitter<CCheckboxCustomEvent<void>>();
  @Output() cInvalid = new EventEmitter<CCheckboxCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CCheckboxCustomEvent } from '@componentry/stencil/dist/components';

export declare interface CCheckbox extends Components.CCheckbox {

  cBlur: EventEmitter<CCheckboxCustomEvent<void>>;

  cChange: EventEmitter<CCheckboxCustomEvent<void>>;

  cFocus: EventEmitter<CCheckboxCustomEvent<void>>;

  cInput: EventEmitter<CCheckboxCustomEvent<void>>;

  cInvalid: EventEmitter<CCheckboxCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCInput,
  inputs: ['autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearable', 'disabled', 'enterkeyhint', 'filled', 'helpText', 'inputTitle', 'inputmode', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'noSpinButtons', 'passwordToggle', 'pattern', 'pill', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'removeFocus', 'select', 'setSelectionRange', 'setRangeText', 'showPicker', 'stepUp', 'stepDown', 'checkValidity', 'reportValidity', 'setCustomValidity']
})
@Component({
  selector: 'c-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'autocapitalize', required: true }, { name: 'autocomplete', required: true }, { name: 'autocorrect', required: true }, { name: 'autofocus', required: true }, 'clearable', 'disabled', { name: 'enterkeyhint', required: true }, 'filled', 'helpText', 'inputTitle', { name: 'inputmode', required: true }, 'label', { name: 'max', required: true }, { name: 'maxlength', required: true }, { name: 'min', required: true }, { name: 'minlength', required: true }, 'name', 'noSpinButtons', 'passwordToggle', { name: 'pattern', required: true }, 'pill', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', { name: 'step', required: true }, 'type', 'value'],
  outputs: ['cBlur', 'cChange', 'cClear', 'cFocus', 'cInput', 'cInvalid'],
})
export class CInput {
  protected el: HTMLCInputElement;
  @Output() cBlur = new EventEmitter<CInputCustomEvent<void>>();
  @Output() cChange = new EventEmitter<CInputCustomEvent<void>>();
  @Output() cClear = new EventEmitter<CInputCustomEvent<void>>();
  @Output() cFocus = new EventEmitter<CInputCustomEvent<void>>();
  @Output() cInput = new EventEmitter<CInputCustomEvent<void>>();
  @Output() cInvalid = new EventEmitter<CInputCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CInputCustomEvent } from '@componentry/stencil/dist/components';

export declare interface CInput extends Components.CInput {

  cBlur: EventEmitter<CInputCustomEvent<void>>;

  cChange: EventEmitter<CInputCustomEvent<void>>;

  cClear: EventEmitter<CInputCustomEvent<void>>;

  cFocus: EventEmitter<CInputCustomEvent<void>>;

  cInput: EventEmitter<CInputCustomEvent<void>>;

  cInvalid: EventEmitter<CInputCustomEvent<void>>;
}


