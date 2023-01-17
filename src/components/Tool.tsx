import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "../utils/constants";

export const Tool = () => {
  const [{ myAddon }, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        myAddon: myAddon ? undefined : true,
      }),
    [myAddon]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={myAddon}
      title="Enable my addon"
      onClick={toggleMyTool}
    >
      <Icons icon="lightning" />
    </IconButton>
  );
};
