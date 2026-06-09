import type { Meta, StoryObj } from '@storybook/react-vite';
import { CButton } from '@componentry/react';

type CButtonArgs = {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

const meta: Meta<CButtonArgs> = {
  title: 'Components/CButton',
  render: (args) => (
    <CButton
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
    >
      {args.label}
    </CButton>
  ),
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
type Story = StoryObj<CButtonArgs>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Disabled: Story = {
  args: { disabled: true },
};