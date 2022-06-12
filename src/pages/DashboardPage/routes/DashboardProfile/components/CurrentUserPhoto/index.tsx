import classnames from 'classnames';
import React, { PureComponent } from 'react';

import Loading from '../../../../../../components/Loading';

import { ApiConfig } from '../../../../../../config';
import ImageUploadButton from '../ImageUploadButton';
import { IProps, IState } from './types';

import './styles.scss';

class CurrentUserPhoto extends PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      imgBuffering: !!this.props.avatarUrl
    };
  }

  public render() {
    const { avatarUrl, avatarRequesting, avatarError } = this.props;
    const photoClassNames = classnames('photo__container', {
      loading: this.state.imgBuffering || avatarRequesting
    });

    return (
      <div className={`photo${avatarUrl ? ' photo--is-avatar' : ''}`}>
        <div className="photo__layer">
          <i className="icon icon--cam" />
          <span>Upload</span>
        </div>
        <div className={photoClassNames}>
          {avatarUrl && (
            <img src={`${ApiConfig.URL}${avatarUrl}`} onLoad={this._handleImageBuffered()} alt="" />
          )}
          {(this.state.imgBuffering || avatarRequesting) && !avatarError && <Loading />}
          <ImageUploadButton
            avatarUrlPresent={!!avatarUrl}
            onImageSelect={this._onImageSelect}
            caption="Select photo"
          />
        </div>
        {avatarError && (
          <div className="photo__error-info">
            Error ocurred during uploading avatar Please try again
          </div>
        )}
      </div>
    );
  }

  private _onImageSelect = (file: File): void => {
    this.setState({ imgBuffering: true });
    this.props.onImageSelect(file);
  };

  private _handleImageBuffered = () => (): void => {
    this.setState({ imgBuffering: false });
  };
}

export default CurrentUserPhoto;
