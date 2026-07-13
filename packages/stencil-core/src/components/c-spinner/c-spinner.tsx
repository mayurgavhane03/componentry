import { Component, h, Prop } from '@stencil/core';

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @status stable
 *
 * @csspart base - The component's base wrapper (the <svg> element).
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
@Component({
  tag: 'c-spinner',
  styleUrl: 'c-spinner.css',
  shadow: true
})
export class CSpinner {
  /**
   * The accessible label for the spinner. Since spinners don't have visible text, this label is exposed to
   * assistive devices via `aria-label`.
   */
  @Prop() label = 'Loading';

  render() {
    return (
      <svg part="base" class="spinner" role="progressbar" aria-label={this.label}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    );
  }
}