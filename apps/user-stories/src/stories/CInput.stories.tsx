import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CInput } from '@componentry/react'

const meta = {
  title: 'Components/CInput',
  component: CInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'search',
        'tel',
        'url',
        'date',
        'datetime-local',
        'time',
      ],
    },

    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },

    autocapitalize: {
      control: 'select',
      options: [
        'off',
        'none',
        'on',
        'sentences',
        'words',
        'characters',
      ],
    },

    autocorrect: {
      control: 'select',
      options: ['off', 'on'],
    },

    enterkeyhint: {
      control: 'select',
      options: [
        'enter',
        'done',
        'go',
        'next',
        'previous',
        'search',
        'send',
      ],
    },

    inputmode: {
      control: 'select',
      options: [
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
      ],
    },

    label: { control: 'text' },
    helpText: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },

    name: { control: 'text' },
    autocomplete: { control: 'text' },
    pattern: { control: 'text' },
    inputTitle: { control: 'text' },

    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },

    filled: { control: 'boolean' },
    pill: { control: 'boolean' },

    clearable: { control: 'boolean' },
    passwordToggle: { control: 'boolean' },
    noSpinButtons: { control: 'boolean' },

    autofocus: { control: 'boolean' },
    spellcheck: { control: 'boolean' },

    minlength: { control: 'number' },
    maxlength: { control: 'number' },

    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'text' },
  },

  args: {
    onCFocus: fn(),
    onCBlur: fn(),
    onCInput: fn(),
    onCChange: fn(),
    onCClear: fn(),
    onCInvalid: fn(),
  },
} satisfies Meta<typeof CInput>

export default meta

type Story = StoryObj<typeof CInput>

export const Playground: Story = {
  args: {
    type: 'text',
    size: 'medium',

    label: 'Label',
    helpText: 'Helpful text',
    placeholder: 'Enter value',
    value: '',

    name: '',
    autocomplete: '',

    disabled: false,
    readonly: false,
    required: false,

    filled: false,
    pill: false,

    clearable: false,
    passwordToggle: false,
    noSpinButtons: false,

    autofocus: false,
    spellcheck: true,

    autocapitalize: 'off',
    autocorrect: 'off',
    inputmode: 'text',

    minlength: undefined,
    maxlength: undefined,

    min: undefined,
    max: undefined,
    step: undefined,

    pattern: '',
    inputTitle: '',
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', width: '320px' }}>
      <CInput label="Default" placeholder="Default input" />
      <CInput label="Disabled" placeholder="Disabled input" disabled />
      <CInput label="Readonly" value="Readonly value" readonly />
      <CInput
        label="Required"
        placeholder="Required input"
        required
        helpText="This field is required"
      />
    </div>
  ),
}

export const Slots: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', width: '320px' }}>
      <CInput label="Amount">
        <span slot="prefix">$</span>
      </CInput>

      <CInput label="Weight">
        <span slot="suffix">kg</span>
      </CInput>

      <CInput placeholder="Custom label">
        <span slot="label">
          Custom <strong>Label</strong>
        </span>
      </CInput>

      <CInput label="Website">
        <span slot="help-text">
          Must start with https://
        </span>
      </CInput>
    </div>
  ),
}

export const Validation: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', width: '320px' }}>
      <CInput
        type="number"
        label="Min / Max / Step"
        min={1}
        max={10}
        step={2}
      />

      <CInput
        label="Username"
        minlength={3}
        maxlength={10}
        helpText="3-10 characters"
      />

      <CInput
        label="Hex Color"
        placeholder="#ff0000"
        pattern="^#[0-9A-Fa-f]{6}$"
      />
    </div>
  ),
}

export const Events: Story = {
  args: {
    label: 'Events Demo',
    placeholder: 'Check Actions panel',
    clearable: true,
  },
}

export const KitchenSink: Story = {
  render: () => (
    <CInput
      type="email"
      label="Work Email"
      placeholder="you@company.com"
      helpText="We'll send confirmation here."
      autocomplete="email"
      clearable
      required
      size="large"
      pill
    >
      <span slot="prefix">📧</span>
    </CInput>
  ),
}