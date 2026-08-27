import { Component, Element, Host, Prop, Watch, h } from '@stencil/core';

/**
 * @summary Breadcrumbs help users understand where they are within a site
 * or app by showing the path taken to reach the current page.
 *
 * @slot - One or more `c-breadcrumb-item` elements.
 * @slot separator - The visual separator rendered between items. Defaults
 *   to a chevron icon. Only used when an individual item doesn't provide
 *   its own `separator` slot content.
 *
 * @csspart base - The component's base wrapper, a `<nav>` element.
 * @csspart list - The list that wraps the slotted items, an `<ol>` element.
 */
@Component({
  tag: 'c-breadcrumb',
  styleUrl: 'c-breadcrumb.css',
  shadow: true,
})
export class CBreadcrumb {
  @Element() el!: HTMLElement;

  /**
   * An accessible label for the breadcrumb navigation region. Required for
   * a11y since a page can have more than one `<nav>` landmark.
   */
  @Prop() label = 'Breadcrumb';

  componentDidLoad() {
    this.syncItems();
  }

  @Watch('label')
  handleLabelChange() {
    /* no-op: label is read directly from the prop on each render */
  }

  private handleSlotChange = () => {
    this.syncItems();
  };

  /**
   * Marks the last item as "current" for assistive tech (aria-current="page")
   * and propagates a custom separator (if the consumer provided one via the
   * `separator` slot on `c-breadcrumb`) down into every item's light DOM,
   * since a slotted separator can't otherwise cross into each item's own
   * shadow root.
   */
  private syncItems() {
    const items = Array.from(
      this.el.querySelectorAll(':scope > c-breadcrumb-item')
    ) as Array<HTMLElement & { current: boolean }>;

    const customSeparatorSource = this.el.querySelector(
      ':scope > [slot="separator"]'
    );

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      item.current = isLast;

      if (customSeparatorSource) {
        let target = item.querySelector(
          ':scope > [slot="separator"]'
        ) as HTMLElement | null;

        if (!target) {
          target = document.createElement('span');
          target.setAttribute('slot', 'separator');
          item.appendChild(target);
        }

        target.innerHTML = customSeparatorSource.innerHTML;
      }
    });
  }

  render() {
    return (
      <Host>
        <nav part="base" class="breadcrumb" aria-label={this.label}>
          <ol part="list" class="breadcrumb__list">
            <slot onSlotchange={this.handleSlotChange} />
          </ol>
        </nav>
      </Host>
    );
  }
}