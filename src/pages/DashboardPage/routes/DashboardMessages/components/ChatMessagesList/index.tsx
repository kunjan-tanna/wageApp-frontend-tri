import H from 'history';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import ScrollArea from 'react-scrollbar';

import Tabs from '../../../../../../components/Tabs';
import { IConversation } from '../../../../../../modules/Chat/types';
import { Nullable } from '../../../../../../types';
import { OfferTypes } from '../../../../../../types/offers/index';
import ChatMessagesListItem from '../ChatMessagesListItem';
import { tabNavs } from './consts';
import './styles.scss';
import { IProps } from './types';
import moment from 'moment';
import ChatAlertMessage from '../ChatAlertMessage';

const ChatMessagesList = ({ currentUserId, items, parentRoute, history, location }: IProps) => {
  const [offerTypeInTab, _changeTab] = useState<Nullable<OfferTypes>>(null);
  const [searchText, setSearchText] = useState<string>('');
  const tabs = _renderTabs(items, currentUserId, searchText);
  const itemsByType = _filterConversationsByType(items, offerTypeInTab);
  const hasParam = location.pathname.length > parentRoute.length + 1;
  useEffect(() => {
    if (!hasParam) {
      _selectFirstItemAsActive(itemsByType, parentRoute, history);
    }
  }, [hasParam, history, itemsByType, offerTypeInTab, parentRoute]);
  // const enterPressed = ()=>{
  //   var code = event.keyCode || event.which;
  //   if (code === 13) {
  //     //13 is the enter keycode
  //     this.getUpcomingEvents();
  //   }
  // }
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
      console.log('EVENTT', event.target.value);
      setSearchText(event.target.value.trimStart());
    } else if (event.target.value.length == 0) {
      setSearchText('');
    }
  };
  return (
    <div className="chat__messages-list new-chat-message-list">
      <div className="chat-search">
        <button className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          //  onKeyPress={(e) => enterPressed(e)}
          onChange={e => onSearch(e)}
        />
      </div>
      <Tabs
        items={tabs}
        onSelect={index => {
          _changeTab(tabNavs[index].type);
        }}
      />
    </div>
  );
};

const _renderTabs = (items: IConversation[], currentUserId: any, searchText: any) => {
  return tabNavs.map(({ title, type }) => ({
    title,
    content: _renderMessagesList(items, type, currentUserId, searchText)
  }));
};

const _renderMessagesList = (
  items: IConversation[],
  type: Nullable<OfferTypes>,
  currentUserId: any,
  searchText: any
) => {
  items = _filterConversationsByType(items, type);

  if (items.length < 1) {
    return <p>No items in this category.</p>;
  }
  //Get the Search Listing
  let searchEventList = items.filter((event, index) => {
    return event.converser?.firstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  });

  return (
    <ul className="messages-list">
      <ScrollArea speed={0.8} className="area" contentClassName="content" horizontal={false}>
        {searchEventList.length > 0 ? (
          searchEventList.map(item => {
            const { converser, conversationId, offer, isConversationRead, lastMessage } = item;
            console.log('JJJJJ', item);
            return (
              <ChatMessagesListItem
                key={conversationId}
                id={conversationId}
                accountType={converser.accountType}
                firstName={converser.firstName}
                businessName={converser.businessName}
                coverPhotoUrl={offer.coverPhotoUrl}
                title={offer.title}
                date={new Date(Number(lastMessage) * 1000)}
                type={offer.type}
                avatarUrl={converser.avatarUrl}
                read={isConversationRead}
                currentUserId={currentUserId}
              />
            );
          })
        ) : (
          <>
            <ChatAlertMessage text={'No Found User'} />
          </>
        )}
      </ScrollArea>
    </ul>
  );
};

const _filterConversationsByType = (items: IConversation[], type: Nullable<OfferTypes>) => {
  return type ? items.filter(item => item.offer.type === type) : items;
};

const _selectFirstItemAsActive = (
  items: IConversation[],
  parentRoute: string,
  history: H.History
) => {
  if (items.length > 0) {
    return history.push(`${parentRoute}/${items[0].conversationId}`);
  }
};

export default withRouter(ChatMessagesList);
