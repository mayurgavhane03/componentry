<script setup lang="ts">
import { ref } from 'vue'
import { CButton } from '@componentry/vue'

const focusTargetRef = ref<HTMLElement | null>(null)
const eventLog = ref('—')
const clickLog = ref('—')
</script>

<template>
  <main style="padding: 2rem; font-family: sans-serif;">
    <h1>Componentry — Vue: All CButton Usages</h1>

    <!-- ── 1. VARIANTS ──────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">1. Variants</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton variant="default">Default</CButton>
        <CButton variant="primary">Primary</CButton>
        <CButton variant="success">Success</CButton>
        <CButton variant="neutral">Neutral</CButton>
        <CButton variant="warning">Warning</CButton>
        <CButton variant="danger">Danger</CButton>
        <CButton variant="text">Text</CButton>
      </div>
    </section>

    <!-- ── 2. SIZES ─────────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">2. Sizes</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton size="small">Small</CButton>
        <CButton size="medium">Medium</CButton>
        <CButton size="large">Large</CButton>
      </div>
    </section>

    <!-- ── 3. OUTLINED ──────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">3. Outlined</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton variant="default" :outline="true">Default</CButton>
        <CButton variant="primary" :outline="true">Primary</CButton>
        <CButton variant="success" :outline="true">Success</CButton>
        <CButton variant="neutral" :outline="true">Neutral</CButton>
        <CButton variant="warning" :outline="true">Warning</CButton>
        <CButton variant="danger" :outline="true">Danger</CButton>
      </div>
    </section>

    <!-- ── 4. PILL ──────────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">4. Pill</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton variant="primary" :pill="true">Primary Pill</CButton>
        <CButton variant="success" :pill="true" :outline="true">Outline Pill</CButton>
        <CButton variant="danger" :pill="true" size="small">Small Pill</CButton>
        <CButton variant="neutral" :pill="true" size="large">Large Pill</CButton>
      </div>
    </section>

    <!-- ── 5. CIRCLE ────────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">5. Circle (icon buttons)</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton :circle="true" variant="default">✕</CButton>
        <CButton :circle="true" variant="primary">★</CButton>
        <CButton :circle="true" variant="danger" size="small">🗑</CButton>
        <CButton :circle="true" variant="success" size="large">✓</CButton>
        <CButton :circle="true" variant="neutral" :outline="true">⚙</CButton>
      </div>
    </section>

    <!-- ── 6. CARET ─────────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">6. Caret</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton :caret="true">Default + Caret</CButton>
        <CButton variant="primary" :caret="true">Primary + Caret</CButton>
        <CButton variant="neutral" :caret="true" :outline="true">Outline + Caret</CButton>
        <CButton variant="warning" :caret="true" :pill="true">Pill + Caret</CButton>
      </div>
    </section>

    <!-- ── 7. LOADING ───────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">7. Loading</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton :loading="true">Default</CButton>
        <CButton :loading="true" variant="primary">Primary</CButton>
        <CButton :loading="true" variant="danger" :outline="true">Outline</CButton>
        <CButton :loading="true" variant="success" :pill="true">Pill</CButton>
        <CButton :loading="true" :circle="true" variant="neutral">★</CButton>
      </div>
    </section>

    <!-- ── 8. DISABLED ──────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">8. Disabled</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton :disabled="true">Default</CButton>
        <CButton :disabled="true" variant="primary">Primary</CButton>
        <CButton :disabled="true" variant="success" :outline="true">Outline</CButton>
        <CButton :disabled="true" variant="danger" :pill="true">Pill</CButton>
        <CButton :disabled="true" :circle="true">✕</CButton>
      </div>
    </section>

    <!-- ── 9. PREFIX SLOT ───────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">9. Prefix slot</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton variant="primary">
          <span slot="prefix">⬇</span>
          Download
        </CButton>
        <CButton variant="success">
          <span slot="prefix">✓</span>
          Confirm
        </CButton>
        <CButton variant="danger" :outline="true">
          <span slot="prefix">🗑</span>
          Delete
        </CButton>
      </div>
    </section>

    <!-- ── 10. SUFFIX SLOT ──────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">10. Suffix slot</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton variant="primary">
          Next
          <span slot="suffix">→</span>
        </CButton>
        <CButton variant="neutral" :outline="true">
          Share
          <span slot="suffix">↗</span>
        </CButton>
      </div>
    </section>

    <!-- ── 11. PREFIX + SUFFIX ──────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">11. Prefix + Suffix</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton variant="primary">
          <span slot="prefix">📁</span>
          Open File
          <span slot="suffix">↗</span>
        </CButton>
        <CButton variant="warning" :outline="true">
          <span slot="prefix">⚠</span>
          Review
          <span slot="suffix">→</span>
        </CButton>
      </div>
    </section>

    <!-- ── 12. LINK BUTTON ──────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">12. Link button (href)</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton href="https://example.com" target="_blank">Open Link</CButton>
        <CButton href="https://example.com" target="_blank" variant="primary">
          <span slot="prefix">↗</span>
          External Link
        </CButton>
        <CButton href="/file.pdf" download="report.pdf" variant="success">Download PDF</CButton>
        <CButton href="https://example.com" :disabled="true" variant="neutral">Disabled Link</CButton>
      </div>
    </section>

    <!-- ── 13. FORM TYPES ───────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">13. Form types</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <form @submit.prevent="clickLog = 'Form submitted!'">
          <CButton type="submit" variant="primary" name="action" value="save">
            Submit Form
          </CButton>
        </form>
        <form style="display: flex; gap: 0.5rem; align-items: center;">
          <input type="text" value="clear me" style="padding: 0.25rem 0.5rem;" />
          <CButton type="reset" variant="neutral">Reset Form</CButton>
        </form>
        <CButton type="button">Plain Button</CButton>
      </div>
    </section>

    <!-- ── 14. TOOLTIP ──────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">14. Tooltip</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <CButton tooltip="This saves your progress" variant="primary">Save</CButton>
        <CButton tooltip="Permanently deletes the record" variant="danger" :circle="true">🗑</CButton>
      </div>
    </section>

    <!-- ── 15. ONCLICK ──────────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">15. onClick / click handler</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <!-- inline handler -->
        <CButton variant="primary" @click="clickLog = 'Primary clicked!'">
          Click me
        </CButton>

        <!-- method reference -->
        <CButton variant="success" @click="() => clickLog = 'Success clicked!'">
          Method ref
        </CButton>

        <!-- disabled — click should NOT fire -->
        <CButton variant="danger" :disabled="true" @click="clickLog = 'Should not fire'">
          Disabled click
        </CButton>

        <!-- loading — click should NOT fire -->
        <CButton variant="warning" :loading="true" @click="clickLog = 'Should not fire'">
          Loading click
        </CButton>

        <span style="color: #555; font-size: 0.9rem;">{{ clickLog }}</span>
      </div>
    </section>

    <!-- ── 16. EVENTS — cFocus / cBlur ─────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">16. cFocus / cBlur events</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton
          variant="primary"
          @c-focus="eventLog = 'cFocus fired'"
          @c-blur="eventLog = 'cBlur fired'"
        >
          Focus / Blur me
        </CButton>
        <span style="color: #555; font-size: 0.9rem;">{{ eventLog }}</span>
      </div>
    </section>

    <!-- ── 17. JS METHODS ───────────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">17. Imperative methods</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton ref="focusTargetRef" variant="primary">Focus target</CButton>
        <CButton variant="neutral" @click="(focusTargetRef as any)?.setFocus()">
          setFocus()
        </CButton>
        <CButton variant="neutral" @click="(focusTargetRef as any)?.removeFocus()">
          removeFocus()
        </CButton>
        <CButton variant="neutral" @click="(focusTargetRef as any)?.triggerClick()">
          triggerClick()
        </CButton>
      </div>
    </section>

    <!-- ── 18. COMBINED COMBOS ──────────────────────────────────── -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">18. Combined combos</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <CButton
          variant="primary"
          :pill="true"
          size="large"
          :caret="true"
          @click="clickLog = 'Deploy clicked!'"
        >
          <span slot="prefix">🚀</span>
          Deploy
        </CButton>

        <CButton variant="danger" :outline="true" :pill="true" size="small" :loading="true">
          Deleting…
        </CButton>

        <CButton
          variant="success"
          :circle="true"
          size="large"
          tooltip="Approve"
          @click="clickLog = 'Approved!'"
        >
          ✓
        </CButton>

        <CButton variant="neutral" :outline="true" :caret="true" size="small" :disabled="true">
          Options
        </CButton>

        <CButton
          href="https://example.com"
          target="_blank"
          variant="primary"
          :pill="true"
          @click="clickLog = 'Link clicked!'"
        >
          <span slot="prefix">↗</span>
          External
          <span slot="suffix">★</span>
        </CButton>

        <span style="color: #555; font-size: 0.9rem;">{{ clickLog }}</span>
      </div>
    </section>
  </main>
</template>