import React from "react";
import { styled, themes, convert } from "@storybook/theming";

const ListWrapper = styled.ul({
  listStyle: "none",
  fontSize: 14,
  padding: 0,
  margin: 0,
});

const ListItem = styled.li({
  display: "block",
  padding: convert(themes.normal).layoutMargin,
  borderTop: `1px solid ${convert(themes.normal).appBorderColor}`,
  "&:hover": {
    background: convert(themes.normal).background.hoverable,
  },
});

export const List = ({ items }) => (
  <ListWrapper>
    {items.map((result, idx) => (
      <ListItem key={idx}>{result}</ListItem>
    ))}
  </ListWrapper>
);
