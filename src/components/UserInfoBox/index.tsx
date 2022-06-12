import './styles.scss';

import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ApiConfig, Routes } from '../../config';
import { BlockTypes } from '../../modules/Modals/BlockPeople/types';
import { AccountTypes } from '../../types';
import GetUserName from '../../utils/GetUserName';
import { PHONE_MAX_CHAR } from '../../utils/validation/basic-phone-validation';
import DisplayOnlyForLogged from '../DisplayOnlyForLogged';
import MoreOptions from '../MoreOptions';
import PhoneFormatter from '../PhoneFormatter';
import RaterButton from '../RaterButton';
import { IRaterProps } from '../RaterButton/types';
import { IProps } from './types';
import wrapWithHTTP from '../../utils/WrapWithHTTP';
import InputFieldAlternative from '../../components/InputFieldAlternative';

class UserInfoBox extends Component<IProps> {
  public render() {
    const {
      id,
      businessName,
      firstName,
      lastName,
      avatarUrl,
      rating,
      ratingCount,
      verifiedBy,
      accountType,
      joinedDate,
      businessAddressCity,
      businessAddressStreet,
      businessPhoneNumber,
      businessWebAddress
    } = this.props.userData;
    const name =
      accountType === AccountTypes.BUSINESS && businessName
        ? businessName
        : `${firstName} ${lastName}`;
    const showRating = accountType === AccountTypes.INTERNAL && ratingCount > 0;

    const { ownerId, currentUserId, showBusinessDetails, visibleViewButton } = this.props;

    const rater: IRaterProps = {
      rating,
      interactive: false
    };

    return (
      <div className="user-info user-info--with-more-options">
        {currentUserId !== ownerId && this._renderMoreOptions()}
        <div
          className={`user-info__avatar${avatarUrl ? ' user-info__avatar--is-photo' : ''}${
            accountType === AccountTypes.BUSINESS ? ' user-info__avatar--business' : ''
          }`}
        >
          {avatarUrl ? (
            <img src={`${ApiConfig.URL}${avatarUrl}?format=jpg&quality=70&width=100`} alt={name} />
          ) : (
            <i className="icon icon--profile-color" />
          )}
        </div>

        <div className="user-info__verified-name viewPro">
          {name.length > 18 && !window.location.pathname.includes('/offer/') ? (
            <>
              {console.log('\n\n LLLL', window.location.pathname)}
              <h3 className="user__name mFirstName" title={name.toUpperCase()}>
                {firstName}
              </h3>
              <h3 className="user__name mLastName" title={name.toUpperCase()}>
                {lastName}
              </h3>
            </>
          ) : (
            <h3 className="user-info__name">
              <Link to={`${Routes.USER_PROFILE}/${id}`}>{name}</Link>
            </h3>
          )}
          {verifiedBy && (
            <div className="user-info__verified">
              <i className="icon icon--verified" />
              Verified by {verifiedBy}
            </div>
          )}

          {showRating && (
            <div className="user-info__rating">
              <RaterButton rater={rater} />
            </div>
          )}
        </div>

        {joinedDate && (
          <div className="user-info__details">Joined {moment(joinedDate).format('MMM YYYY')}</div>
        )}
        {accountType === AccountTypes.BUSINESS && showBusinessDetails && (
          <div className="user-info__business-data">
            {(businessAddressStreet || businessAddressCity) && (
              <p>
                <strong>Address:</strong> {businessAddressStreet}
                {businessAddressStreet && businessAddressCity ? ', ' : ''}
                {businessAddressCity}
              </p>
            )}
            {businessPhoneNumber && (
              <p>
                <strong>Phone:</strong>{' '}
                <PhoneFormatter value={businessPhoneNumber?.substring(0, PHONE_MAX_CHAR)} />
              </p>
            )}
            {businessWebAddress && (
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={wrapWithHTTP(businessWebAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {businessWebAddress}
                </a>
              </p>
            )}
          </div>
        )}
        {visibleViewButton ? (
          <div className="viewBtn">
            <Link to={`${Routes.USER_PROFILE}/${id}`}>View</Link>
          </div>
        ) : null}
      </div>
    );
  }

  private _renderMoreOptions = () => {
    const {
      userData: { id, accountType, isBlocked, firstName, lastName, businessName },
      blockModalVisibilityChange
    } = this.props;

    return (
      <DisplayOnlyForLogged>
        <MoreOptions
          items={[
            {
              label: isBlocked ? 'Unblock user' : 'Block user',
              iconName: 'block-red',
              method: () =>
                blockModalVisibilityChange({
                  type: isBlocked ? BlockTypes.UNBLOCK : BlockTypes.BLOCK,
                  visible: true,
                  userId: id,
                  userName: GetUserName(accountType, firstName, lastName, businessName)
                })
            }
          ]}
        />
      </DisplayOnlyForLogged>
    );
  };
}

export default UserInfoBox;
