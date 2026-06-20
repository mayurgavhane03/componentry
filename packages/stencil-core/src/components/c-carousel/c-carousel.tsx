import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Method,
  Event,
  EventEmitter,
  Watch,
  Listen,
} from "@stencil/core";

@Component({
  tag: "c-carousel",
  styleUrl: "c-carousel.css",
  shadow: true,
})
export class CCarousel {
  @Element() el!: HTMLElement;

  @Prop({ reflect: true }) loop = false;
  @Prop({ reflect: true }) navigation = false;
  @Prop({ reflect: true }) pagination = false;
  @Prop({ reflect: true }) autoplay = false;
  @Prop() autoplayInterval = 3000;
  @Prop() slidesPerPage = 1;
  @Prop() slidesPerMove = 1;
  @Prop({ reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";
  @Prop({ reflect: true, attribute: "mouse-dragging" }) mouseDragging = false;

  @State() activeSlide = 0;
  @State() scrolling = false;
  @State() dragging = false;

  @Event({ eventName: "cSlideChange" }) slideChange!: EventEmitter<{
    index: number;
    slide: HTMLElement;
  }>;

  private scrollContainer!: HTMLElement;
  private autoplayTimer = 0;
  private autoplayPaused = false;
  private activeInteractions = 0;
  private dragStartPosition: [number, number] = [-1, -1];
  private pendingSlideChange = false;
  private mutationObserver?: MutationObserver;


  componentDidLoad() {
    this.initializeSlides();
    this.scrollContainer.addEventListener("scrollend", () =>
      this.handleScrollEnd(),
    );
    this.mutationObserver = new MutationObserver(this.handleSlotChange);
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });

    if (this.autoplay) this.startAutoplay();

    this.el.addEventListener("mouseenter", this.pauseAutoplay);
    this.el.addEventListener("mouseleave", this.resumeAutoplay);
    this.el.addEventListener("focusin", this.pauseAutoplay);
    this.el.addEventListener("focusout", this.resumeAutoplay);
    this.el.addEventListener("touchstart", this.pauseAutoplay, {
      passive: true,
    });
    this.el.addEventListener("touchend", this.resumeAutoplay);
  }

  disconnectedCallback() {
    this.stopAutoplay();
    this.mutationObserver?.disconnect();
    document.removeEventListener("pointermove", this.handleMouseDrag, {
      capture: true,
    });
    this.el.removeEventListener("mouseenter", this.pauseAutoplay);
    this.el.removeEventListener("mouseleave", this.resumeAutoplay);
    this.el.removeEventListener("focusin", this.pauseAutoplay);
    this.el.removeEventListener("focusout", this.resumeAutoplay);
    this.el.removeEventListener("touchstart", this.pauseAutoplay);
    this.el.removeEventListener("touchend", this.resumeAutoplay);
  }


  @Watch("loop")
  @Watch("slidesPerPage")
  onLoopOrPageChange() {
    this.initializeSlides();
  }

  @Watch("slidesPerMove")
  onSlidesPerMoveChange() {
    this.slidesPerMove = Math.min(this.slidesPerMove, this.slidesPerPage);
    this.updateSlidesSnap();
  }

  @Watch("autoplay")
  onAutoplayChange() {
    this.stopAutoplay();
    if (this.autoplay) this.startAutoplay();
  }

