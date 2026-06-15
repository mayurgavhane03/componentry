import { Component, Host, Prop, h } from "@stencil/core";

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
@Component({
  tag: "c-badge",
  styleUrl: "c-badge.css", // drop in the same CSS file unchanged
  shadow: true,
})
export class CBadge {
  /** The badge's theme variant. */
  @Prop({ reflect: true }) variant:
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "danger" = "primary";

  /** Draws a pill-style badge with rounded edges. */
  @Prop({ reflect: true }) pill: boolean = false;

  /** Makes the badge pulsate to draw attention. */
  @Prop({ reflect: true }) pulse: boolean = false;

  render() {
    const classes = [
      "badge",
      `badge--${this.variant}`,
      this.pill ? "badge--pill" : "",
      this.pulse ? "badge--pulse" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Host>
        <span part="base" class={classes} role="status">
          <slot />
        </span>
      </Host>
    );
  }
}
