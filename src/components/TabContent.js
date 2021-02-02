import React from "react";
import { styled } from "@storybook/theming";
import { Title, Source } from "@storybook/components";

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

export const TabContent = ({ code }) => (
  <TabWrapper>
    <Title>My Addon </Title>
    <Source code={code} language="jsx" format={false} />
  </TabWrapper>
);
