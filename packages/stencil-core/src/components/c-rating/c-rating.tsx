// c-rating.tsx
import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method,
  Watch,
  h,
  Host
} from '@stencil/core';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

@Component({
  tag: 'c-rating',
  styleUrl: 'c-rating.css',
  shadow: true
})
export class CRating {
  @Element() el!: HTMLElement;

  private ratingEl?: HTMLDivElement;

  @State() private hoverValue = 0;
  @State() private isHovering = false;
  @Prop() label = '';
  @Prop({ mutable: true, reflect: false }) value = 0;
  @Prop() max = 5;
  @Prop() precision = 1;
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() dir: 'ltr' | 'rtl' = 'ltr';

  @Prop() getSymbol: (value: number) => string = () =>
    '<svg viewBox="0 0 16 16" width="1em" height="1em"><path d="M8 .5l2.245 4.55 5.02.73-3.633 3.542.858 5.003L8 12.02l-4.49 2.305.858-5.003L.735 5.78l5.02-.73L8 .5z" fill="currentColor"/></svg>';

  @Event({ eventName: 'cRatingChange' }) cRatingChange!: EventEmitter<void>;
  @Event({ eventName: 'cRatingHover' }) cRatingHover!: EventEmitter<{
    phase: 'start' | 'move' | 'end';
    value: number;
  }>;

  private isRtl() {
    return this.dir === 'rtl';
  }

  private getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromXCoordinate(event.clientX);
  }

  private getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

private getValueFromXCoordinate(coordinate: number) {
  if (!this.ratingEl) {
    return this.value;
  }

  const isRtl = this.isRtl();
  const { left, right, width } = this.ratingEl.getBoundingClientRect();
  const value = isRtl
    ? this.roundToPrecision(((right - coordinate) / width) * this.max, this.precision)
    : this.roundToPrecision(((coordinate - left) / width) * this.max, this.precision);

  return clamp(value, 0, this.max);
}

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      return;
    }

    this.setValue(this.getValueFromMousePosition(event));
    this.cRatingChange.emit();
  };

  private setValue(newValue: number) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const isLtr = !this.isRtl();
    const isRtl = this.isRtl();
    const oldValue = this.value;

    if (this.disabled || this.readonly) {
      return;
    }

    if (
      event.key === 'ArrowDown' ||
      (isLtr && event.key === 'ArrowLeft') ||
      (isRtl && event.key === 'ArrowRight')
    ) {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }

    if (
      event.key === 'ArrowUp' ||
      (isLtr && event.key === 'ArrowRight') ||
      (isRtl && event.key === 'ArrowLeft')
    ) {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }

    if (event.key === 'Home') {
      this.value = 0;
      event.preventDefault();
    }

    if (event.key === 'End') {
      this.value = this.max;
      event.preventDefault();
    }

    if (this.value !== oldValue) {
      this.cRatingChange.emit();
    }
  };

  private handleMouseEnter = (event: MouseEvent) => {
    this.isHovering = true;
    this.hoverValue = this.getValueFromMousePosition(event);
  };

  private handleMouseMove = (event: MouseEvent) => {
    this.hoverValue = this.getValueFromMousePosition(event);
  };

  private handleMouseLeave = () => {
    this.isHovering = false;
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);

    // Prevent scrolling when touch is initiated
    event.preventDefault();
  };

  private handleTouchMove = (event: TouchEvent) => {
    this.hoverValue = this.getValueFromTouchPosition(event);
  };

  private handleTouchEnd = (event: TouchEvent) => {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    this.cRatingChange.emit();

    // Prevent click on mobile devices
    event.preventDefault();
  };

  private roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  @Watch('hoverValue')
  handleHoverValueChange() {
    this.cRatingHover.emit({
      phase: 'move',
      value: this.hoverValue
    });
  }

  @Watch('isHovering')
  handleIsHoveringChange() {
    this.cRatingHover.emit({
      phase: this.isHovering ? 'start' : 'end',
      value: this.hoverValue
    });
  }

@Method()
async setFocus(options?: FocusOptions) {
  this.ratingEl?.focus(options);
}

@Method()
async removeFocus() {
  this.ratingEl?.blur();
}

  render() {
    const isRtl = this.isRtl();
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;

    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }

    return (
      <Host>
        <div
          part="base"
          ref={el => (this.ratingEl = el as HTMLDivElement)}
          class={{
            rating: true,
            'rating--readonly': this.readonly,
            'rating--disabled': this.disabled,
            'rating--rtl': isRtl
          }}
          role="slider"
          aria-label={this.label}
          aria-disabled={this.disabled ? 'true' : 'false'}
          aria-readonly={this.readonly ? 'true' : 'false'}
          aria-valuenow={this.value}
          aria-valuemin={0}
          aria-valuemax={this.max}
          tabindex={this.disabled || this.readonly ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onMouseEnter={this.handleMouseEnter}
          onTouchStart={this.handleTouchStart}
          onMouseLeave={this.handleMouseLeave}
          onTouchEnd={this.handleTouchEnd}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleTouchMove}
        >
          <span class="rating__symbols">
            {counter.map(index => {
              if (displayValue > index && displayValue < index + 1) {
                const clipRight = `inset(0 ${(displayValue - index) * 100}% 0 0)`;
                const clipLeft = `inset(0 0 0 ${(displayValue - index) * 100}%)`;
                const filledClipLeft = `inset(0 0 0 ${100 - (displayValue - index) * 100}%)`;
                const filledClipRight = `inset(0 ${100 - (displayValue - index) * 100}% 0 0)`;

                return (
                  <span
                    class={{
                      rating__symbol: true,
                      'rating__partial-symbol-container': true,
                      'rating__symbol--hover':
                        this.isHovering && Math.ceil(displayValue) === index + 1
                    }}
                    role="presentation"
                  >
                    <div
                      style={{ clipPath: isRtl ? clipRight : clipLeft }}
                      innerHTML={this.getSymbol(index + 1)}
                    />
                    <div
                      class="rating__partial--filled"
                      style={{ clipPath: isRtl ? filledClipLeft : filledClipRight }}
                      innerHTML={this.getSymbol(index + 1)}
                    />
                  </span>
                );
              }

              return (
                <span
                  class={{
                    rating__symbol: true,
                    'rating__symbol--hover':
                      this.isHovering && Math.ceil(displayValue) === index + 1,
                    'rating__symbol--active': displayValue >= index + 1
                  }}
                  role="presentation"
                  innerHTML={this.getSymbol(index + 1)}
                />
              );
            })}
          </span>
        </div>
      </Host>
    );
  }
}