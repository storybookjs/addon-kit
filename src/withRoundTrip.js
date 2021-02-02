import { useChannel } from "@storybook/client-api";
import { EVENTS } from "./constants";

export const withRoundTrip = (storyFn) => {
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, {
        danger: [
          "Cras justo odio",
          "Dapibus ac facilisis in",
          "Morbi leo risus",
        ],
        warning: ["Porta ac consectetur ac", "Vestibulum at eros"],
      });
    },
  });
  return storyFn();
};
