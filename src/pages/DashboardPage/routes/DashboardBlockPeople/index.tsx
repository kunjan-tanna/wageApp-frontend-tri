import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import NameWithAvatar from '../../../../components/NameWithAvatar';
import { currentUserGetBlockedRequest } from '../../../../modules/CurrentUser/actions';
import { blockedUsersErrorSelector, blockedUsersSelector } from '../../../../modules/CurrentUser/selectors';
import { blockPeopleModalVisibilityChange } from '../../../../modules/Modals/BlockPeople/actions';
import { IStoreState } from '../../../../store';
import GetUserName from '../../../../utils/GetUserName';
import DashboardItemHeader from '../../components/DashboardItemHeader';

import { BlockTypes } from '../../../../modules/Modals/BlockPeople/types';
import { Actions, IDispatchProps, IExternalProps, IProps } from './types';

import './styles.scss';


class DashboardBlockPeople extends Component<IProps> {

  public componentDidMount(): void {
    const { currentUserGetBlockedRequest } = this.props;

    currentUserGetBlockedRequest();
  }

  public render() {

    const { blockedUsers, error } = this.props;

    return (
      <>
        <DashboardItemHeader
          title="Blocked people"
          itemsCount={!error && blockedUsers ? blockedUsers.length : undefined}
        />
        <div className="block-people">
          <div className="dashboard__page-content-block">
            {this._renderBlockPeopleContent()}
          </div>
        </div>
      </>
    );

  }

  private _renderBlockPeopleContent = () => {

    const { error } = this.props;

    if (error) {
      return (
        <div className="row">
          <div className="no-blocked-users">
            <div className="no-blocked-users__item dashboard-card">
              <p>Cannot to display blocked users. Please try again.</p>
            </div>
          </div>
        </div>
      );
    }

    return this._renderBlockedUsers();
  };

  private _renderBlockedUsers = () => {

    const { blockedUsers, blockPeopleModalVisibilityChange } = this.props;

    return (
      blockedUsers.length > 0 ?
        <ul className="blocked-users">
          {blockedUsers.map(item => (
            <li className="blocked-users__item dashboard-card" key={item.id}>
              <NameWithAvatar user={item}/>
              <button className="btn btn--b btn--b-color"
                      onClick={() => blockPeopleModalVisibilityChange({
                        type: BlockTypes.UNBLOCK,
                        visible: true,
                        userId: item.id,
                        userName: GetUserName(item.accountType, item.firstName, item.lastName, item.businessName)
                      })}>
                Unblock
              </button>
            </li>
          ))}
        </ul>
        :
        <div className="row">
          <div className="no-blocked-users">
            <div className="no-blocked-users__item dashboard-card">
              <p>Fortunately, this is still empty</p>
            </div>
          </div>
        </div>
    );
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    blockedUsers: blockedUsersSelector(state.currentUser),
    error: blockedUsersErrorSelector(state.currentUser)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators({
      currentUserGetBlockedRequest,
      blockPeopleModalVisibilityChange
    }, dispatch)
  }
};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps)
)(DashboardBlockPeople);
