import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @summary A single entry within a `c-breadcrumb`. Renders as a link unless
 * it's the current/last item, in which case it renders as plain text with
 * `aria-current="page"`.
 *
 * @slot - The item's label content.
 * @slot start - An optional icon or element placed before the label.
 * @slot end - An optional icon or element placed after the label.
 * @slot separator - Overrides the default chevron separator for this item.
 *   Normally set automatically by the parent `c-breadcrumb` when a custom
 *   separator is provided there — you shouldn't need to set this directly.
 *
 * @csspart base - The item's base wrapper, an `<li>` element.
 * @csspart link - The link or span that wraps the label, start, and end slots.
 * @csspart label - The container that wraps the default slot.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart separator - The container that wraps the separator icon/slot.
 */
@Component({
  tag: 'c-breadcrumb-item',
  styleUrl: 'c-breadcrumb-item.css',
  shadow: true,
})
export class CBreadcrumbItem {
  /** Turns the item into a link pointing at this URL. Omit for a non-link step (e.g. an ellipsis or a disabled crumb). */
  @Prop() href?: string;

  /** Where to open the link. Only relevant when `href` is set. */
  @Prop() target?: '_blank' | '_parent' | '_self' | '_top';

  /**
   * `rel` attribute for the link. Defaults to a safe value when `target`
   * is `_blank` to avoid `window.opener` reverse-tabnabbing.
   */
  @Prop() rel?: string;

  /**
   * Marks this as the current page. Set automatically by the parent
   * `c-breadcrumb` for the last item — you normally don't need to set
   * this by hand. When `true`, the item renders as non-interactive text.
   */
  @Prop({ reflect: true, mutable: true }) current = false;

  /**
   * Whether to render the separator after this item. Set automatically by
   * the parent so the last item doesn't get a trailing separator.
   */
  @Prop({ mutable: true }) separator = true;

  private get computedRel() {
    if (this.rel) return this.rel;
    return this.target === '_blank' ? 'noreferrer noopener' : undefined;
  }

  render() {
    const isLink = Boolean(this.href) && !this.current;
    const Tag = isLink ? 'a' : 'span';

    return (
      <Host>
        <li part="base" class="breadcrumb-item">
          <Tag
            part="link"
            class={{
              'breadcrumb-item__link': true,
              'breadcrumb-item__link--current': this.current,
            }}
            {...(isLink
              ? {
                  href: this.href,
                  target: this.target,
                  rel: this.computedRel,
                }
              : {})}
            aria-current={this.current ? 'page' : undefined}
            tabIndex={!isLink && !this.current ? -1 : undefined}
          >
            <span part="start" class="breadcrumb-item__start">
              <slot name="start" />
            </span>
            <span part="label" class="breadcrumb-item__label">
              <slot />
            </span>
            <span part="end" class="breadcrumb-item__end">
              <slot name="end" />
            </span>
          </Tag>

          {this.separator && (
            <span
              part="separator"
              class="breadcrumb-item__separator"
              role="presentation"
              aria-hidden="true"
            >
              <slot name="separator">
                <svg
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                  focusable="false"
                >
                  <path
                    d="M6 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </slot>
            </span>
          )}
        </li>
      </Host>
    );
  }
}