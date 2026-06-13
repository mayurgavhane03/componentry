import { CButton } from "@componentry/react";
import React, { useRef, useState } from "react";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "0.5rem",
    }}
  >
    {children}
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section style={{ marginBottom: "2rem" }}>
    <h2
      style={{
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#888",
        marginBottom: "0.75rem",
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);
const Button = () => {
  const focusTargetRef = useRef<HTMLCButtonElement>(null);
  const [eventLog, setEventLog] = useState("—");
  const [clickCount, setClickCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [danger, setDanger] = useState(false);
  const [clickLog, setClickLog] = useState("—");

  const handleAsyncClick = () => {
    setIsLoading(true);
    setIsDone(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
    }, 2000);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CButton — All Usages</h1>

      {/* ── 1. VARIANTS ─────────────────────────────────────────── */}
      <Section title="1. Variants">
        <Row>
          <CButton variant="default">Default</CButton>
          <CButton variant="primary">Primary</CButton>
          <CButton variant="success">Success</CButton>
          <CButton variant="neutral">Neutral</CButton>
          <CButton variant="warning">Warning</CButton>
          <CButton variant="danger">Danger</CButton>
          <CButton variant="text">Text</CButton>
        </Row>
      </Section>

      {/* ── 2. SIZES ────────────────────────────────────────────── */}
      <Section title="2. Sizes">
        <Row>
          <CButton size="small">Small</CButton>
          <CButton size="medium">Medium</CButton>
          <CButton size="large">Large</CButton>
        </Row>
      </Section>

      {/* ── 3. OUTLINED ─────────────────────────────────────────── */}
      <Section title="3. Outlined">
        <Row>
          <CButton variant="default" outline>
            Default
          </CButton>
          <CButton variant="primary" outline>
            Primary
          </CButton>
          <CButton variant="success" outline>
            Success
          </CButton>
          <CButton variant="neutral" outline>
            Neutral
          </CButton>
          <CButton variant="warning" outline>
            Warning
          </CButton>
          <CButton variant="danger" outline>
            Danger
          </CButton>
        </Row>
      </Section>

      {/* ── 4. PILL ─────────────────────────────────────────────── */}
      <Section title="4. Pill">
        <Row>
          <CButton variant="primary" pill>
            Primary Pill
          </CButton>
          <CButton variant="success" pill outline>
            Outline Pill
          </CButton>
          <CButton variant="danger" pill size="small">
            Small Pill
          </CButton>
          <CButton variant="neutral" pill size="large">
            Large Pill
          </CButton>
        </Row>
      </Section>

      {/* ── 5. CIRCLE ───────────────────────────────────────────── */}
      <Section title="5. Circle (icon buttons)">
        <Row>
          <CButton circle variant="default">
            ✕
          </CButton>
          <CButton circle variant="primary">
            ★
          </CButton>
          <CButton circle variant="danger" size="small">
            🗑
          </CButton>
          <CButton circle variant="success" size="large">
            ✓
          </CButton>
          <CButton circle variant="neutral" outline>
            ⚙
          </CButton>
        </Row>
      </Section>

      {/* ── 6. CARET ────────────────────────────────────────────── */}
      <Section title="6. Caret">
        <Row>
          <CButton caret>Default + Caret</CButton>
          <CButton variant="primary" caret>
            Primary + Caret
          </CButton>
          <CButton variant="neutral" caret outline>
            Outline + Caret
          </CButton>
          <CButton variant="warning" caret pill>
            Pill + Caret
          </CButton>
        </Row>
      </Section>

      {/* ── 7. LOADING ──────────────────────────────────────────── */}
      <Section title="7. Loading">
        <Row>
          <CButton loading>Default</CButton>
          <CButton loading variant="primary">
            Primary
          </CButton>
          <CButton loading variant="danger" outline>
            Outline
          </CButton>
          <CButton loading variant="success" pill>
            Pill
          </CButton>
          <CButton loading circle variant="neutral">
            ★
          </CButton>
        </Row>
      </Section>

      {/* ── 8. DISABLED ─────────────────────────────────────────── */}
      <Section title="8. Disabled">
        <Row>
          <CButton disabled>Default</CButton>
          <CButton disabled variant="primary">
            Primary
          </CButton>
          <CButton disabled variant="success" outline>
            Outline
          </CButton>
          <CButton disabled variant="danger" pill>
            Pill
          </CButton>
          <CButton disabled circle>
            ✕
          </CButton>
        </Row>
      </Section>

      {/* ── 9. PREFIX SLOT ──────────────────────────────────────── */}
      <Section title="9. Prefix slot">
        <Row>
          <CButton variant="primary">
            <span slot="prefix">⬇</span>
            Download
          </CButton>
          <CButton variant="success">
            <span slot="prefix">✓</span>
            Confirm
          </CButton>
          <CButton variant="danger" outline>
            <span slot="prefix">🗑</span>
            Delete
          </CButton>
        </Row>
      </Section>

      {/* ── 10. SUFFIX SLOT ─────────────────────────────────────── */}
      <Section title="10. Suffix slot">
        <Row>
          <CButton variant="primary">
            Next
            <span slot="suffix">→</span>
          </CButton>
          <CButton variant="neutral" outline>
            Share
            <span slot="suffix">↗</span>
          </CButton>
        </Row>
      </Section>

      {/* ── 11. PREFIX + SUFFIX ─────────────────────────────────── */}
      <Section title="11. Prefix + Suffix">
        <Row>
          <CButton variant="primary">
            <span slot="prefix">📁</span>
            Open File
            <span slot="suffix">↗</span>
          </CButton>
          <CButton variant="warning" outline>
            <span slot="prefix">⚠</span>
            Review
            <span slot="suffix">→</span>
          </CButton>
        </Row>
      </Section>

      {/* ── 12. LINK BUTTON ─────────────────────────────────────── */}
      <Section title="12. Link button (href)">
        <Row>
          <CButton href="https://example.com" target="_blank">
            Open Link
          </CButton>
          <CButton href="https://example.com" target="_blank" variant="primary">
            <span slot="prefix">↗</span>
            External Link
          </CButton>
          <CButton href="/file.pdf" download="report.pdf" variant="success">
            Download PDF
          </CButton>
          <CButton href="https://example.com" disabled variant="neutral">
            Disabled Link
          </CButton>
        </Row>
      </Section>

      {/* ── 13. FORM TYPES ──────────────────────────────────────── */}
      <Section title="13. Form types">
        <Row>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setClickLog("Form submitted!");
            }}
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            <CButton type="submit" variant="primary" name="action" value="save">
              Submit Form
            </CButton>
          </form>
          <form
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            <input
              type="text"
              defaultValue="clear me"
              style={{ padding: "0.25rem 0.5rem" }}
            />
            <CButton type="reset" variant="neutral">
              Reset Form
            </CButton>
          </form>
          <CButton type="button">Plain Button</CButton>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>{clickLog}</span>
        </Row>
      </Section>

      {/* ── 14. TOOLTIP ─────────────────────────────────────────── */}
      <Section title="14. Tooltip">
        <Row>
          <CButton tooltip="This saves your progress" variant="primary">
            Save
          </CButton>
          <CButton
            tooltip="Permanently deletes the record"
            variant="danger"
            circle
          >
            🗑
          </CButton>
        </Row>
      </Section>

      {/* ── 15. BASIC CLICK ─────────────────────────────────────── */}
      <Section title="15. Basic onClick — alert">
        <Row>
          <CButton variant="primary" onClick={() => alert("Button clicked!")}>
            Click me
          </CButton>
        </Row>
      </Section>

      {/* ── 16. CLICK COUNTER ───────────────────────────────────── */}
      <Section title="16. onClick — update state (click counter)">
        <Row>
          <CButton
            variant="neutral"
            onClick={() => setClickCount((c) => c + 1)}
          >
            Clicked {clickCount} time{clickCount !== 1 ? "s" : ""}
          </CButton>
          <CButton variant="text" onClick={() => setClickCount(0)}>
            Reset
          </CButton>
        </Row>
      </Section>

      {/* ── 17. TOGGLE ──────────────────────────────────────────── */}
      <Section title="17. onClick — toggle variant (like button)">
        <Row>
          <CButton
            variant={liked ? "success" : "default"}
            onClick={() => setLiked((l) => !l)}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </CButton>
        </Row>
      </Section>

      {/* ── 18. ASYNC / LOADING ─────────────────────────────────── */}
      <Section title="18. onClick — async action with loading state">
        <Row>
          <CButton
            variant={isDone ? "success" : "primary"}
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAsyncClick}
          >
            {isDone ? "✓ Done!" : "Save Changes"}
          </CButton>
          {isDone && (
            <CButton variant="text" onClick={() => setIsDone(false)}>
              Reset
            </CButton>
          )}
        </Row>
      </Section>

      {/* ── 19. CONFIRM BEFORE ACTION ───────────────────────────── */}
      <Section title="19. onClick — confirm before destructive action">
        <Row>
          <CButton
            variant="danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this?")) {
                alert("Deleted!");
              }
            }}
          >
            <span slot="prefix">🗑</span>
            Delete
          </CButton>
        </Row>
      </Section>

      {/* ── 20. DISABLED DOES NOT FIRE ──────────────────────────── */}
      <Section title="20. disabled — onClick does not fire">
        <Row>
          <CButton
            variant="primary"
            disabled
            onClick={() => alert("Should not fire")}
          >
            Disabled (no-op)
          </CButton>
        </Row>
      </Section>

      {/* ── 21. LOADING DOES NOT FIRE ───────────────────────────── */}
      <Section title="21. loading — onClick is also suppressed">
        <Row>
          <CButton
            variant="primary"
            loading
            onClick={() => alert("Should not fire")}
          >
            Loading (no-op)
          </CButton>
        </Row>
      </Section>

      {/* ── 22. NATIVE EVENT OBJECT ─────────────────────────────── */}
      <Section title="22. onClick — access native MouseEvent">
        <Row>
          <CButton
            variant="neutral"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setEventLog(`clientX: ${e.clientX}, clientY: ${e.clientY}`);
            }}
          >
            Click to log coords
          </CButton>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>{eventLog}</span>
        </Row>
      </Section>

      {/* ── 23. CONDITIONAL VARIANT SWAP ────────────────────────── */}
      <Section title="23. onClick — conditionally swap variant">
        <Row>
          <CButton
            variant={danger ? "danger" : "warning"}
            onClick={() => setDanger((d) => !d)}
          >
            {danger ? "🔴 Danger mode" : "🟡 Warning mode"} — click to toggle
          </CButton>
        </Row>
      </Section>

      {/* ── 24. GUARDED LINK CLICK ──────────────────────────────── */}
      <Section title="24. onClick on a link button — guard navigation">
        <Row>
          <CButton
            href="https://example.com"
            target="_blank"
            variant="primary"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const go = window.confirm("Leave this page?");
              if (!go) e.preventDefault();
            }}
          >
            <span slot="prefix">↗</span>
            Guarded external link
          </CButton>
        </Row>
      </Section>

      {/* ── 25. cFocus / cBlur EVENTS ───────────────────────────── */}
      <Section title="25. cFocus / cBlur events">
        <Row>
          <CButton
            variant="primary"
            onCFocus={() => setEventLog("cFocus fired")}
            onCBlur={() => setEventLog("cBlur fired")}
          >
            Focus / Blur me
          </CButton>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>{eventLog}</span>
        </Row>
      </Section>

      {/* ── 26. IMPERATIVE METHODS VIA REF ──────────────────────── */}
      <Section title="26. Imperative methods via ref">
        <Row>
          <CButton
            ref={focusTargetRef}
            variant="primary"
            onCFocus={() => setEventLog("cFocus fired")}
            onCBlur={() => setEventLog("cBlur fired")}
          >
            Focus target
          </CButton>
          <CButton
            variant="neutral"
            onClick={() => (focusTargetRef.current as any)?.setFocus()}
          >
            setFocus()
          </CButton>
          <CButton
            variant="neutral"
            onClick={() => (focusTargetRef.current as any)?.removeFocus()}
          >
            removeFocus()
          </CButton>
          <CButton
            variant="neutral"
            onClick={() => (focusTargetRef.current as any)?.triggerClick()}
          >
            triggerClick()
          </CButton>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>{eventLog}</span>
        </Row>
      </Section>

      {/* ── 27. COMBINED COMBOS ─────────────────────────────────── */}
      <Section title="27. Combined combos">
        <Row>
          <CButton
            variant="primary"
            pill
            caret
            size="large"
            onClick={() => setClickLog("Deploy clicked!")}
          >
            <span slot="prefix">🚀</span>
            Deploy
          </CButton>

          <CButton variant="danger" outline pill size="small" loading>
            Deleting…
          </CButton>

          <CButton
            variant="success"
            circle
            size="large"
            tooltip="Approve this item"
            onClick={() => setClickLog("Approved!")}
          >
            ✓
          </CButton>

          <CButton variant="neutral" outline caret size="small" disabled>
            Options
          </CButton>

          <CButton
            href="https://example.com"
            target="_blank"
            variant="primary"
            pill
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const go = window.confirm("Leave?");
              if (!go) e.preventDefault();
            }}
          >
            <span slot="prefix">↗</span>
            External
            <span slot="suffix">★</span>
          </CButton>

          <span style={{ fontSize: "0.85rem", color: "#555" }}>{clickLog}</span>
        </Row>
      </Section>
    </main>
  );
};

export default Button;
