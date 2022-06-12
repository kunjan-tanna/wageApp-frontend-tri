'use strict';
exports.__esModule = true;
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var ModalAlternative_1 = require('../../components/ModalAlternative');
var actions_1 = require('../../modules/Modals/BlockPeople/actions');
var selectors_1 = require('../../modules/Modals/BlockPeople/selectors');
var types_1 = require('../../modules/Modals/BlockPeople/types');
var MixPanel_1 = require('../../utils/MixPanel');
var Loading_1 = require('../Loading');
var moment_timezone_1 = require('moment-timezone');
var BlockPeopleModal = function() {
  var dispatch = react_redux_1.useDispatch();
  var closeModal = react_1.useCallback(
    function() {
      return dispatch(actions_1.blockPeopleModalReset());
    },
    [dispatch]
  );
  var blockPeopleModal = react_redux_1.useSelector(function(state) {
    return selectors_1.blockPeopleModalSelector(state);
  });
  var error = blockPeopleModal.error,
    requesting = blockPeopleModal.requesting,
    success = blockPeopleModal.success,
    type = blockPeopleModal.type,
    userId = blockPeopleModal.userId,
    userName = blockPeopleModal.userName;
  var isBlock = type === types_1.BlockTypes.BLOCK;
  var showWelcomeContent = !error && !requesting && !success;
  var requestMethod = react_1.useCallback(
    function() {
      return userId
        ? dispatch(
            isBlock
              ? actions_1.blockUserRequest({ userId: userId })
              : actions_1.unblockUserRequest({ userId: userId })
          )
        : undefined;
    },
    [dispatch, isBlock, userId]
  );
  var offerTitle = window.location.pathname.substring(
    window.location.pathname.lastIndexOf('/') + 1
  );
  offerTitle = offerTitle.replace('-', ' ');
  offerTitle = offerTitle[0].toUpperCase() + offerTitle.slice(1);
  return react_1['default'].createElement(
    ModalAlternative_1['default'],
    { isOpen: true, extraClass: 'pink-style' },
    react_1['default'].createElement(
      'div',
      { className: 'modal-alternative__header' },
      react_1['default'].createElement('h3', null, (isBlock ? 'Block' : 'Unblock') + ' user')
    ),
    react_1['default'].createElement(
      'div',
      { className: 'modal-alternative__content' },
      showWelcomeContent && _renderWelcomeContent(userName, closeModal, type, requestMethod),
      requesting && react_1['default'].createElement(Loading_1['default'], null),
      success && isBlock
        ? MixPanel_1.mixPanelEvent('User blocked', {
            'Task name': offerTitle,
            'User name': userName,
            'Date blocked': moment_timezone_1['default'](new Date())
              .tz('America/Galapagos')
              .format('MM/DD/YYYY')
          })
        : null,
      success &&
        _renderMessage(
          '<strong>' + userName + '</strong> has been ' + (isBlock ? 'blocked' : 'unblocked'),
          closeModal
        ),
      error && _renderMessage('An error occurred. Please try again later.', closeModal)
    )
  );
};
var _renderWelcomeContent = function(name, closeModal, type, requestMethod) {
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      'p',
      null,
      react_1['default'].createElement('strong', null, name),
      ' will be ',
      type === types_1.BlockTypes.BLOCK ? 'added to' : 'removed from',
      ' ',
      'your Blocked list. Are you sure you want to do this?'
    ),
    react_1['default'].createElement(
      'div',
      { className: 'btns' },
      react_1['default'].createElement(
        'button',
        { className: 'btn btn--b', onClick: closeModal },
        'Cancel'
      ),
      react_1['default'].createElement(
        'button',
        { className: 'btn btn--b btn--b-color2', onClick: requestMethod },
        'Yes'
      )
    )
  );
};
var _renderMessage = function(text, closeModal) {
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement('p', { dangerouslySetInnerHTML: { __html: text } }),
    react_1['default'].createElement(
      'div',
      { className: 'btns' },
      react_1['default'].createElement(
        'button',
        { className: 'btn btn--b btn--b-color2', onClick: closeModal },
        'Ok'
      )
    )
  );
};
exports['default'] = BlockPeopleModal;
