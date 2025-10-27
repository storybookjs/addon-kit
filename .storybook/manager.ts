import { addons } from "storybook/manager-api";

import { renderLabel } from "../dist/manager-helpers.js";

/*
 * This is an example of opt-in usage of addon exports. Your users can choose to
 * import and use this helper, or not. Opt-in helpers should be exported in their
 * own file rather than in `manager.tsx`, because importing `manager.tsx` multiple
 * times can cause the addon registration code to run multiple times.
 */
addons.setConfig({
  sidebar: {
    renderLabel,
  },
});
