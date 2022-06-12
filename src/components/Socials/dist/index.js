'use strict';
exports.__esModule = true;
var react_1 = require('react');
var react_share_1 = require('react-share');
var config_1 = require('../../config');
require('./styles.scss');
var MixPanel_1 = require('../../utils/MixPanel');
var Socials = function(props) {
  var _a = props.offer,
    title = _a.title,
    id = _a.id,
    coverPhotoUrl = _a.coverPhotoUrl,
    description = _a.description,
    offerType = _a.offerType,
    type = _a.type;
  var offerUrl =
    '' +
    'https://wageapp.io' +
    config_1.Routes.OFFER +
    '/' +
    id +
    '/' +
    title
      .trim()
      .replace(/\s/g, '-')
      .toLowerCase();
  console.log('offerUUUU', offerUrl);
  console.log('OFFER TYPE', offerType, type);
  var eventName = offerType
    ? offerType[0].toUpperCase() + offerType.slice(1)
    : type
    ? type[0].toUpperCase() + type.slice(1)
    : 'Offer shared';
  return react_1['default'].createElement(
    'ul',
    { className: 'socials' },
    react_1['default'].createElement(
      'li',
      { className: 'socials__item' },
      react_1['default'].createElement(
        react_share_1.FacebookShareButton,
        {
          url: offerUrl,
          quote: 'I just did ' + title + '! Check out Wage if you are looking for side gigs.',
          onShareWindowClose: function() {
            MixPanel_1.mixPanelEvent(eventName + ' shared', {
              'Social share': 'Facebook'
            });
          }
        },
        react_1['default'].createElement('i', { className: 'icon icon--facebook' })
      )
    ),
    react_1['default'].createElement(
      'li',
      { className: 'socials__item' },
      react_1['default'].createElement(
        react_share_1.TwitterShareButton,
        {
          url: offerUrl,
          title: 'I just did ' + title + '! Check out Wage if you are looking for side gigs.',
          onShareWindowClose: function() {
            MixPanel_1.mixPanelEvent(eventName + ' shared', {
              'Social share': 'Twitter'
            });
          }
        },
        react_1['default'].createElement('i', { className: 'icon icon--twitter' })
      )
    ),
    react_1['default'].createElement(
      'li',
      { className: 'socials__item' },
      react_1['default'].createElement(
        react_share_1.PinterestShareButton,
        {
          url: offerUrl,
          media: coverPhotoUrl ? '' + config_1.ApiConfig.URL + coverPhotoUrl : '',
          onShareWindowClose: function() {
            MixPanel_1.mixPanelEvent(eventName + ' shared', {
              'Social share': 'Pinterest'
            });
          }
        },
        react_1['default'].createElement('i', { className: 'icon icon--pinterest' })
      )
    ),
    react_1['default'].createElement(
      'li',
      {
        className: 'socials__item',
        onClick: function() {
          MixPanel_1.mixPanelEvent(eventName + ' shared', {
            'Social share': 'Email'
          });
        }
      },
      react_1['default'].createElement(
        react_share_1.EmailShareButton,
        {
          url: offerUrl,
          subject: title,
          body: description.slice(0, 160) + '...',
          onShareWindowClose: function() {
            MixPanel_1.mixPanelEvent(eventName + ' shared', {
              'Social share': 'Email'
            });
          }
        },
        react_1['default'].createElement('i', { className: 'icon icon--email-color' })
      )
    )
  );
};
exports['default'] = Socials;
