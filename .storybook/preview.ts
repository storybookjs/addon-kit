import type { Preview } from "@storybook/react";
import { background } from "storybook/internal/theming";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  initialGlobals: {
    background: { value: "light" },
  },
};

export default preview;
