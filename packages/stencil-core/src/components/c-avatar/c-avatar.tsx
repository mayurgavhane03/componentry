import {
  Component,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  h,
} from "@stencil/core";

/**
 * @summary Avatars are used to represent a person or object.
 *
 * @event c-error - The image could not be loaded. This may because of an invalid URL,
 *   a temporary network condition, or some unknown cause.
 *
 * @slot icon - The default icon to use when no image or initials are present.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --size - The size of the avatar.
 */
@Component({
  tag: "c-avatar",
  styleUrl: "c-avatar.css", // same CSS file — just point styleUrl here
  shadow: true,
})
export class CAvatar {
  // ─── Internal state ────────────────────────────────────────────────────────

  @State() private hasError = false;

  // ─── Public props (mirrors Lit @property) ──────────────────────────────────

  /** The image source to use for the avatar. */
  @Prop() image: string = "";

  /** A label to use to describe the avatar to assistive devices. */
  @Prop() label: string = "";

  /** Initials to use as a fallback when no image is available (1–2 characters max recommended). */
  @Prop() initials: string = "";

  /** Indicates how the browser should load the image. */
  @Prop() loading: "eager" | "lazy" = "eager";

  /**
   * The shape of the avatar.
   * Reflected to the host element so external CSS can target it via attribute.
   */
  @Prop({ reflect: true }) shape: "circle" | "square" | "rounded" = "circle";

  // ─── Events ────────────────────────────────────────────────────────────────

  /** Emitted when the image fails to load. */
  @Event({ eventName: "cError", composed: true, bubbles: true })
  cError!: EventEmitter<void>;

  // ─── Watchers ──────────────────────────────────────────────────────────────

  /** Reset error state whenever a new image URL is supplied. */
  @Watch("image")
  handleImageChange() {
    this.hasError = false;
  }

  // ─── Event handlers ────────────────────────────────────────────────────────

  private handleImageLoadError = () => {
    this.hasError = true;
    this.cError.emit();
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const shapeClass = `avatar--${this.shape}`; // 'avatar--circle' | 'avatar--rounded' | 'avatar--square'

    const avatarWithImage = (
      <img
        part="image"
        class="avatar__image"
        src={this.image}
        loading={this.loading}
        alt=""
        onError={this.handleImageLoadError}
      />
    );

    const avatarWithoutImage = this.initials ? (
      <div part="initials" class="avatar__initials">
        {this.initials}
      </div>
    ) : (
      <div part="icon" class="avatar__icon" aria-hidden="true">
        {/*
          Slot mirrors Lit's <slot name="icon">.
          Default content rendered when no slotted icon is provided.
          Replace the inner SVG with your own icon system if needed.
        */}
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            {/* Bootstrap Icons – person-fill (equivalent to sl-icon name="person-fill") */}
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </slot>
      </div>
    );

    return (
      <Host>
        <div
          part="base"
          class={`avatar ${shapeClass}`}
          role="img"
          aria-label={this.label}
        >
          {this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
        </div>
      </Host>
    );
  }
}
