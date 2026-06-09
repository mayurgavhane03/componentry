import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const stories = [
    { id: 1, title: 'Button click triggers form submit', component: 'c-button', description: 'As a user, when I click the primary button, the form submits.' },
    { id: 2, title: 'Disabled button cannot be clicked', component: 'c-button', description: 'As a user, I cannot interact with a disabled button.' },
];
export default function App() {
    return (_jsxs("main", { style: { padding: '2rem', fontFamily: 'sans-serif', maxWidth: '720px' }, children: [_jsx("h1", { children: "User Stories" }), stories.map(s => (_jsxs("article", { style: { border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }, children: [_jsx("h3", { children: s.title }), _jsx("p", { style: { color: '#555' }, children: s.description }), _jsxs("code", { style: { fontSize: '12px', color: '#888' }, children: ["Component: ", s.component] })] }, s.id)))] }));
}
