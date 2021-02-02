/* eslint-env browser */
import { useEffect, useGlobals } from "@storybook/addons";

export const withGlobals = (StoryFn, context) => {
  const [{ myAddon }, updateGlobals] = useGlobals();
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selectorId = isInDocs ? `#anchor--${context.id} .docs-story` : `root`;

    displayToolState(selectorId, { myAddon, isInDocs });
  }, [myAddon]);

  return StoryFn();
};

function displayToolState(selector, state) {
  const rootElement = document.getElementById(selector);
  let preElement = rootElement.querySelector("pre");

  if (!preElement) {
    preElement = document.createElement("pre");
    rootElement.appendChild(preElement);
  }

  preElement.innerText = JSON.stringify(state, null, 2);
}
