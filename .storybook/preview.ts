import { definePreview } from '@storybook/react-vite';

import addonDocs from '@storybook/addon-docs';

// to load the built addon in this test Storybook
import addonKit from '../dist/index.js';

export default definePreview({
  addons: [addonDocs(), addonKit()],
  initialGlobals: {
    background: { value: 'light' },
  },
});
