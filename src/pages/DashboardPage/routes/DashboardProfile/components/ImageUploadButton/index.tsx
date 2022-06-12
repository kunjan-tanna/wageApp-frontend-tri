import classnames from 'classnames';
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';

import { getDropzoneImagesTypes } from '../../../../../../data/static/dropzone-image-types';

import { IProps } from './types';

import './styles.scss';

class ImageUploadButton extends PureComponent<IProps> {
  public static defaultProps: Partial<IProps> = {
    caption: 'Upload'
  };

  public render() {
    const { avatarUrlPresent } = this.props;
    const dropzoneClassNames = classnames(
      'dropzone',
      { 'stretch': avatarUrlPresent }
    );

    return (
      <Dropzone accept={getDropzoneImagesTypes()} onDrop={files => this._onSelectImage(files)}>
        {({ getRootProps, getInputProps }) => (
          <section className={dropzoneClassNames}>
            <i className="icon icon--photo"/>
            <div className="dropzone__content" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropzone__button">{!avatarUrlPresent && this.props.caption}</div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }

  private _onSelectImage = (files: File[]): void => {
    if (files.length > 0) {
      this.props.onImageSelect(files[0]);
    }
  };
}

export default ImageUploadButton;
