import React, { ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import './styles.scss';
import { IProps, ITabItem } from './types';

const TabsWrapper = (props: IProps) => {
  const { className, items, onSelect } = props;

  return (
    <>
      <Tabs className={className} onSelect={onSelect}>
        <TabList>{_renderTabs(items)}</TabList>

        {_renderTabPanels(items)}
      </Tabs>{' '}
    </>
  );
};

const _renderTabs = (items: ITabItem[]): ReactNode => {
  return items.map(item => (
    <Tab
      key={`tab-${item.title}-nav`}
      className={`react-tabs__tab ${
        items.length > 0 && items.length < 5 ? `react-tabs__tab--size${items.length}` : ''
      }`}
    >
      {item.title}
    </Tab>
  ));
};

const _renderTabPanels = (items: ITabItem[]): ReactNode => {
  return items.map(item => <TabPanel key={`tab-${item.title}-content`}>{item.content}</TabPanel>);
};

export default TabsWrapper;
