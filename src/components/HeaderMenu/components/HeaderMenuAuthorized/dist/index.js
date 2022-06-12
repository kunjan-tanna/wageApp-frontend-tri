'use strict';
exports.__esModule = true;
var react_1 = require('react');
var react_router_dom_1 = require('react-router-dom');
var config_1 = require('../../../../config');
var menu_1 = require('../../../../data/menu');
var types_1 = require('../../../../types');
var Tooltip_1 = require('../../../Tooltip');
require('./styles.scss');
var index_1 = require('../../../../utils/Firebase/index');
var MixPanel_1 = require('../../../../utils/MixPanel');
var HeaderMenuAuthorized = function(_a) {
  var conversations = _a.conversations,
    notifications = _a.notifications,
    user = _a.user,
    unreadConversations = _a.unreadConversations,
    unreadNotifications = _a.unreadNotifications,
    tooltips = _a.tooltips,
    toggleTooltip = _a.toggleTooltip,
    history = _a.history,
    pageurl = _a.pageurl;
  var accountType = user.accountType,
    avatarUrl = user.avatarUrl,
    businessName = user.businessName,
    firstName = user.firstName,
    id = user.id;
  var avatarForBusiness =
    accountType === types_1.AccountTypes.BUSINESS ? ' header-icon--avatar-business' : '';
  var userName = accountType === types_1.AccountTypes.BUSINESS ? businessName : firstName;
  var _b = react_1.useState(0),
    count = _b[0],
    setCount = _b[1];
  var _c = react_1.useState(),
    conversationIds = _c[0],
    setConversationIds = _c[1];
  react_1.useEffect(function() {
    // setOnSnapShort();
    setOnCount();
  }, []);
  var setOnCount = function() {
    index_1.db
      .collection('Users')
      .doc(String(id))
      .onSnapshot(function(snapShort) {
        var _a;
        console.log('\n\n $$$', snapShort.data());
        var count =
          (_a = snapShort.data()) === null || _a === void 0 ? void 0 : _a.unreadConversation;
        setCount(count);
      });
  };
  var setOnSnapShort = function() {
    // apiClient
    //   .get<any>(`https://api.wageapp.io/api/conversations/v2`, {
    //     baseURL: ApiConfig.URL
    //   })
    //   .then(res => {
    //     let query;
    //     if (res.data && res.data.conversations) {
    //       console.log('2222222222222222');
    //       let arr = res.data.conversations.map((item: any) => String(item.conversationId));
    //       let size = 10;
    //       while (arr.length > 0) {
    //         query = db
    //           .collection('Conversations')
    //           .where('conversationId', 'in', arr.splice(0, size));
    //         query.onSnapshot(querySnapshot => {
    //           querySnapshot.docChanges().forEach(change => {
    //             if (change.type === 'added' || change.type === 'modified') {
    //               getConversationCount();
    //             }
    //           });
    //         });
    //       }
    //     }
    //   });
  };
  // const getConversationIds = async () => {
  //   const { data } = await apiClient.get<any>(
  //     `https://api.wageapp.io/api/conversations/conversationids`,
  //     {
  //       baseURL: ApiConfig.URL
  //     }
  //   );
  //   setConversationIds(data);
  // };
  // const getConversationCount = () => {
  //   setCount(0);
  //   let cnt = 0;
  //   apiClient
  //     .get<any>(`https://api.wageapp.io/api/conversations/v2`, {
  //       baseURL: ApiConfig.URL
  //     })
  //     .then(res => {
  //       if (res.data) {
  //         res.data.conversations.map((d: any) => {
  //           db.collection('Conversations')
  //             .doc(String(d.conversationId))
  //             .get()
  //             .then(snap => {
  //               if (snap.data() ?.isRead === false && snap.data() ?.lastSenderId != user.id) {
  //                 cnt += 1;
  //                 setCount(cnt);
  //               }
  //             });
  //         });
  //       }
  //     });
  // };
  react_1.useEffect(function() {
    if (index_1.Firebase.messaging.isSupported()) {
      var messaging_1 = index_1.Firebase.messaging();
      messaging_1
        .requestPermission()
        .then(function() {
          return messaging_1.getToken();
        })
        .then(function(token) {
          console.log('token::', token);
          index_1.db
            .collection('Users')
            .doc(String(user.id))
            .collection('token')
            .doc(token)
            .set({
              platform: 'web'
            });
          // db.collection('Users')
          //   .doc(String(user.id))
          //   .update({ unreadConversation: FS.FieldValue })
        })
        ['catch'](function(error) {
          console.log('error is::::', error);
        });
    }
  });
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'li',
      { className: 'nav-menu__item' },
      react_1['default'].createElement(
        react_router_dom_1.Link,
        { to: config_1.Routes.ADD_TASK },
        react_1['default'].createElement(
          'div',
          { className: pageurl === '/add-task' ? 'post-tasks-active' : 'button button--add' },
          'Post task'
        )
      )
    ),
    react_1['default'].createElement(
      'li',
      { className: 'nav-menu__item' },
      react_1['default'].createElement(
        react_router_dom_1.Link,
        { to: config_1.Routes.DASHBOARD_MESSAGES },
        react_1['default'].createElement(
          'div',
          {
            className: 'header-icon',
            onClick: function() {
              return toggleTooltip('chat');
            }
          },
          _renderUnreadNotificationsCount(count),
          react_1['default'].createElement('i', { className: 'icon icon--messages' })
        )
      )
    ),
    react_1['default'].createElement(
      'li',
      { className: 'nav-menu__item' },
      react_1['default'].createElement(
        react_router_dom_1.Link,
        { to: config_1.Routes.DASHBOARD_NOTIFICATIONS },
        react_1['default'].createElement(
          'div',
          {
            className: 'header-icon',
            onClick: function() {
              return toggleTooltip('notifications');
            }
          },
          react_1['default'].createElement('i', { className: 'icon icon--notifications' }),
          _renderUnreadNotificationsCount(unreadNotifications)
        )
      )
    ),
    react_1['default'].createElement(
      'li',
      { className: 'nav-menu__item' },
      react_1['default'].createElement(
        'div',
        {
          className: 'nav-menu__button nav-menu__button--dropdown',
          onClick: function() {
            return toggleTooltip('menuAbout');
          },
          title: userName
        },
        react_1['default'].createElement(
          react_router_dom_1.Link,
          {
            to: config_1.Routes.DASHBOARD_PROFILE,
            className: 'header-icon header-icon--avatar' + avatarForBusiness
          },
          avatarUrl
            ? react_1['default'].createElement('img', {
                src: '' + config_1.ApiConfig.URL + avatarUrl,
                alt: userName
              })
            : react_1['default'].createElement('i', { className: 'icon icon--profile' })
        ),
        react_1['default'].createElement('span', { className: 'nav-menu__button__name' }, userName)
      ),
      react_1['default'].createElement(
        Tooltip_1['default'],
        {
          extraClassName: 'tooltip--header',
          isOpen: tooltips.menuAbout,
          onClickOutside: function() {
            return toggleTooltip('menuAbout');
          }
        },
        react_1['default'].createElement(
          'ul',
          { className: 'page-header__subMenu' },
          menu_1.dashboard.map(function(_a) {
            var label = _a.label,
              path = _a.path,
              icon = _a.icon;
            if (
              accountType === types_1.AccountTypes.BUSINESS &&
              path() === config_1.Routes.DASHBOARD_SERVICES
            ) {
              return null;
            }
            return react_1['default'].createElement(
              'li',
              {
                key: '' + label + path,
                onClick: function() {
                  return toggleTooltip('menuAbout');
                }
              },
              react_1['default'].createElement(
                react_router_dom_1.Link,
                { to: path(), className: 'page-header__subMenu__item' },
                react_1['default'].createElement('i', { className: 'icon icon--' + icon }),
                label
              )
            );
          })
        ),
        react_1['default'].createElement(
          'div',
          { className: 'page-header__subMenu__about' },
          react_1['default'].createElement(
            'ul',
            null,
            menu_1.about.map(function(_a) {
              var label = _a.label,
                path = _a.path;
              return react_1['default'].createElement(
                'li',
                { key: '' + label + path },
                react_1['default'].createElement(react_router_dom_1.Link, { to: path() }, label)
              );
            })
          )
        )
      )
    )
  );
};
var _renderUnreadNotificationsCount = function(items) {
  MixPanel_1.mixPanelEvent('Viewed in-app notification', {
    'In-app notification': 'Yes'
  });
  if (items > 0) {
    return react_1['default'].createElement(
      'span',
      {
        className: 'number-of-notifications' + (items > 9 ? ' number-of-notifications--bigger' : '')
      },
      items > 9 ? '9+' : items
    );
  }
  return null;
};
exports['default'] = HeaderMenuAuthorized;
