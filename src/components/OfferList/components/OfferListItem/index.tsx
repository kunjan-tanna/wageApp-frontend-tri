import './styles.scss';

import classnames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';

import { ApiConfig, Routes } from '../../../../config';
import { IOffer } from '../../../../types/offers';
import CurrencyFormat from '../../../CurrencyFormat';
import Loading from '../../../Loading';
import { IState } from './types';

export default class OfferListItem extends Component<IOffer, IState> {
  public constructor(props: IOffer) {
    super(props);

    this.state = { imgBuffering: true };
  }

  public render() {
    return this._renderItem(this.props);
  }

  private _hasWhiteSpace = (s: String) => {
    if (s.indexOf(' ') >= 0) {
      return true;
    } else {
      return false;
    }
  };

  private _renderItem = (item: IOffer) => {
    const { imgBuffering } = this.state;
    const {
      id,
      coverPhotoUrl,
      title,
      offerType,
      name,
      location,
      price,
      dateCreated,
      ownerAccountType
    } = item;
    console.log('\n\n SSSSSSS', offerType);
    const imageClassNames = classnames({ hidden: !imgBuffering || !coverPhotoUrl });
    let croppedCover = coverPhotoUrl
      ? `${ApiConfig.URL}${coverPhotoUrl}?format=jpg&quality=70&width=400`
      : `${ApiConfig.URL}${coverPhotoUrl}?format=jpg&quality=70&width=400`;
    let flag = this._hasWhiteSpace(String(coverPhotoUrl));
    if (flag) {
      croppedCover = `${ApiConfig.URL}` + escape(String(coverPhotoUrl));
      croppedCover += '?format=jpg&quality=70&width=400';
    }

    return (
      <li
        key={id}
        className={`${
          ownerAccountType === 'Business' ? 'B' : ''
        } offerList__item offerList__item--${offerType}`}
      >
        <span className={offerType === 'gig' ? 'listStatus job ' : 'listStatus worker '}>
          {offerType === 'gig' ? 'Job' : 'Worker'}
        </span>
        {/* <Link
          to={`${Routes.OFFER}/${id}/${slugify(title)}`}
          className={`offerList__item__container offerList__item__container--${ownerAccountType.toLowerCase()}`}
        > */}
        <Link
          to={`${Routes.OFFER}/${id}/${slugify(title)}`}
          className={`offerList__item__container offerList__item__container`}
        >
          <div className="offerList__item__imageContainer">
            <div className="offerList__item__badge">{offerType}</div>
            <div
              className="image-content"
              style={{
                backgroundImage: imgBuffering ? `url(${croppedCover})` : `url(${croppedCover})`
              }}
            >
              {coverPhotoUrl ? (
                <img
                  className={flag ? 'offerList__item__image_new' : 'offerList__item__image'}
                  src={croppedCover}
                  title={title}
                  alt={title}
                  onLoad={this._handleImageBuffered()}
                />
              ) : (
                <div className="offerList__item__icon">
                  <i className="icon icon--no-photo" />
                </div>
              )}
              {<Loading className={imageClassNames} />}
            </div>
          </div>
          <div className="offerList__item__content">
            <h3 className="offerList__item__title">
              <LinesEllipsis text={name} title={name} maxLine={3} className="person-title" />
              <LinesEllipsis text={title} maxLine={3} />
            </h3>
            <strong className="offerList__item__price">
              <CurrencyFormat value={price} />
            </strong>

            {location.locality && (
              <address className="offerList__item__location">
                {location.locality}, {location.stateShortName}
              </address>
            )}
            <div className="offerList__item__date">
              <span>{moment(dateCreated).format('MM/DD/YYYY')}</span>
            </div>
          </div>
        </Link>
      </li>
    );
  };

  private _handleImageBuffered = () => (): void => {
    this.setState({ imgBuffering: false });
  };
}
