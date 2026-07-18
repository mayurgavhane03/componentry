/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@componentry-ui/stencil/dist/components';

import { defineCustomElement as defineCAccordion } from '@componentry-ui/stencil/dist/components/c-accordion.js';
import { defineCustomElement as defineCAlert } from '@componentry-ui/stencil/dist/components/c-alert.js';
import { defineCustomElement as defineCAvatar } from '@componentry-ui/stencil/dist/components/c-avatar.js';
import { defineCustomElement as defineCBadge } from '@componentry-ui/stencil/dist/components/c-badge.js';
import { defineCustomElement as defineCButton } from '@componentry-ui/stencil/dist/components/c-button.js';
import { defineCustomElement as defineCButtonGroup } from '@componentry-ui/stencil/dist/components/c-button-group.js';
import { defineCustomElement as defineCCard } from '@componentry-ui/stencil/dist/components/c-card.js';
import { defineCustomElement as defineCCardAction } from '@componentry-ui/stencil/dist/components/c-card-action.js';
import { defineCustomElement as defineCCardContent } from '@componentry-ui/stencil/dist/components/c-card-content.js';
import { defineCustomElement as defineCCardDescription } from '@componentry-ui/stencil/dist/components/c-card-description.js';
import { defineCustomElement as defineCCardFooter } from '@componentry-ui/stencil/dist/components/c-card-footer.js';
import { defineCustomElement as defineCCardHeader } from '@componentry-ui/stencil/dist/components/c-card-header.js';
import { defineCustomElement as defineCCardTitle } from '@componentry-ui/stencil/dist/components/c-card-title.js';
import { defineCustomElement as defineCCarousel } from '@componentry-ui/stencil/dist/components/c-carousel.js';
import { defineCustomElement as defineCCarouselItem } from '@componentry-ui/stencil/dist/components/c-carousel-item.js';
import { defineCustomElement as defineCCheckbox } from '@componentry-ui/stencil/dist/components/c-checkbox.js';
import { defineCustomElement as defineCCombobox } from '@componentry-ui/stencil/dist/components/c-combobox.js';
import { defineCustomElement as defineCComboboxItem } from '@componentry-ui/stencil/dist/components/c-combobox-item.js';
import { defineCustomElement as defineCDialog } from '@componentry-ui/stencil/dist/components/c-dialog.js';
import { defineCustomElement as defineCDrawer } from '@componentry-ui/stencil/dist/components/c-drawer.js';
import { defineCustomElement as defineCInput } from '@componentry-ui/stencil/dist/components/c-input.js';
import { defineCustomElement as defineCMenu } from '@componentry-ui/stencil/dist/components/c-menu.js';
import { defineCustomElement as defineCMenuItem } from '@componentry-ui/stencil/dist/components/c-menu-item.js';
import { defineCustomElement as defineCPopup } from '@componentry-ui/stencil/dist/components/c-popup.js';
import { defineCustomElement as defineCProgressBar } from '@componentry-ui/stencil/dist/components/c-progress-bar.js';
import { defineCustomElement as defineCRadio } from '@componentry-ui/stencil/dist/components/c-radio.js';
import { defineCustomElement as defineCRadioGroup } from '@componentry-ui/stencil/dist/components/c-radio-group.js';
import { defineCustomElement as defineCRating } from '@componentry-ui/stencil/dist/components/c-rating.js';
import { defineCustomElement as defineCSpinner } from '@componentry-ui/stencil/dist/components/c-spinner.js';
import { defineCustomElement as defineCTooltip } from '@componentry-ui/stencil/dist/components/c-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineCAccordion,
  inputs: ['disabled', 'open', 'summary'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'c-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'open', { name: 'summary', required: true }],
  outputs: ['c-show', 'cAfterShow', 'cHide', 'cAfterHide'],
})
export class CAccordion {
  protected el: HTMLCAccordionElement;
  @Output() cShow = new EventEmitter<CAccordionCustomEvent<void>>();
  @Output() cAfterShow = new EventEmitter<CAccordionCustomEvent<void>>();
  @Output() cHide = new EventEmitter<CAccordionCustomEvent<void>>();
  @Output() cAfterHide = new EventEmitter<CAccordionCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CAccordionCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CAccordion extends Components.CAccordion {

  'c-show': EventEmitter<CAccordionCustomEvent<void>>;

  cAfterShow: EventEmitter<CAccordionCustomEvent<void>>;

  cHide: EventEmitter<CAccordionCustomEvent<void>>;

  cAfterHide: EventEmitter<CAccordionCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCAlert,
  inputs: ['closable', 'countdown', 'duration', 'open', 'variant'],
  methods: ['show', 'hide', 'toast']
})
@Component({
  selector: 'c-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closable', 'countdown', 'duration', 'open', 'variant'],
  outputs: ['cShow', 'cAfterShow', 'cHide', 'cAfterHide'],
})
export class CAlert {
  protected el: HTMLCAlertElement;
  @Output() cShow = new EventEmitter<CAlertCustomEvent<void>>();
  @Output() cAfterShow = new EventEmitter<CAlertCustomEvent<void>>();
  @Output() cHide = new EventEmitter<CAlertCustomEvent<void>>();
  @Output() cAfterHide = new EventEmitter<CAlertCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CAlertCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CAlert extends Components.CAlert {

  cShow: EventEmitter<CAlertCustomEvent<void>>;

  cAfterShow: EventEmitter<CAlertCustomEvent<void>>;

  cHide: EventEmitter<CAlertCustomEvent<void>>;

  cAfterHide: EventEmitter<CAlertCustomEvent<void>>;
}


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


import type { CAvatarCustomEvent } from '@componentry-ui/stencil/dist/components';

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


import type { CButtonCustomEvent } from '@componentry-ui/stencil/dist/components';

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
  defineCustomElementFn: defineCCarousel,
  inputs: ['autoplay', 'autoplayInterval', 'loop', 'mouseDragging', 'navigation', 'orientation', 'pagination', 'slidesPerMove', 'slidesPerPage'],
  methods: ['previous', 'next', 'goToSlide']
})
@Component({
  selector: 'c-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoplay', 'autoplayInterval', 'loop', 'mouseDragging', 'navigation', 'orientation', 'pagination', 'slidesPerMove', 'slidesPerPage'],
  outputs: ['cSlideChange'],
})
export class CCarousel {
  protected el: HTMLCCarouselElement;
  @Output() cSlideChange = new EventEmitter<CCarouselCustomEvent<{ index: number; slide: HTMLElement; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CCarouselCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CCarousel extends Components.CCarousel {

  cSlideChange: EventEmitter<CCarouselCustomEvent<{ index: number; slide: HTMLElement; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCCarouselItem
})
@Component({
  selector: 'c-carousel-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CCarouselItem {
  protected el: HTMLCCarouselItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CCarouselItem extends Components.CCarouselItem {}


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


import type { CCheckboxCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CCheckbox extends Components.CCheckbox {

  cBlur: EventEmitter<CCheckboxCustomEvent<void>>;

  cChange: EventEmitter<CCheckboxCustomEvent<void>>;

  cFocus: EventEmitter<CCheckboxCustomEvent<void>>;

  cInput: EventEmitter<CCheckboxCustomEvent<void>>;

  cInvalid: EventEmitter<CCheckboxCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCCombobox,
  inputs: ['autoHighlight', 'disabled', 'invalid', 'multiple', 'placeholder', 'showClear', 'value']
})
@Component({
  selector: 'c-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoHighlight', 'disabled', 'invalid', 'multiple', 'placeholder', 'showClear', 'value'],
  outputs: ['valueChange', 'openChange'],
})
export class CCombobox {
  protected el: HTMLCComboboxElement;
  @Output() valueChange = new EventEmitter<CComboboxCustomEvent<string | string[]>>();
  @Output() openChange = new EventEmitter<CComboboxCustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CComboboxCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CCombobox extends Components.CCombobox {

  valueChange: EventEmitter<CComboboxCustomEvent<string | string[]>>;

  openChange: EventEmitter<CComboboxCustomEvent<boolean>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCComboboxItem,
  inputs: ['highlighted', 'itemHidden', 'label', 'selected', 'value']
})
@Component({
  selector: 'c-combobox-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['highlighted', 'itemHidden', 'label', 'selected', 'value'],
  outputs: ['itemSelect'],
})
export class CComboboxItem {
  protected el: HTMLCComboboxItemElement;
  @Output() itemSelect = new EventEmitter<CComboboxItemCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CComboboxItemCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CComboboxItem extends Components.CComboboxItem {

  itemSelect: EventEmitter<CComboboxItemCustomEvent<string>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCDialog,
  inputs: ['label', 'noHeader', 'open'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'c-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'noHeader', 'open'],
  outputs: ['c-show', 'c-after-show', 'c-hide', 'c-after-hide', 'c-initial-focus', 'c-request-close'],
})
export class CDialog {
  protected el: HTMLCDialogElement;
  @Output() cShow = new EventEmitter<CDialogCustomEvent<void>>();
  @Output() cAfterShow = new EventEmitter<CDialogCustomEvent<void>>();
  @Output() cHide = new EventEmitter<CDialogCustomEvent<void>>();
  @Output() cAfterHide = new EventEmitter<CDialogCustomEvent<void>>();
  @Output() cInitialFocus = new EventEmitter<CDialogCustomEvent<void>>();
  @Output() cRequestClose = new EventEmitter<CDialogCustomEvent<{ source: "close-button" | "keyboard" | "overlay"; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CDialogCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CDialog extends Components.CDialog {

  'c-show': EventEmitter<CDialogCustomEvent<void>>;

  'c-after-show': EventEmitter<CDialogCustomEvent<void>>;

  'c-hide': EventEmitter<CDialogCustomEvent<void>>;

  'c-after-hide': EventEmitter<CDialogCustomEvent<void>>;

  'c-initial-focus': EventEmitter<CDialogCustomEvent<void>>;

  'c-request-close': EventEmitter<CDialogCustomEvent<{ source: "close-button" | "keyboard" | "overlay"; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCDrawer,
  inputs: ['contained', 'label', 'noHeader', 'noMaskClosable', 'open', 'placement'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'c-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['contained', 'label', 'noHeader', 'noMaskClosable', 'open', 'placement'],
  outputs: ['cShow', 'cAfterShow', 'cHide', 'cAfterHide', 'cInitialFocus', 'cRequestClose'],
})
export class CDrawer {
  protected el: HTMLCDrawerElement;
  @Output() cShow = new EventEmitter<CDrawerCustomEvent<void>>();
  @Output() cAfterShow = new EventEmitter<CDrawerCustomEvent<void>>();
  @Output() cHide = new EventEmitter<CDrawerCustomEvent<void>>();
  @Output() cAfterHide = new EventEmitter<CDrawerCustomEvent<void>>();
  @Output() cInitialFocus = new EventEmitter<CDrawerCustomEvent<void>>();
  @Output() cRequestClose = new EventEmitter<CDrawerCustomEvent<{ source: "close-button" | "keyboard" | "overlay"; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CDrawerCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CDrawer extends Components.CDrawer {

  cShow: EventEmitter<CDrawerCustomEvent<void>>;

  cAfterShow: EventEmitter<CDrawerCustomEvent<void>>;

  cHide: EventEmitter<CDrawerCustomEvent<void>>;

  cAfterHide: EventEmitter<CDrawerCustomEvent<void>>;

  cInitialFocus: EventEmitter<CDrawerCustomEvent<void>>;

  cRequestClose: EventEmitter<CDrawerCustomEvent<{ source: "close-button" | "keyboard" | "overlay"; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCInput,
  inputs: ['clearable', 'disabled', 'filled', 'helpText', 'inputAutocapitalize', 'inputAutocomplete', 'inputAutocorrect', 'inputAutofocus', 'inputEnterkeyhint', 'inputInputmode', 'inputTitle', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'noSpinButtons', 'passwordToggle', 'pattern', 'pill', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'removeFocus', 'select', 'setSelectionRange', 'setRangeText', 'showPicker', 'stepUp', 'stepDown', 'checkValidity', 'reportValidity', 'setCustomValidity']
})
@Component({
  selector: 'c-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'disabled', 'filled', 'helpText', 'inputAutocapitalize', 'inputAutocomplete', 'inputAutocorrect', 'inputAutofocus', 'inputEnterkeyhint', 'inputInputmode', 'inputTitle', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'noSpinButtons', 'passwordToggle', 'pattern', 'pill', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
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


import type { CInputCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CInput extends Components.CInput {

  cBlur: EventEmitter<CInputCustomEvent<void>>;

  cChange: EventEmitter<CInputCustomEvent<void>>;

  cClear: EventEmitter<CInputCustomEvent<void>>;

  cFocus: EventEmitter<CInputCustomEvent<void>>;

  cInput: EventEmitter<CInputCustomEvent<void>>;

  cInvalid: EventEmitter<CInputCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCMenu,
  methods: ['getAllItems']
})
@Component({
  selector: 'c-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  outputs: ['cSelect'],
})
export class CMenu {
  protected el: HTMLCMenuElement;
  @Output() cSelect = new EventEmitter<CMenuCustomEvent<ICMenuMenuSelectEventDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CMenuCustomEvent } from '@componentry-ui/stencil/dist/components';
import type { MenuSelectEventDetail as ICMenuMenuSelectEventDetail } from '@componentry-ui/stencil/dist/components';

export declare interface CMenu extends Components.CMenu {

  cSelect: EventEmitter<CMenuCustomEvent<ICMenuMenuSelectEventDetail>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCMenuItem,
  inputs: ['checked', 'disabled', 'loading', 'type', 'value'],
  methods: ['getTextLabel']
})
@Component({
  selector: 'c-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'loading', 'type', 'value'],
  outputs: ['cSlotChange'],
})
export class CMenuItem {
  protected el: HTMLCMenuItemElement;
  @Output() cSlotChange = new EventEmitter<CMenuItemCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CMenuItemCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CMenuItem extends Components.CMenuItem {

  cSlotChange: EventEmitter<CMenuItemCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCPopup,
  inputs: ['active', 'anchor', 'arrow', 'arrowPadding', 'arrowPlacement', 'autoSize', 'autoSizeBoundary', 'autoSizePadding', 'distance', 'flip', 'flipBoundary', 'flipFallbackPlacements', 'flipFallbackStrategy', 'flipPadding', 'hoverBridge', 'placement', 'shift', 'shiftBoundary', 'shiftPadding', 'skidding', 'strategy', 'sync', 'textDirection'],
  methods: ['getPopupElement', 'reposition']
})
@Component({
  selector: 'c-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', { name: 'anchor', required: true }, 'arrow', 'arrowPadding', 'arrowPlacement', { name: 'autoSize', required: true }, { name: 'autoSizeBoundary', required: true }, 'autoSizePadding', 'distance', 'flip', { name: 'flipBoundary', required: true }, 'flipFallbackPlacements', 'flipFallbackStrategy', 'flipPadding', 'hoverBridge', 'placement', 'shift', { name: 'shiftBoundary', required: true }, 'shiftPadding', 'skidding', 'strategy', { name: 'sync', required: true }, 'textDirection'],
  outputs: ['cReposition'],
})
export class CPopup {
  protected el: HTMLCPopupElement;
  @Output() cReposition = new EventEmitter<CPopupCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CPopupCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CPopup extends Components.CPopup {

  cReposition: EventEmitter<CPopupCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCProgressBar,
  inputs: ['indeterminate', 'label', 'titleText', 'value']
})
@Component({
  selector: 'c-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['indeterminate', 'label', 'titleText', 'value'],
})
export class CProgressBar {
  protected el: HTMLCProgressBarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CProgressBar extends Components.CProgressBar {}


@ProxyCmp({
  defineCustomElementFn: defineCRadio,
  inputs: ['appearance', 'checked', 'disabled', 'size', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'c-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'checked', 'disabled', { name: 'size', required: true }, { name: 'value', required: true }],
  outputs: ['radioFocus', 'radioBlur'],
})
export class CRadio {
  protected el: HTMLCRadioElement;
  @Output() radioFocus = new EventEmitter<CRadioCustomEvent<void>>();
  @Output() radioBlur = new EventEmitter<CRadioCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CRadioCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CRadio extends Components.CRadio {
  /**
   * Emitted when the control gains focus.
   */
  radioFocus: EventEmitter<CRadioCustomEvent<void>>;
  /**
   * Emitted when the control loses focus.
   */
  radioBlur: EventEmitter<CRadioCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCRadioGroup,
  inputs: ['defaultValue', 'disabled', 'hint', 'label', 'name', 'orientation', 'required', 'size', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'c-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultValue', 'disabled', 'hint', 'label', 'name', 'orientation', 'required', { name: 'size', required: true }, 'value'],
  outputs: ['cChange', 'cInput'],
})
export class CRadioGroup {
  protected el: HTMLCRadioGroupElement;
  @Output() cChange = new EventEmitter<CRadioGroupCustomEvent<void>>();
  @Output() cInput = new EventEmitter<CRadioGroupCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CRadioGroupCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CRadioGroup extends Components.CRadioGroup {

  cChange: EventEmitter<CRadioGroupCustomEvent<void>>;

  cInput: EventEmitter<CRadioGroupCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCRating,
  inputs: ['dir', 'disabled', 'getSymbol', 'label', 'max', 'precision', 'readonly', 'value'],
  methods: ['setFocus', 'removeFocus']
})
@Component({
  selector: 'c-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dir', 'disabled', 'getSymbol', 'label', 'max', 'precision', 'readonly', 'value'],
  outputs: ['cRatingChange', 'cRatingHover'],
})
export class CRating {
  protected el: HTMLCRatingElement;
  @Output() cRatingChange = new EventEmitter<CRatingCustomEvent<void>>();
  @Output() cRatingHover = new EventEmitter<CRatingCustomEvent<{ phase: 'start' | 'move' | 'end'; value: number; }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CRatingCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CRating extends Components.CRating {

  cRatingChange: EventEmitter<CRatingCustomEvent<void>>;

  cRatingHover: EventEmitter<CRatingCustomEvent<{ phase: 'start' | 'move' | 'end'; value: number; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCSpinner,
  inputs: ['label']
})
@Component({
  selector: 'c-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label'],
})
export class CSpinner {
  protected el: HTMLCSpinnerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CSpinner extends Components.CSpinner {}


@ProxyCmp({
  defineCustomElementFn: defineCTooltip,
  inputs: ['content', 'disabled', 'distance', 'hoist', 'open', 'placement', 'skidding', 'trigger'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'c-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['content', 'disabled', 'distance', 'hoist', 'open', 'placement', 'skidding', 'trigger'],
  outputs: ['cShow', 'cAfterShow', 'cHide', 'cAfterHide'],
})
export class CTooltip {
  protected el: HTMLCTooltipElement;
  @Output() cShow = new EventEmitter<CTooltipCustomEvent<void>>();
  @Output() cAfterShow = new EventEmitter<CTooltipCustomEvent<void>>();
  @Output() cHide = new EventEmitter<CTooltipCustomEvent<void>>();
  @Output() cAfterHide = new EventEmitter<CTooltipCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { CTooltipCustomEvent } from '@componentry-ui/stencil/dist/components';

export declare interface CTooltip extends Components.CTooltip {

  cShow: EventEmitter<CTooltipCustomEvent<void>>;

  cAfterShow: EventEmitter<CTooltipCustomEvent<void>>;

  cHide: EventEmitter<CTooltipCustomEvent<void>>;

  cAfterHide: EventEmitter<CTooltipCustomEvent<void>>;
}


