import React from 'react';

const stories = [
  { id: 1, title: 'Button click triggers form submit', component: 'c-button', description: 'As a user, when I click the primary button, the form submits.' },
  { id: 2, title: 'Disabled button cannot be clicked', component: 'c-button', description: 'As a user, I cannot interact with a disabled button.' },
];

export default function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '720px' }}>
      <h1>User Stories</h1>
      {stories.map(s => (
        <article key={s.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{s.title}</h3>
          <p style={{ color: '#555' }}>{s.description}</p>
          <code style={{ fontSize: '12px', color: '#888' }}>Component: {s.component}</code>
        </article>
      ))}
    </main>
  );
}
