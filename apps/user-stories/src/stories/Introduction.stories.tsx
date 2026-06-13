// Introduction.stories.tsx

import type { Meta } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Componentry</h1>
          <p>
            A modern component library built with Stencil and distributed for:
          </p>
          <ul>
            <li>React</li>
            <li>Vue</li>
            <li>Angular</li>
            <li>Web Components</li>
          </ul>
        </>
      ),
    },
  },
};

export default meta;