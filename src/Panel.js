import React, { Fragment } from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { styled, themes, convert } from "@storybook/theming";
import {
  AddonPanel,
  ScrollArea,
  TabsState,
  Placeholder,
  Button,
} from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";

const List = styled.ul({
  listStyle: "none",
  fontSize: 14,
  padding: 0,
  margin: 0,
});

const Item = styled.li({
  display: "block",
  padding: convert(themes.normal).layoutMargin,
  borderTop: `1px solid ${convert(themes.normal).appBorderColor}`,
  "&:hover": {
    background: convert(themes.normal).background.hoverable,
  },
});

export const Panel = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  return (
    <AddonPanel {...props}>
      <ScrollArea vertical horizontal>
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
                Addons can gather details about how a story is rendered. Click
                the button below communicate via channels. <br /> <br />
              </Fragment>
              <Fragment>
                <Button secondary small onClick={() => emit(EVENTS.REQUEST)}>
                  Request data
                </Button>
              </Fragment>
            </Placeholder>
          </div>
          <div
            id="danger"
            title={`${results.danger.length} Danger`}
            color={convert(themes.normal).color.negative}
          >
            <List>
              {results.danger.map((result, idx) => (
                <Item key={idx}>{result}</Item>
              ))}
            </List>
          </div>
          <div
            id="warning"
            title={`${results.warning.length} Warning`}
            color={convert(themes.normal).color.warning}
          >
            <List>
              {results.warning.map((result, idx) => (
                <Item key={idx}>{result}</Item>
              ))}
            </List>
          </div>
        </TabsState>
      </ScrollArea>
    </AddonPanel>
  );
};
