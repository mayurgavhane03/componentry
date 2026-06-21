import { Component, Host, h, Element, Event, EventEmitter, Method, Listen } from '@stencil/core';

export interface MenuSelectEventDetail {
  item: Element;
}

/**
 * @slot - The menu's content, including menu items, menu labels, and dividers.
 * @event cSelect - Emitted when a menu item is selected.
 */
@Component({
  tag: 'c-menu',
  styleUrl: 'c-menu.css',
  shadow: true,
})
export class CMenu {
  @Element() el!: HTMLElement;

  @Event({ eventName: 'cSelect' }) cSelect!: EventEmitter<MenuSelectEventDetail>;

  private slotEl!: HTMLSlotElement;

  connectedCallback() {
    this.el.setAttribute('role', 'menu');
  }

  private isMenuItem(el: Element): boolean {
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute('role') ?? '';
    return (
      tag === 'c-menu-item' ||
      ['menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(role)
    );
  }

  /** Gets all slotted menu items, ignoring dividers and other elements. */
  @Method()
  async getAllItems(): Promise<Element[]> {
    return this.getItems();
  }

  private getItems(): Element[] {
    if (!this.slotEl) return [];
    return [...this.slotEl.assignedElements({ flatten: true })].filter(
      el => !(el as HTMLElement).inert && this.isMenuItem(el),
    );
  }

  private getCurrentItem(): Element | undefined {
    return this.getItems().find(i => i.getAttribute('tabindex') === '0');
  }

  private setCurrentItem(item: Element) {
    this.getItems().forEach(i => {
      i.setAttribute('tabindex', i === item ? '0' : '-1');
    });
  }

  @Listen('click')
  handleClick(event: MouseEvent) {
    const menuItemRoles = ['menuitem', 'menuitemcheckbox'];
    const path = event.composedPath() as Element[];

    const target = path.find(el => menuItemRoles.includes(el?.getAttribute?.('role') || ''));
    if (!target) return;

    const closestMenu = path.find(el => el?.getAttribute?.('role') === 'menu');
    if (closestMenu !== this.el) return;

    const item = target as Element & { type?: string; checked?: boolean };
    if (item.type === 'checkbox') {
      item.checked = !item.checked;
    }

    this.cSelect.emit({ item });
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const item = this.getCurrentItem() as HTMLElement | undefined;
      event.preventDefault();
      event.stopPropagation();
      item?.click();
      return;
    }

    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getItems() as HTMLElement[];
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem as HTMLElement) : 0;

      if (!items.length) return;
      event.preventDefault();
      event.stopPropagation();

      if (event.key === 'ArrowDown') index++;
      else if (event.key === 'ArrowUp') index--;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = items.length - 1;

      if (index < 0) index = items.length - 1;
      if (index > items.length - 1) index = 0;

      this.setCurrentItem(items[index]);
      items[index].focus();
    }
  }

  @Listen('mousedown')
  handleMouseDown(event: MouseEvent) {
    const target = event.target as Element;
    if (this.isMenuItem(target)) {
      this.setCurrentItem(target);
    }
  }

  private handleSlotChange = () => {
    const items = this.getItems();
    if (items.length > 0) {
      this.setCurrentItem(items[0]);
    }
  };

  render() {
    return (
      <Host>
        <slot
          ref={el => (this.slotEl = el as HTMLSlotElement)}
          onSlotchange={this.handleSlotChange}
        />
      </Host>
    );
  }
}