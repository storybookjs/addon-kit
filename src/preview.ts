/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper
 */
import { withGlobals } from "./decorators/withGlobals";
import { withRoundTrip } from "./decorators/withRoundTrip";

export const decorators = [withGlobals, withRoundTrip];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "circlehollow",
      title: "Theme",
      items: [
        { value: "light", icon: "circlehollow", title: "light" },
        { value: "dark", icon: "circle", title: "dark" },
        { value: "side-by-side", icon: "sidebar", title: "side by side" },
        { value: "stacked", icon: "bottombar", title: "stacked" },
      ],
    },
  },
};
