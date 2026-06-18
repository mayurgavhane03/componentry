import { CCheckbox, CButton } from "@componentry-ui/react";
import React, { useRef, useState } from "react";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "0.75rem",
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

const Checkbox = () => {
  const checkboxRef = useRef<HTMLCCheckboxElement>(null);

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [eventLog, setEventLog] = useState("—");

  return (
    <>
      <Section title="Basic">
        <Row>
          <CCheckbox>Default Checkbox</CCheckbox>
        </Row>
      </Section>

      <Section title="Checked">
        <Row>
          <CCheckbox checked>Checked Checkbox</CCheckbox>
        </Row>
      </Section>

      <Section title="Indeterminate">
        <Row>
          <CCheckbox indeterminate>
            Indeterminate Checkbox
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Disabled">
        <Row>
          <CCheckbox disabled>
            Disabled Checkbox
          </CCheckbox>

          <CCheckbox checked disabled>
            Disabled Checked
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Sizes">
        <Row>
          <CCheckbox size="small">
            Small
          </CCheckbox>

          <CCheckbox size="medium">
            Medium
          </CCheckbox>

          <CCheckbox size="large">
            Large
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Required">
        <Row>
          <CCheckbox required>
            Accept Terms & Conditions
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Help Text">
        <Row>
          <CCheckbox helpText="You must accept before continuing">
            Terms & Conditions
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Controlled">
        <Row>
          <CCheckbox
            checked={checked}
            onCChange={() => setChecked(!checked)}
          >
            Controlled Checkbox
          </CCheckbox>

          <span>
            Checked: {checked ? "Yes" : "No"}
          </span>
        </Row>
      </Section>

      <Section title="Select All Pattern">
        <Row>
          <CCheckbox
            checked={checked}
            indeterminate={indeterminate}
            onCChange={() => {
              setChecked(!checked);
              setIndeterminate(false);
            }}
          >
            Select All
          </CCheckbox>
        </Row>
      </Section>

      <Section title="Events">
        <Row>
          <CCheckbox
            onCChange={() => setEventLog("cChange")}
            onCFocus={() => setEventLog("cFocus")}
            onCBlur={() => setEventLog("cBlur")}
            onCInput={() => setEventLog("cInput")}
            onCInvalid={() => setEventLog("cInvalid")}
          >
            Trigger Events
          </CCheckbox>

          <strong>{eventLog}</strong>
        </Row>
      </Section>

      <Section title="Methods">
        <Row>
          <CCheckbox ref={checkboxRef}>
            Methods Demo
          </CCheckbox>

          {/* <CButton
            onClick={() => checkboxRef.current?.checkClick()}
          >
            Click
          </CButton> */}

          <CButton
            onClick={() => checkboxRef.current?.checkFocus()}
          >
            Focus
          </CButton>

          <CButton
            onClick={() => checkboxRef.current?.checkBlur()}
          >
            Blur
          </CButton>

          <CButton
            onClick={() =>
              checkboxRef.current?.reportValidity()
            }
          >
            Validate
          </CButton>
        </Row>
      </Section>

      <Section title="Form Example">
        <Row>
          <form>
            <CCheckbox
              name="terms"
              value="accepted"
              required
            >
              I agree to the Terms & Conditions
            </CCheckbox>
          </form>
        </Row>
      </Section>

      <Section title="All Props">
        <Row>
          <CCheckbox
            checkBoxtitle="Accept Terms"
            name="terms"
            value="accepted"
            size="large"
            checked
            required
            helpText="Required before submitting"
          >
            Accept Terms & Conditions
          </CCheckbox>
        </Row>
      </Section>
    </>
  );
};

export default Checkbox;