import { useChannel } from "@storybook/client-api";
import { EVENTS } from "./constants";

export const withRoundTrip = (storyFn) => {
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, {
        danger: [
          "Panels are the most common type of addon in the ecosystem",
          "For example the official @storybook/actions and @storybook/a11y use this pattern",
          "You can specify a custom title for your addon panel and have full control over what content it renders",
        ],
        warning: [
          'This tabbed UI pattern is a popular option to display "test" reports. It\'s used by @storybook/addon-jest and @storybook/addon-a11y',
          "@storybook/components offers this and other components to help you quickly build an addon",
        ],
      });
    },
  });
  return storyFn();
};
