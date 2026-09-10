import React, { Fragment, memo, useCallback, useState } from 'react';
import type { Result } from '../types';
import { AddonPanel, Button, Placeholder, TabsView } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';
import { styled, useTheme } from 'storybook/theming';

import { EVENTS } from '../constants';
import { List } from './List';

interface PanelProps {
  active?: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: '1rem',
});

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props: PanelProps) {
  const theme = useTheme();

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ divs, styled }, setState] = useState<Result>({
    divs: [],
    styled: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel active={props.active ?? false}>
      <TabsView
        defaultSelected="overview"
        backgroundColor={theme.background.app}
        tabs={[
          {
            id: 'overview',
            title: 'Overview',
            children: (
              <Placeholder>
                <Fragment>
                  Addons can gather details about how a story is rendered. This is panel uses a tab pattern. Click the
                  button below to fetch data for the other two tabs.
                </Fragment>
                <Fragment>
                  <RequestDataButton ariaLabel={false} onClick={fetchData}>
                    Request data
                  </RequestDataButton>
                </Fragment>
              </Placeholder>
            ),
          },
          {
            id: 'div',
            title: `${divs.length} Divs`,
            children:
              divs.length > 0 ? (
                <Placeholder>
                  <p>The following divs have less than 2 childNodes</p>
                  <List
                    items={divs.map((item, index) => ({
                      title: `item #${index}`,
                      description: JSON.stringify(item, null, 2),
                    }))}
                  />
                </Placeholder>
              ) : (
                <Placeholder>
                  <p>No divs found</p>
                </Placeholder>
              ),
          },
          {
            id: 'all',
            title: `${styled.length} All`,
            children:
              styled.length > 0 ? (
                <Placeholder>
                  <p>The following elements have a style attribute</p>
                  <List
                    items={styled.map((item, index) => ({
                      title: `item #${index}`,
                      description: JSON.stringify(item, null, 2),
                    }))}
                  />
                </Placeholder>
              ) : (
                <Placeholder>
                  <p>No styled elements found</p>
                </Placeholder>
              ),
          },
        ]}
      />
    </AddonPanel>
  );
});
