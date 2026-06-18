// app.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CButton } from '@componentry-ui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CButton, CommonModule],
  templateUrl: './app.html',
})
export class App {
  // ── State ──────────────────────────────────────────────────────────────
  eventLog = '—';
  clickLog = '—';
  clickCount = 0;
  liked = false;
  isLoading = false;
  isDone = false;
  danger = false;

  @ViewChild('focusTarget') focusTargetRef!: ElementRef;

  // ── Handlers ───────────────────────────────────────────────────────────
  handleAsyncClick() {
    this.isLoading = true;
    this.isDone = false;
    setTimeout(() => {
      this.isLoading = false;
      this.isDone = true;
    }, 2000);
  }

  handleCoords(e: MouseEvent) {
    this.eventLog = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
  }

  handleGuardedLink(e: MouseEvent) {
    if (!window.confirm('Leave this page?')) e.preventDefault();
  }

  handleDelete() {
    if (window.confirm('Are you sure you want to delete this?')) alert('Deleted!');
  }

  handleFormSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.clickLog = 'Form submitted!';
  }

  setFocus()     { (this.focusTargetRef?.nativeElement as any)?.setFocus(); }
  removeFocus()  { (this.focusTargetRef?.nativeElement as any)?.removeFocus(); }
  triggerClick() { (this.focusTargetRef?.nativeElement as any)?.triggerClick(); }
}