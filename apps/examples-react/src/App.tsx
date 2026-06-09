import React from 'react';
import { CButton } from '@componentry/react';

export default function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Componentry — React Examples</h1>

      <section>
        <h2>CButton</h2>
        <CButton variant="primary">Primary</CButton>
        <CButton variant="secondary" style={{ marginLeft: '8px' }}>Secondary</CButton>
        <CButton variant="ghost" style={{ marginLeft: '8px' }}>Ghost</CButton>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Disabled</h2>
        <CButton variant="primary" disabled>Disabled</CButton>
      </section>
    </main>
  );
}
