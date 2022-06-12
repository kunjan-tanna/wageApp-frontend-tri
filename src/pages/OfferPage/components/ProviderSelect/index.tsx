import React, { PureComponent } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { ApiConfig } from '../../../../config';
import { AccountTypes } from '../../../../types';
import { IProps, IProviderItem } from './types';

import './styles.scss';

class ProviderSelect extends PureComponent<IProps> {
  public render() {
    const {
      data: { list }
    } = this.props;

    return (
      <div className="provider-list">
        {this._renderHeaderRow()}
        {list.length > 0 && (
          <Scrollbars
            style={{ height: list.length === 1 ? 60 : 170 }}
            renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            renderTrackVertical={props => (
              <div
                {...props}
                className={
                  list.length > 1 ? 'track-vertical' : 'track-vertical track-vertical--hide'
                }
              />
            )}
          >
            {list.map(({ id, firstName, lastName, avatarUrl, accountType }) => {
              return (
                accountType === AccountTypes.INTERNAL &&
                this._renderRow({
                  userId: id,
                  label: `${firstName} ${lastName}`,
                  imageUrl: avatarUrl
                })
              );
            })}
          </Scrollbars>
        )}
      </div>
    );
  }

  private _renderRow = (item: IProviderItem) => {
    const { userId, imageUrl, label } = item;

    return (
      <div
        key={`provider${userId}`}
        className="provider-list__item provider-list__item--logged"
        onClick={this._selectHandler(userId)}
      >
        <div className={`provider-list__image ${!imageUrl ? 'provider-list__image--icon' : null}`}>
          {imageUrl ? (
            <img src={`${ApiConfig.URL}${imageUrl}`} alt="test" />
          ) : (
            <i className="icon icon--profile" />
          )}
        </div>
        <div className="provider-list__label">{label}</div>
      </div>
    );
  };

  private _renderHeaderRow = () => {
    return (
      <div
        className="provider-list__item provider-list__item provider-list__item--skip"
        onClick={this._selectHandler()}
      >
        <button className="btn btn--b btn--b-color">End gig now</button>
      </div>
    );
  };

  private _selectHandler = (userId?: string) => () => {
    const {
      selectHandler,
      data: { list }
    } = this.props;

    if (userId) {
      selectHandler(list.find(({ id }) => id === userId)!);
    } else {
      selectHandler();
    }
  };
}

export default ProviderSelect;
