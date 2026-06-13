import { CInput } from '@componentry/react'
import React from 'react'

const Input = () => {
  return (
        <div style={{ fontFamily: "sans-serif", padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Types */}
      <section>
        <h2>Types</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput type="text"           label="Text"           placeholder="text" />
          <CInput type="email"          label="Email"          placeholder="email" />
          <CInput type="password"       label="Password"       placeholder="password" />
          <CInput type="number"         label="Number"         placeholder="number" />
          <CInput type="search"         label="Search"         placeholder="search" />
          <CInput type="tel"            label="Tel"            placeholder="tel" />
          <CInput type="url"            label="URL"            placeholder="url" />
          <CInput type="date"           label="Date" />
          <CInput type="datetime-local" label="Datetime Local" />
          <CInput type="time"           label="Time" />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2>Sizes</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput size="small"  label="Small"  placeholder="Small" />
          <CInput size="medium" label="Medium" placeholder="Medium" />
          <CInput size="large"  label="Large"  placeholder="Large" />
        </div>
      </section>

      {/* Filled */}
      <section>
        <h2>Filled</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput filled size="small"  label="Small"  placeholder="Small filled" />
          <CInput filled size="medium" label="Medium" placeholder="Medium filled" />
          <CInput filled size="large"  label="Large"  placeholder="Large filled" />
        </div>
      </section>

      {/* Pill */}
      <section>
        <h2>Pill</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput pill size="small"  label="Small"  placeholder="Small pill" />
          <CInput pill size="medium" label="Medium" placeholder="Medium pill" />
          <CInput pill size="large"  label="Large"  placeholder="Large pill" />
        </div>
      </section>

      {/* States */}
      <section>
        <h2>States</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput label="Default"  placeholder="Default" />
          <CInput label="Disabled" placeholder="Disabled" disabled />
          <CInput label="Readonly" value="Readonly value" readonly />
          <CInput label="Required" placeholder="Required" required />
        </div>
      </section>

      {/* Label + Help Text */}
      <section>
        <h2>Label & Help Text</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput label="Username" helpText="Enter your username."          placeholder="johndoe" />
          <CInput label="Email"    helpText="We'll never share your email." placeholder="you@example.com" type="email" />
        </div>
      </section>

      {/* Clearable */}
      <section>
        <h2>Clearable</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput clearable value="Clear me" size="small"  label="Small clearable" />
          <CInput clearable value="Clear me" size="medium" label="Medium clearable" />
          <CInput clearable value="Clear me" size="large"  label="Large clearable" />
        </div>
      </section>

      {/* Password Toggle */}
      <section>
        <h2>Password Toggle</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput type="password" passwordToggle value="secret123" size="small"  label="Small" />
          <CInput type="password" passwordToggle value="secret123" size="medium" label="Medium" />
          <CInput type="password" passwordToggle value="secret123" size="large"  label="Large" />
        </div>
      </section>

      {/* Prefix & Suffix Slots */}
      <section>
        <h2>Prefix & Suffix Slots</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>

          <CInput label="With prefix icon" placeholder="Search...">
            <svg {...{ slot: "prefix" } as any} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </CInput>

          <CInput label="With suffix icon" placeholder="Enter URL">
            <svg {...{ slot: "suffix" } as any}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </CInput>

          <CInput label="Prefix text" placeholder="0.00">
            <span slot="prefix" style={{ fontSize: "0.875rem", color: "#888" }}>$</span>
          </CInput>

          <CInput label="Suffix text" placeholder="weight">
            <span slot="suffix" style={{ fontSize: "0.875rem", color: "#888" }}>kg</span>
          </CInput>

        </div>
      </section>

      {/* Clearable + Prefix */}
      <section>
        <h2>Clearable + Prefix</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput clearable label="Search" value="React components" placeholder="Search...">
            <svg {...{ slot: "prefix" } as any} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </CInput>
        </div>
      </section>

      {/* No Spin Buttons */}
      <section>
        <h2>Number – No Spin Buttons</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput type="number" label="With spin"  placeholder="0" />
          <CInput type="number" label="No spin"    placeholder="0" noSpinButtons />
        </div>
      </section>

      {/* Min / Max / Step */}
      <section>
        <h2>Min / Max / Step</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput type="number" label="1–10, step 2" min={1} max={10} step={2} value="1" />
          <CInput type="date"   label="Date range"   min="2024-01-01" max="2024-12-31" />
        </div>
      </section>

      {/* Validation Constraints */}
      <section>
        <h2>Validation Constraints</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput label="Min 3, Max 10 chars" minlength={3} maxlength={10} placeholder="3–10 chars" helpText="Between 3 and 10 characters" />
          <CInput label="Hex color pattern"   pattern="^#[0-9A-Fa-f]{6}$" placeholder="#ff0000" helpText="Format: #rrggbb" />
        </div>
      </section>

      {/* Autocomplete */}
      <section>
        <h2>Autocomplete</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput type="email"    label="Email"    autocomplete="email"            placeholder="you@example.com" />
          <CInput type="password" label="Password" autocomplete="current-password" placeholder="password" />
          <CInput type="text"     label="Name"     autocomplete="name"             placeholder="Full name" />
        </div>
      </section>

      {/* Input Modes */}
      <section>
        <h2>Input Modes</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput inputmode="numeric" label="Numeric" placeholder="1234" />
          <CInput inputmode="decimal" label="Decimal" placeholder="3.14" />
          <CInput inputmode="email"   label="Email"   placeholder="you@example.com" />
          <CInput inputmode="url"     label="URL"     placeholder="https://..." />
          <CInput inputmode="search"  label="Search"  placeholder="Search..." />
          <CInput inputmode="tel"     label="Tel"     placeholder="+1 555 000" />
        </div>
      </section>

      {/* Spellcheck */}
      <section>
        <h2>Spellcheck</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput label="Spellcheck on"  spellcheck placeholder="Spellcheck enabled" />
          <CInput label="Spellcheck off" placeholder="Spellcheck disabled" />
        </div>
      </section>

      {/* Events */}
      <section>
        <h2>Events</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput
            label="Event demo"
            placeholder="Type something..."
            onCFocus={() => console.log("focused")}
            onCBlur={()  => console.log("blurred")}
            onCInput={(e) => console.log((e.target as HTMLCInputElement).value)}
      onCChange={(e) => console.log((e.target as HTMLCInputElement).value)}
          />
          <CInput
            clearable
            value="clearable"
            label="Clear event"
            onCClear={() => console.log("cleared")}
          />
        </div>
      </section>

      {/* Label Slot */}
      <section>
        <h2>Label Slot</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput placeholder="custom label slot">
            <span slot="label">
              Custom <strong>HTML</strong> label <span style={{ color: "red" }}>*</span>
            </span>
          </CInput>
        </div>
      </section>

      {/* Help Text Slot */}
      <section>
        <h2>Help Text Slot</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput label="Website" placeholder="https://...">
            <span slot="help-text">Must start with <code>https://</code></span>
          </CInput>
        </div>
      </section>

      {/* Kitchen Sink */}
      <section>
        <h2>Kitchen Sink</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <CInput
            type="email"
            label="Work Email"
            placeholder="you@company.com"
            helpText="We'll send confirmation here."
            clearable
            required
            autocomplete="email"
            size="large"
            pill
            onCInput={(e) => console.log((e.target as HTMLCInputElement).value)}

          >
            <svg {...{ slot: "prefix" } as any}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </CInput>

          <CInput
            type="password"
            label="Password"
            placeholder="min 8 characters"
            helpText="Use letters, numbers & symbols."
            passwordToggle
            minlength={8}
            required
            size="large"
            pill
            filled
          />
        </div>
      </section>

    </div>
  )
}

export default Input
