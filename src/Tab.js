import React from "react";
import { styled } from "@storybook/theming";
import { useParameter } from "@storybook/api";
import { Title, Source } from "@storybook/components";
import { PARAM_KEY } from "./constants";

export const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

export const Tab = ({ active }) => {
  const result = useParameter(PARAM_KEY, []);

  return active ? (
    <TabWrapper>
      <Title>My Addon </Title>
      <Source code={result} language="jsx" format={false} />
    </TabWrapper>
  ) : null;
};
