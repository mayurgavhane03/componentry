import { jsx as _jsx } from "react/jsx-runtime";
import { CButton } from '@componentry/react';
const meta = {
    title: 'Components/CButton',
    render: (args) => (_jsx(CButton, { variant: args.variant, size: args.size, disabled: args.disabled, children: args.label })),
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        disabled: {
            control: 'boolean',
        },
        label: {
            control: 'text',
        },
    },
    args: {
        label: 'Click me',
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
};
export default meta;
export const Primary = {};
export const Secondary = {
    args: { variant: 'secondary' },
};
export const Ghost = {
    args: { variant: 'ghost' },
};
export const Disabled = {
    args: { disabled: true },
};
