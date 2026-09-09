import { definePreview } from '@storybook/react-vite';

import addonDocs from '@storybook/addon-docs';

export default definePreview({
  addons: [addonDocs()],
  initialGlobals: {
    background: { value: 'light' },
  },
});
