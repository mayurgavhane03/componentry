import {
  arrow as arrowMiddleware,
  autoUpdate,
  computePosition,
  flip,
  offset,
  platform,
  shift,
  size,
} from "@floating-ui/dom";
import {
  Component,
  Element as StencilElement,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";
import { offsetParent } from "composed-offset-position";
export interface VirtualElement {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
}

function isVirtualElement(e: unknown): e is VirtualElement {
  return (
    e !== null &&
    typeof e === "object" &&
    "getBoundingClientRect" in e &&
    ("contextElement" in e
      ? (e as VirtualElement).contextElement instanceof Element
      : true)
  );
}

@Component({
  tag: "c-popup",
  styleUrl: "c-popup.css",
  shadow: true,
})
export class CPopup {
  private anchorEl!: Element | VirtualElement | null;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private popupEl!: HTMLElement;
  private arrowEl!: HTMLElement;
  private anchorSlot!: HTMLSlotElement;

  @StencilElement() el!: HTMLElement;

  @Prop() anchor!: Element | string | VirtualElement;

  @Prop({ mutable: true, reflect: true }) active = false;

  @Prop({ reflect: true }) placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end" = "top";

  @Prop({ reflect: true }) strategy: "absolute" | "fixed" = "absolute";

  @Prop() distance = 0;

  @Prop() skidding = 0;

  @Prop() arrow = false;

  @Prop() arrowPlacement: "start" | "end" | "center" | "anchor" = "anchor";

  @Prop() arrowPadding = 10;

  @Prop() flip = false;

  @Prop() flipFallbackPlacements = "";

  @Prop() flipFallbackStrategy: "best-fit" | "initial" = "best-fit";

  @Prop() flipBoundary!: Element | Element[];

  @Prop() flipPadding = 0;

  @Prop() shift = false;

  @Prop() shiftBoundary!: Element | Element[];

  @Prop() shiftPadding = 0;

  @Prop() autoSize!: "horizontal" | "vertical" | "both";

  @Prop() sync!: "width" | "height" | "both";

  @Prop() autoSizeBoundary!: Element | Element[];

  @Prop() autoSizePadding = 0;

  @Prop() hoverBridge = false;

  @Prop() textDirection: "ltr" | "rtl" = "ltr";

  @State() hasArrow = false;

  @Event({ bubbles: true, composed: true, cancelable: false })
  cReposition!: EventEmitter<void>;

  connectedCallback() {
    this.handleAnchorChange = this.handleAnchorChange.bind(this);
  }

  componentDidLoad() {
    this.handleAnchorChange();
  }

  disconnectedCallback() {
    this.stop();
  }

  @Watch("active")
  handleActiveChange() {
    if (this.active) {
      this.start();
    } else {
      this.stop();
    }
  }

  @Watch("anchor")
  handleAnchorPropChange() {
    this.handleAnchorChange();
  }

  @Watch("placement")
  @Watch("distance")
  @Watch("skidding")
  @Watch("strategy")
  @Watch("flip")
  @Watch("shift")
  @Watch("autoSize")
  @Watch("sync")
  handleOptionChange() {
    if (this.active) {
      this.reposition();
    }
  }
@Method()
async getPopupElement() {
  return this.popupEl;
}
  private async handleAnchorChange() {
    await this.stop();

    if (this.anchor && typeof this.anchor === "string") {
      const root = this.el.getRootNode() as Document | ShadowRoot;
      this.anchorEl = root.getElementById(this.anchor);
    } else if (
      this.anchor instanceof Element ||
      isVirtualElement(this.anchor)
    ) {
      this.anchorEl = this.anchor;
    } else if (this.anchorSlot) {
      this.anchorEl = this.anchorSlot.assignedElements({
        flatten: true,
      })[0] as HTMLElement;
    }

    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({
        flatten: true,
      })[0] as HTMLElement;
    }

    if (this.anchorEl && this.active) {
      this.start();
    }
  }

  private start() {
    if (!this.anchorEl || !this.active) {
      return;
    }

    this.cleanup = autoUpdate(this.anchorEl, this.popupEl, () => {
      this.reposition();
    });
  }

  private async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = undefined;
        this.el.removeAttribute("data-current-placement");
        this.el.style.removeProperty("--auto-size-available-width");
        this.el.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }

  @Method()
  async reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }

    const middleware = [
      offset({ mainAxis: this.distance, crossAxis: this.skidding }),
    ];

    if (this.sync) {
      middleware.push(
        size({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popupEl.style.width = syncWidth
              ? `${rects.reference.width}px`
              : "";
            this.popupEl.style.height = syncHeight
              ? `${rects.reference.height}px`
              : "";
          },
        }),
      );
    } else {
      this.popupEl.style.width = "";
      this.popupEl.style.height = "";
    }

    if (this.flip) {
      middleware.push(
        flip({
          boundary: this.flipBoundary,
          // @ts-expect-error
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy:
            this.flipFallbackStrategy === "best-fit"
              ? "bestFit"
              : "initialPlacement",
          padding: this.flipPadding,
        }),
      );
    }

    if (this.shift) {
      middleware.push(
        shift({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding,
        }),
      );
    }

    if (this.autoSize) {
      middleware.push(
        size({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.el.style.setProperty(
                "--auto-size-available-height",
                `${availableHeight}px`,
              );
            } else {
              this.el.style.removeProperty("--auto-size-available-height");
            }

            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.el.style.setProperty(
                "--auto-size-available-width",
                `${availableWidth}px`,
              );
            } else {
              this.el.style.removeProperty("--auto-size-available-width");
            }
          },
        }),
      );
    } else {
      this.el.style.removeProperty("--auto-size-available-width");
      this.el.style.removeProperty("--auto-size-available-height");
    }

    if (this.arrow) {
      middleware.push(
        arrowMiddleware({
          element: this.arrowEl,
          padding: this.arrowPadding,
        }),
      );
    }

    const getOffsetParent =
      this.strategy === "absolute"
        ? (element: Element) => platform.getOffsetParent(element, offsetParent)
        : platform.getOffsetParent;

    computePosition(this.anchorEl, this.popupEl, {
      placement: this.placement,
      middleware,
      strategy: this.strategy,
      platform: {
        ...platform,
        getOffsetParent,
      },
    }).then(({ x, y, middlewareData, placement }) => {
      const isRtl = this.textDirection === "rtl";
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]]!;

      this.el.setAttribute("data-current-placement", placement);

      Object.assign(this.popupEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (this.arrow) {
        const arrowX = middlewareData.arrow!.x;
        const arrowY = middlewareData.arrow!.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";

        if (this.arrowPlacement === "start") {
          const value =
            typeof arrowX === "number"
              ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
              : "";
          top =
            typeof arrowY === "number"
              ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
              : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value =
            typeof arrowX === "number"
              ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
              : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom =
            typeof arrowY === "number"
              ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))`
              : "";
        } else if (this.arrowPlacement === "center") {
          left =
            typeof arrowX === "number"
              ? `calc(50% - var(--arrow-size-diagonal))`
              : "";
          top =
            typeof arrowY === "number"
              ? `calc(50% - var(--arrow-size-diagonal))`
              : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }

        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)",
        });
      }
    });

    requestAnimationFrame(() => this.updateHoverBridge());

    this.cReposition.emit();
  }

  private updateHoverBridge = () => {
    if (this.hoverBridge && this.anchorEl instanceof Element) {
      const anchorRect = this.anchorEl.getBoundingClientRect();
      const popupRect = this.popupEl.getBoundingClientRect();
      const isVertical =
        this.placement.includes("top") || this.placement.includes("bottom");
      let topLeftX = 0;
      let topLeftY = 0;
      let topRightX = 0;
      let topRightY = 0;
      let bottomLeftX = 0;
      let bottomLeftY = 0;
      let bottomRightX = 0;
      let bottomRightY = 0;

      if (isVertical) {
        if (anchorRect.top < popupRect.top) {
          topLeftX = anchorRect.left;
          topLeftY = anchorRect.bottom;
          topRightX = anchorRect.right;
          topRightY = anchorRect.bottom;

          bottomLeftX = popupRect.left;
          bottomLeftY = popupRect.top;
          bottomRightX = popupRect.right;
          bottomRightY = popupRect.top;
        } else {
          topLeftX = popupRect.left;
          topLeftY = popupRect.bottom;
          topRightX = popupRect.right;
          topRightY = popupRect.bottom;

          bottomLeftX = anchorRect.left;
          bottomLeftY = anchorRect.top;
          bottomRightX = anchorRect.right;
          bottomRightY = anchorRect.top;
        }
      } else {
        if (anchorRect.left < popupRect.left) {
          topLeftX = anchorRect.right;
          topLeftY = anchorRect.top;
          topRightX = popupRect.left;
          topRightY = popupRect.top;

          bottomLeftX = anchorRect.right;
          bottomLeftY = anchorRect.bottom;
          bottomRightX = popupRect.left;
          bottomRightY = popupRect.bottom;
        } else {
          topLeftX = popupRect.right;
          topLeftY = popupRect.top;
          topRightX = anchorRect.left;
          topRightY = anchorRect.top;

          bottomLeftX = popupRect.right;
          bottomLeftY = popupRect.bottom;
          bottomRightX = anchorRect.left;
          bottomRightY = anchorRect.bottom;
        }
      }

      this.el.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
      this.el.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
      this.el.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
      this.el.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
      this.el.style.setProperty(
        "--hover-bridge-bottom-left-x",
        `${bottomLeftX}px`,
      );
      this.el.style.setProperty(
        "--hover-bridge-bottom-left-y",
        `${bottomLeftY}px`,
      );
      this.el.style.setProperty(
        "--hover-bridge-bottom-right-x",
        `${bottomRightX}px`,
      );
      this.el.style.setProperty(
        "--hover-bridge-bottom-right-y",
        `${bottomRightY}px`,
      );
    }
  };

  render() {
    return (
      <Host>
        <slot
          name="anchor"
          ref={(el) => (this.anchorSlot = el as HTMLSlotElement)}
          onSlotchange={this.handleAnchorChange}
        ></slot>

        <span
          part="hover-bridge"
          class={{
            "popup-hover-bridge": true,
            "popup-hover-bridge--visible": this.hoverBridge && this.active,
          }}
        ></span>

        <div
          part="popup"
          class={{
            popup: true,
            "popup--active": this.active,
            "popup--fixed": this.strategy === "fixed",
            "popup--has-arrow": this.arrow,
          }}
          ref={(el) => (this.popupEl = el as HTMLElement)}
        >
          <slot></slot>
          {this.arrow ? (
            <div
              part="arrow"
              class="popup__arrow"
              role="presentation"
              ref={(el) => (this.arrowEl = el as HTMLElement)}
            ></div>
          ) : (
            ""
          )}
        </div>
      </Host>
    );
  }
}