  @Watch("activeSlide")
  onActiveSlideChange() {
    const slides = this.getSlides();
    slides.forEach((slide, i) =>
      slide.classList.toggle("--is-active", i === this.activeSlide),
    );
    this.slideChange.emit({
      index: this.activeSlide,
      slide: slides[this.activeSlide],
    });
  }


  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      if (!this.autoplayPaused) this.next();
    }, this.autoplayInterval);
  }

  private stopAutoplay() {
    clearInterval(this.autoplayTimer);
  }

  private pauseAutoplay = () => {
    if (!this.activeInteractions++) this.autoplayPaused = true;
  };

  private resumeAutoplay = () => {
    if (!--this.activeInteractions) this.autoplayPaused = false;
  };


  private getSlides({ excludeClones = true } = {}): HTMLElement[] {
    return [...this.el.children].filter(
      (el: Element) =>
        el.tagName.toLowerCase() === "c-carousel-item" &&
        (!excludeClones || !el.hasAttribute("data-clone")),
    ) as HTMLElement[];
  }

  private getPageCount() {
    const count = this.getSlides().length;
    const { slidesPerPage, slidesPerMove, loop } = this;
    const pages = loop
      ? count / slidesPerMove
      : (count - slidesPerPage) / slidesPerMove + 1;
    return Math.ceil(pages);
  }

  private getCurrentPage() {
    return Math.ceil(this.activeSlide / this.slidesPerMove);
  }

  private canScrollNext() {
    return this.loop || this.getCurrentPage() < this.getPageCount() - 1;
  }
  private canScrollPrev() {
    return this.loop || this.getCurrentPage() > 0;
  }

  private clamp(v: number, min: number, max: number) {
    return Math.min(Math.max(v, min), max);
  }


  private initializeSlides() {
    this.getSlides({ excludeClones: false }).forEach((slide, index) => {
      slide.classList.remove("--in-view", "--is-active");
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-label", `Slide ${index + 1}`);

      if (this.pagination) {
        slide.setAttribute("id", `slide-${index + 1}`);
        slide.setAttribute("role", "tabpanel");
        slide.removeAttribute("aria-label");
        slide.setAttribute("aria-labelledby", `tab-${index + 1}`);
      }

      if (slide.hasAttribute("data-clone")) slide.remove();
    });

    this.updateSlidesSnap();
    if (this.loop) this.createClones();
    this.goToSlide(this.activeSlide, "auto");
    this.synchronizeSlides();
  }

  private createClones() {
    const slides = this.getSlides();
    const { slidesPerPage } = this;

    slides
      .slice(-slidesPerPage)
      .reverse()
      .forEach((slide, i) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-clone", String(slides.length - i - 1));
        this.el.prepend(clone);
      });

    slides.slice(0, slidesPerPage).forEach((slide, i) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-clone", String(i));
      this.el.append(clone);
    });
  }

  private updateSlidesSnap() {
    const { slidesPerMove } = this;
    this.getSlides().forEach((slide, i) => {
      const shouldSnap = (i + slidesPerMove) % slidesPerMove === 0;
      if (shouldSnap) slide.style.removeProperty("scroll-snap-align");
      else slide.style.setProperty("scroll-snap-align", "none");
    });
  }


  private synchronizeSlides() {
    const io = new IntersectionObserver(
      (entries) => {
        io.disconnect();

        for (const entry of entries) {
          const slide = entry.target as HTMLElement;
          slide.toggleAttribute("inert", !entry.isIntersecting);
          slide.classList.toggle("--in-view", entry.isIntersecting);
          slide.setAttribute(
            "aria-hidden",
            entry.isIntersecting ? "false" : "true",
          );
        }

        const first = entries.find((e) => e.isIntersecting);
        if (!first) return;

        const slidesWithClones = this.getSlides({ excludeClones: false });
        const slidesCount = this.getSlides().length;
        const idx = slidesWithClones.indexOf(first.target as HTMLElement);
        const normalized = this.loop ? idx - this.slidesPerPage : idx;
        this.activeSlide =
          (Math.ceil(normalized / this.slidesPerMove) * this.slidesPerMove +
            slidesCount) %
          slidesCount;

        if (
          !this.scrolling &&
          this.loop &&
          (first.target as HTMLElement).hasAttribute("data-clone")
        ) {
          const pos = Number(
            (first.target as HTMLElement).getAttribute("data-clone"),
          );
          this.goToSlide(pos, "instant");
        }
      },
      { root: this.scrollContainer, threshold: 0.6 },
    );

    this.getSlides({ excludeClones: false }).forEach((s) => io.observe(s));
  }

  private handleScrollEnd() {
    if (!this.scrolling || this.dragging) return;
    this.scrolling = false;
    this.pendingSlideChange = false;
    this.synchronizeSlides();
  }

  private handleSlotChange = (mutations: MutationRecord[]) => {
    const needsInit = mutations.some((m) =>
      [...m.addedNodes, ...m.removedNodes].some(
        (node: Node) =>
          (node as Element).tagName?.toLowerCase() === "c-carousel-item" &&
          !(node as Element).hasAttribute("data-clone"),
      ),
    );
    if (needsInit) this.initializeSlides();
  };


  private handleMouseDragStart = (e: MouseEvent) => {
    if (!this.mouseDragging || e.button !== 0) return;
    e.preventDefault();
    document.addEventListener("pointermove", this.handleMouseDrag, {
      capture: true,
      passive: true,
    });
    document.addEventListener("pointerup", this.handleMouseDragEnd, {
      capture: true,
      once: true,
    });
  };

  private handleMouseDrag = (e: PointerEvent) => {
    if (!this.dragging) {
      this.scrollContainer.style.setProperty("scroll-snap-type", "none");
      this.dragging = true;
      this.dragStartPosition = [e.clientX, e.clientY];
    }
    this.scrollContainer.scrollBy({
      left: -e.movementX,
      top: -e.movementY,
      behavior: "instant",
    });
  };

  private handleMouseDragEnd = () => {
    document.removeEventListener("pointermove", this.handleMouseDrag, {
      capture: true,
    });

    const sc = this.scrollContainer;
    const startLeft = sc.scrollLeft;
    const startTop = sc.scrollTop;

    sc.style.removeProperty("scroll-snap-type");
    sc.style.setProperty("overflow", "hidden");
    const finalLeft = sc.scrollLeft;
    const finalTop = sc.scrollTop;
    sc.style.removeProperty("overflow");
    sc.style.setProperty("scroll-snap-type", "none");
    sc.scrollTo({ left: startLeft, top: startTop, behavior: "instant" });

    requestAnimationFrame(async () => {
      if (startLeft !== finalLeft || startTop !== finalTop) {
        sc.scrollTo({ left: finalLeft, top: finalTop, behavior: "smooth" });
        await new Promise<void>((res) =>
          sc.addEventListener("scrollend", () => res(), { once: true }),
        );
      }
      sc.style.removeProperty("scroll-snap-type");
      this.dragging = false;
      this.dragStartPosition = [-1, -1];
      this.handleScrollEnd();
    });
  };

  private handleClick = (e: MouseEvent) => {
    if (this.dragging && this.dragStartPosition[0] > 0) {
      const dx = Math.abs(this.dragStartPosition[0] - e.clientX);
      const dy = Math.abs(this.dragStartPosition[1] - e.clientY);
      if (Math.sqrt(dx * dx + dy * dy) >= 10) e.preventDefault();
    }
  };


  @Listen("keydown")
  handleKeyDown(e: KeyboardEvent) {
    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];
    if (!keys.includes(e.key)) return;

    e.preventDefault();
    const isNext = e.key === "ArrowDown" || e.key === "ArrowRight";
    const isPrev = e.key === "ArrowUp" || e.key === "ArrowLeft";

    if (isPrev) this.previous();
    if (isNext) this.next();
    if (e.key === "Home") this.goToSlide(0);
    if (e.key === "End") this.goToSlide(this.getSlides().length - 1);
  }


  @Method()
  async previous(behavior: ScrollBehavior = "smooth") {
    this.goToSlide(this.activeSlide - this.slidesPerMove, behavior);
  }

  @Method()
  async next(behavior: ScrollBehavior = "smooth") {
    this.goToSlide(this.activeSlide + this.slidesPerMove, behavior);
  }

  @Method()
  async goToSlide(index: number, behavior: ScrollBehavior = "smooth") {
    const slides = this.getSlides();
    const slidesWithClones = this.getSlides({ excludeClones: false });
    if (!slides.length) return;

    const { slidesPerPage, loop } = this;

    this.activeSlide = loop
      ? (index + slides.length) % slides.length
      : this.clamp(index, 0, slides.length - slidesPerPage);

    const nextSlideIndex = this.clamp(
      index + (loop ? slidesPerPage : 0),
      0,
      slidesWithClones.length - 1,
    );
    this.scrollToSlide(slidesWithClones[nextSlideIndex], behavior);
  }

  private scrollToSlide(
    slide: HTMLElement,
    behavior: ScrollBehavior = "smooth",
  ) {
    this.pendingSlideChange = true;
    window.requestAnimationFrame(() => {
      if (!this.scrollContainer) return;
      const sc = this.scrollContainer;
      const scRect = sc.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const left = slideRect.left - scRect.left;
      const top = slideRect.top - scRect.top;

      if (left || top) {
        this.pendingSlideChange = true;
        sc.scrollTo({
          left: left + sc.scrollLeft,
          top: top + sc.scrollTop,
          behavior,
        });
      } else {
        this.pendingSlideChange = false;
      }
    });
  }


  render() {
    // const pagesCount = this.getPageCount();
    // const currentPage = this.getCurrentPage();
    const prevEnabled = this.canScrollPrev();
    const nextEnabled = this.canScrollNext();

    return (
      <Host>
        <div part="base" class="carousel">
          <div
            id="scroll-container"
            part="scroll-container"
            class={{
              carousel__slides: true,
              "carousel__slides--horizontal": this.orientation === "horizontal",
              "carousel__slides--vertical": this.orientation === "vertical",
              "carousel__slides--dragging": this.dragging,
            }}
            style={
              { "--slides-per-page": String(this.slidesPerPage) } as Record<
                string,
                string
              >
            }
            aria-busy={this.scrolling ? "true" : "false"}
            aria-atomic="true"
            tabIndex={0}
            ref={(el) => (this.scrollContainer = el as HTMLElement)}
            onScroll={() => {
              this.scrolling = true;
              if (!this.pendingSlideChange) this.synchronizeSlides();
            }}
            onMouseDown={this.handleMouseDragStart}
            onClick={this.handleClick}
          >
            <slot />
          </div>

          {this.navigation && (
            <div part="navigation" class="carousel__navigation">
              <button
                part={`navigation-button navigation-button--previous${!prevEnabled ? " navigation-button--disabled" : ""}`}
                class={{
                  "carousel__navigation-button": true,
                  "carousel__navigation-button--previous": true,
                  "carousel__navigation-button--disabled": !prevEnabled,
                }}
                aria-label="Previous slide"
                aria-controls="scroll-container"
                aria-disabled={prevEnabled ? "false" : "true"}
                onClick={prevEnabled ? () => this.previous() : undefined}
              >
                <slot name="previous-icon">&#8249;</slot>
              </button>
              <button
                part={`navigation-button navigation-button--next${!nextEnabled ? " navigation-button--disabled" : ""}`}
                class={{
                  "carousel__navigation-button": true,
                  "carousel__navigation-button--next": true,
                  "carousel__navigation-button--disabled": !nextEnabled,
                }}
                aria-label="Next slide"
                aria-controls="scroll-container"
                aria-disabled={nextEnabled ? "false" : "true"}
                onClick={nextEnabled ? () => this.next() : undefined}
              >
                <slot name="next-icon">&#8250;</slot>
              </button>
            </div>
          )}

          {/* {this.pagination && (
            <div
              part="pagination"
              role="tablist"
              class="carousel__pagination"
              ref={(el) => (this.paginationContainer = el as HTMLElement)}
            >
              {Array.from({ length: pagesCount }, (_, index) => {
                const isActive = index === currentPage;
                return (
                  <button
                    key={index}
                    part={`pagination-item${isActive ? " pagination-item--active" : ""}`}
                    class={{
                      "carousel__pagination-item": true,
                      "carousel__pagination-item--active": isActive,
                    }}
                    role="tab"
                    id={`tab-${index + 1}`}
                    aria-controls={`slide-${index + 1}`}
                    aria-selected={isActive ? "true" : "false"}
                    aria-label={
                      isActive
                        ? `Slide ${index + 1}`
                        : `Go to slide ${index + 1} of ${pagesCount}`
                    }
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => this.goToSlide(index * this.slidesPerMove)}
                  />
                );
              })}
            </div>
          )} */}
        </div>
      </Host>
    );
  }
}
