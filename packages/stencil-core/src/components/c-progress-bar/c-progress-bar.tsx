import { Component, Prop, h, Host, Element, State } from '@stencil/core';

/**
 * @summary Progress bars are used to show the status of an ongoing operation.
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @part base - The component's base wrapper.
 * @part indicator - The progress bar's indicator.
 * @part label - The progress bar's label.
 *
 * @cssproperty --c-height - The progress bar's height.
 * @cssproperty --c-track-color - The color of the track.
 * @cssproperty --c-indicator-color - The color of the indicator.
 * @cssproperty --c-label-color - The color of the label.
 */
@Component({
  tag: 'c-progress-bar',
  styleUrl: 'c-progress-bar.css',
  shadow: true
})
export class CProgressBar {
  @Element() el!: HTMLElement;

  /** The current progress as a percentage, 0 to 100. */
  @Prop({ reflect: true }) value = 0;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @Prop({ reflect: true }) indeterminate = false;

  /** A custom label for assistive devices. */
  @Prop() label = '';

  /** Optional title attribute passed to the base wrapper. */
  @Prop() titleText?: string;

  @State() isRtl = false;

  componentWillLoad() {
    this.isRtl = getComputedStyle(this.el).direction === 'rtl';
  }

  render() {
    const hasLabel = this.label.length > 0;

    return (
      <Host>
        <div
          part="base"
          class={{
            'c-progress-bar': true,
            'c-progress-bar--indeterminate': this.indeterminate,
            'c-progress-bar--rtl': this.isRtl
          }}
          role="progressbar"
          title={this.titleText}
          aria-label={hasLabel ? this.label : 'progress'}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={this.indeterminate ? '0' : `${this.value}`}
        >
          <div
            part="indicator"
            class="c-progress-bar__indicator"
            style={{ width: `${this.value}%` }}
          >
            {!this.indeterminate && (
              <span part="label" class="c-progress-bar__label">
                <slot></slot>
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}