import React from "react";
import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "../utils/constants";
import { TabContent } from "./TabContent";

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useparameter
  const paramData = useParameter<string>(PARAM_KEY, "");

  return active ? <TabContent code={paramData} /> : null;
};
