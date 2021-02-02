import React, { Fragment } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button } from "@storybook/components";
import { List } from "./List";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent = ({ results, onClick }) => (
  <TabsState
    initial="overview"
    backgroundColor={convert(themes.normal).background.hoverable}
  >
    <div
      id="overview"
      title="Overview"
      color={convert(themes.normal).color.positive}
    >
      <Placeholder>
        <Fragment>
          Addons can gather details about how a story is rendered. Click the
          button below communicate via channels.
        </Fragment>
        <Fragment>
          <RequestDataButton secondary small onClick={onClick}>
            Request data
          </RequestDataButton>
        </Fragment>
      </Placeholder>
    </div>
    <div
      id="danger"
      title={`${results.danger.length} Danger`}
      color={convert(themes.normal).color.negative}
    >
      <List items={results.danger} />
    </div>
    <div
      id="warning"
      title={`${results.warning.length} Warning`}
      color={convert(themes.normal).color.warning}
    >
      <List items={results.warning} />
    </div>
  </TabsState>
);
