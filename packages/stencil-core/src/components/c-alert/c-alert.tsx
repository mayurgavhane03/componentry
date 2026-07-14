import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';

let toastStack: HTMLDivElement;

function getToastStack() {
  if (!toastStack) {
    toastStack = Object.assign(document.createElement('div'), {
      className: 'c-toast-stack'
    });
  }
  return toastStack;
}

function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>(resolve => {
    const handler = () => {
      el.removeEventListener(eventName, handler);
      resolve();
    };
    el.addEventListener(eventName, handler);
  });
}

@Component({
  tag: 'c-alert',
  styleUrl: 'c-alert.css',
  shadow: true
})
export class CAlert {
  @Element() el!: HTMLElement;

  private base!: HTMLDivElement;
  private countdownElement!: HTMLDivElement;
  private autoHideTimeout!: number;
  private remainingTimeInterval!: number;
  private countdownAnimation?: Animation;

  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop({ reflect: true }) closable = false;
  @Prop({ reflect: true }) variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' = 'primary';
  @Prop() duration = Infinity;
  @Prop({ reflect: true }) countdown?: 'rtl' | 'ltr';

  @State() private remainingTime = this.duration;
  @State() private hasIcon = false;

  @Event({ eventName: 'cShow' }) cShow!: EventEmitter<void>;
  @Event({ eventName: 'cAfterShow' }) cAfterShow!: EventEmitter<void>;
  @Event({ eventName: 'cHide' }) cHide!: EventEmitter<void>;
  @Event({ eventName: 'cAfterHide' }) cAfterHide!: EventEmitter<void>;

componentDidLoad() {
  this.base.hidden = !this.open;
  this.updateHasIcon();

  if (this.open) {
    this.handleOpenChange();
  }
}

  private updateHasIcon() {
    this.hasIcon = !!this.el.querySelector('[slot="icon"]');
  }

  private restartAutoHide() {
    this.handleCountdownChange();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
      this.remainingTime = this.duration;
      this.remainingTimeInterval = window.setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
    }
  }

  private pauseAutoHide = () => {
    this.countdownAnimation?.pause();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
  };

  private resumeAutoHide = () => {
    if (this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.remainingTime);
      this.remainingTimeInterval = window.setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
      this.countdownAnimation?.play();
    }
  };

  private handleCountdownChange() {
    if (this.open && this.duration < Infinity && this.countdown) {
      this.countdownAnimation = this.countdownElement.animate([{ width: '100%' }, { width: '0' }], {
        duration: this.duration,
        easing: 'linear'
      });
    }
  }

  private handleCloseClick = () => {
    this.hide();
  };

  @Watch('open')
  async handleOpenChange() {
    if (this.open) {
      this.cShow.emit();

      if (this.duration < Infinity) {
        this.restartAutoHide();
      }

      this.base.getAnimations().forEach(a => a.cancel());
      this.base.hidden = false;
      await this.base.animate(
        [
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1 }
        ],
        { duration: 250, easing: 'ease' }
      ).finished;

      this.cAfterShow.emit();
    } else {
      const activeEl = this.el.shadowRoot?.activeElement as HTMLElement;
      activeEl?.blur();
      this.cHide.emit();

      clearTimeout(this.autoHideTimeout);
      clearInterval(this.remainingTimeInterval);

      this.base.getAnimations().forEach(a => a.cancel());
      await this.base.animate(
        [
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.8 }
        ],
        { duration: 250, easing: 'ease' }
      ).finished;
      this.base.hidden = true;

      this.cAfterHide.emit();
    }
  }

  @Watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  @Method()
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this.el, 'c-after-show');
  }

  @Method()
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this.el, 'c-after-hide');
  }

  @Method()
  async toast() {
    return new Promise<void>(resolve => {
      this.handleCountdownChange();
      const stack = getToastStack();
      if (stack.parentElement === null) {
        document.body.append(stack);
      }

      stack.appendChild(this.el);

      requestAnimationFrame(() => {
        this.el.clientWidth;
        this.show();
      });

      this.el.addEventListener(
        'c-after-hide',
        () => {
          stack.removeChild(this.el);
          resolve();

          if (stack.querySelector('c-alert') === null) {
            stack.remove();
          }
        },
        { once: true }
      );
    });
  }

  render() {
    return (
      <div
        part="base"
        class={{
          alert: true,
          'alert--open': this.open,
          'alert--closable': this.closable,
          'alert--has-countdown': !!this.countdown,
          'alert--has-icon': this.hasIcon,
          'alert--primary': this.variant === 'primary',
          'alert--success': this.variant === 'success',
          'alert--neutral': this.variant === 'neutral',
          'alert--warning': this.variant === 'warning',
          'alert--danger': this.variant === 'danger'
        }}
        role="alert"
        aria-hidden={this.open ? 'false' : 'true'}
        onMouseEnter={this.pauseAutoHide}
        onMouseLeave={this.resumeAutoHide}
        ref={el => (this.base = el as HTMLDivElement)}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon" onSlotchange={() => this.updateHasIcon()}></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        {this.closable ? (
          <button part="close-button" class="alert__close-button" aria-label="Close" onClick={this.handleCloseClick}>
            <svg part="close-button__base" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        ) : null}

        <div role="timer" class="alert__timer">
          {this.remainingTime}
        </div>

        {this.countdown ? (
          <div
            class={{
              alert__countdown: true,
              'alert__countdown--ltr': this.countdown === 'ltr'
            }}
          >
            <div class="alert__countdown-elapsed" ref={el => (this.countdownElement = el as HTMLDivElement)}></div>
          </div>
        ) : null}
      </div>
    );
  }
}