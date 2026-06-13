/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Preview } from '@storybook/react-vite'

// @ts-ignore
import '@componentry/theme/styles/light.css'
// @ts-ignore
import '@componentry/theme/styles/dark.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },

  decorators: [
  (Story, context) => {
    const theme = context.globals.theme

    document.documentElement.classList.remove(
      'c-theme-light',
      'c-theme-dark'
    )

    document.documentElement.classList.add(
      theme === 'dark'
        ? 'c-theme-dark'
        : 'c-theme-light'
    )

    document.body.style.background =
      theme === 'dark'
        ? 'var(--c-color-neutral-950)'
        : 'var(--c-color-neutral-0)'

    return Story()
  },
],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
}

export default preview