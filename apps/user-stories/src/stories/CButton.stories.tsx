import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CButton } from '@componentry-ui/react'

const meta = {
  title: 'Components/CButton',
  component: CButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'success',
        'neutral',
        'warning',
        'danger',
        'text',
      ],
    },

    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },

    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },

    target: {
      control: 'select',
      options: ['_blank', '_parent', '_self', '_top'],
    },

    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    outline: { control: 'boolean' },
    pill: { control: 'boolean' },
    circle: { control: 'boolean' },
    caret: { control: 'boolean' },

    href: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    rel: { control: 'text' },
    download: { control: 'text' },
    tooltip: { control: 'text' },

    children: {
      control: 'text',
    },
  },

  args: {
    onCFocus: fn(),
    onCBlur: fn(),
    onCInvalid: fn(),
  },
} satisfies Meta<typeof CButton>

export default meta

type Story = StoryObj<typeof CButton>

export const Playground: Story = {
  args: {
    children: 'Button',

    variant: 'primary',
    size: 'medium',

    disabled: false,
    loading: false,

    outline: false,
    pill: false,
    circle: false,
    caret: false,

    type: 'button',

    href: '',
    target: '_self',
    rel: 'noreferrer noopener',

    name: '',
    value: '',

    download: '',
    tooltip: '',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <CButton variant="default">Default</CButton>
      <CButton variant="primary">Primary</CButton>
      <CButton variant="success">Success</CButton>
      <CButton variant="neutral">Neutral</CButton>
      <CButton variant="warning">Warning</CButton>
      <CButton variant="danger">Danger</CButton>
      <CButton variant="text">Text</CButton>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <CButton>Default</CButton>
      <CButton disabled>Disabled</CButton>
      <CButton loading>Loading</CButton>
      <CButton outline>Outline</CButton>
      <CButton pill>Pill</CButton>
      <CButton caret>Caret</CButton>
    </div>
  ),
}

export const Slots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <CButton>
        <span slot="prefix">🚀</span>
        Prefix
      </CButton>

      <CButton>
        Suffix
        <span slot="suffix">→</span>
      </CButton>

      <CButton circle>
        <span slot="prefix">⚙️</span>
      </CButton>
    </div>
  ),
}

 