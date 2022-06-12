import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { Routes } from '../../config';
import { blockPeopleModalVisibilityChange } from '../../modules/Modals/BlockPeople/actions';
import { getUserRequest } from '../../modules/User/actions';
import {
  isErrorSelector as userErrorSelector,
  isRequestingSelector as userRequestingSelector,
  userSelector
} from '../../modules/User/selectors';
import { userOffersRequest } from '../../modules/UserOffers/actions';
import {
  isErrorSelector as userOffersErrorSelector,
  isRequestingSelector as userOffersRequestingSelector,
  userOffersSelector
} from '../../modules/UserOffers/selectors';
import { IStoreState } from '../../store';
import { currentUserPersonalDataSelector } from '../DashboardPage/routes/DashboardProfile/selectors';
import UserProfilePage from './page';
import { Actions, IDispatchProps, IExternalProps, IProps } from './types';

class UserProfilePageContainer extends Component<IProps> {
  public componentDidMount(): void {
    const {
      getUserRequest,
      match: {
        params: { userId }
      }
    } = this.props;

    getUserRequest({
      userId
    });
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { userError, history } = this.props;

    if (userError) {
      history.push(Routes.ERROR_404);
    }
  }

  public render() {
    const {
      blockPeopleModalVisibilityChange,
      user,
      userOffersRequest,
      userOffersError,
      userOffersRequesting,
      userRequesting,
      userOffers,
      currentUser
    } = this.props;

    return (
      <UserProfilePage
        currentUserId={currentUser.id}
        user={user}
        accountType={user.accountType}
        userRequesting={userRequesting}
        userOffersRequest={userOffersRequest}
        userOffersError={userOffersError}
        userOffersRequesting={userOffersRequesting}
        userOffers={userOffers}
        blockModalVisibilityChange={blockPeopleModalVisibilityChange}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        getUserRequest,
        userOffersRequest,
        blockPeopleModalVisibilityChange
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: userSelector(state.user),
    userRequesting: userRequestingSelector(state.user),
    userError: userErrorSelector(state.user),
    userOffersRequesting: userOffersRequestingSelector(state.userOffers),
    userOffersError: userOffersErrorSelector(state.userOffers),
    userOffers: userOffersSelector(state.userOffers),
    currentUser: currentUserPersonalDataSelector(state.currentUser)
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(UserProfilePageContainer);
