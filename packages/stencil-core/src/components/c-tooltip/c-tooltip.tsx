import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  Watch,
  Method,
  h,
  Host,
} from "@stencil/core";
import { parseDuration, stopAnimations, animateTo } from "../../utils/animate";
interface CloseWatcherInstance {
  onclose: (() => void) | null;
  destroy: () => void;
}

type HTMLCPopupElement = HTMLElement & {
  active: boolean;
  reposition: () => Promise<void>;
  getPopupElement: () => Promise<HTMLElement>;
};
@Component({
  tag: "c-tooltip",
  styleUrl: "c-tooltip.css",
  shadow: true,
})
export class CTooltip {
  private hoverTimeout!: number;
  private closeWatcher: CloseWatcherInstance | null = null;
  private body!: HTMLElement;
  private popup!: HTMLCPopupElement;

  @Element() el!: HTMLElement;

  @Prop() content = "";

  @Prop() placement:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end" = "top";

  @Prop({ reflect: true }) disabled = false;

  @Prop() distance = 8;

  @Prop({ mutable: true, reflect: true }) open = false;

  @Prop() skidding = 0;

  @Prop() trigger = "hover focus";

  @Prop() hoist = false;

  @Event({ bubbles: true, composed: true, cancelable: false })
  cShow!: EventEmitter<void>;
  @Event({ bubbles: true, composed: true, cancelable: false })
  cAfterShow!: EventEmitter<void>;
  @Event({ bubbles: true, composed: true, cancelable: false })
  cHide!: EventEmitter<void>;
  @Event({ bubbles: true, composed: true, cancelable: false })
  cAfterHide!: EventEmitter<void>;

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);

    this.el.addEventListener("blur", this.handleBlur, true);
    this.el.addEventListener("focus", this.handleFocus, true);
    this.el.addEventListener("click", this.handleClick);
    this.el.addEventListener("mouseover", this.handleMouseOver);
    this.el.addEventListener("mouseout", this.handleMouseOut);
  }

  disconnectedCallback() {
    this.el.removeEventListener("blur", this.handleBlur, true);
    this.el.removeEventListener("focus", this.handleFocus, true);
    this.el.removeEventListener("click", this.handleClick);
    this.el.removeEventListener("mouseover", this.handleMouseOver);
    this.el.removeEventListener("mouseout", this.handleMouseOut);

    this.closeWatcher?.destroy();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  async componentDidLoad() {
    this.body.hidden = !this.open;

    if (this.open) {
      this.popup.active = true;
      await this.popup.reposition();
    }
  }

  private handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }

  private handleClick() {
    if (this.hasTrigger("click")) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  private handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }

  private handleDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }

  private handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(
        getComputedStyle(this.el).getPropertyValue("--show-delay"),
      );
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.show(), delay);
    }
  }

  private handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(
        getComputedStyle(this.el).getPropertyValue("--hide-delay"),
      );
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
    }
  }

  private hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }

@Watch("open")
async handleOpenChange(newValue: boolean, oldValue: boolean) {
  if (newValue === oldValue) return;

  const popupBox = await this.popup.getPopupElement();

  if (this.open) {
    this.cShow.emit();

    if ("CloseWatcher" in window) {
      this.closeWatcher?.destroy();
      const watcher = new (
        window as unknown as { CloseWatcher: new () => CloseWatcherInstance }
      ).CloseWatcher();
      watcher.onclose = () => {
        this.hide();
      };
      this.closeWatcher = watcher;
    } else {
      document.addEventListener("keydown", this.handleDocumentKeyDown);
    }

    await stopAnimations(popupBox);
    this.body.hidden = false;
    this.popup.active = true;
    await animateTo(
      popupBox,
      [
        { opacity: 0, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 150, easing: "ease" },
    );
    await this.popup.reposition();

    this.cAfterShow.emit();
  } else {
    this.cHide.emit();
    this.closeWatcher?.destroy();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);

    await stopAnimations(popupBox);
    await animateTo(
      popupBox,
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.8)" },
      ],
      { duration: 150, easing: "ease" },
    );
    this.popup.active = false;
    this.body.hidden = true;

    this.cAfterHide.emit();
  }
}

  @Watch("content")
  @Watch("distance")
  @Watch("hoist")
  @Watch("placement")
  @Watch("skidding")
  async handleOptionsChange() {
    if (this.popup) {
      await this.popup.reposition();
    }
  }

  @Watch("disabled")
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }

  @Method()
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return new Promise<void>((resolve) => {
      this.el.addEventListener("cAfterShow", () => resolve(), { once: true });
    });
  }

  @Method()
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return new Promise<void>((resolve) => {
      this.el.addEventListener("cAfterHide", () => resolve(), { once: true });
    });
  }

  render() {
    return (
      <Host>
        <c-popup
          part="base"
          exportparts="popup:base__popup,arrow:base__arrow"
          class={{ tooltip: true, "tooltip--open": this.open }}
          placement={this.placement}
          distance={this.distance}
          skidding={this.skidding}
          strategy={this.hoist ? "fixed" : "absolute"}
          text-direction={document.dir === "rtl" ? "rtl" : "ltr"}
          flip
          shift
          arrow
          hover-bridge
          ref={(el: HTMLCPopupElement) =>
            (this.popup = el as HTMLCPopupElement)
          }
        >
          <slot slot="anchor" aria-describedby="tooltip"></slot>

          <div
            part="body"
            id="tooltip"
            class="tooltip__body"
            role="tooltip"
            aria-live={this.open ? "polite" : "off"}
            ref={(el) => (this.body = el as HTMLElement)}
          >
            <slot name="content">{this.content}</slot>
          </div>
        </c-popup>
      </Host>
    );
  }
}
