import React, { Component, SyntheticEvent } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import generateUUID from 'uuid/v4';

import Loading from '../../../../components/Loading';
import {
  dropzoneImagesTypes,
  getDropzoneImagesTypes
} from '../../../../data/static/dropzone-image-types';
import {
  Actions,
  offerFormFileRemove,
  offerFormUploadRequest
} from '../../../../modules/FileUpload/actions';
import {
  selectAllUploadedFiles,
  selectReadyUploadedFiles
} from '../../../../modules/FileUpload/selectors';
import { ISingleFile } from '../../../../modules/FileUpload/types';
import { IStoreState } from '../../../../store';
import { MAX_NUMBER_OF_IMAGES } from '../../../../utils/validation/offer';
import { IDispatchProps } from './types';
import { IExternalProps, IProps, IState } from './types';

import './styles.scss';
import Modal from 'react-responsive-modal';

class FileUploader extends Component<IProps> {
  state = {
    open: false,
    image: ''
  };
  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    const { readyFiles, setFieldValue } = this.props;

    if (prevProps.readyFiles !== readyFiles) {
      setFieldValue('media', readyFiles.map(item => item.data!.id).join(','));
    }
  }

  public render() {
    const { allFiles, error, touched } = this.props;

    return (
      <>
        <Dropzone
          accept={getDropzoneImagesTypes()}
          onDrop={this._onDrop}
          onDropRejected={this._onDropRejected}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="file-uploader">
              <div className="file-uploader__dropzone" {...getRootProps()}>
                <input className="file-uploader__hidden-input" {...getInputProps()} />
                {allFiles.length > 0 ? (
                  <ul className="uploaded-files">
                    {this._renderFiles(allFiles)}
                    {allFiles.length < MAX_NUMBER_OF_IMAGES && (
                      <li className="uploaded-files__item uploaded-files__item--next">
                        Add <strong>next photo</strong>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="file-uploader__no-files">
                    <span>
                      {/* Drop images related to Task here */}
                      {this.props.textTitle}
                      <br />
                      or
                    </span>
                    <button className="btn btn--b">Browse</button>
                  </div>
                )}
              </div>
              {error && touched && <div className="validation-error">{error}</div>}
            </div>
          )}
        </Dropzone>
        <div style={{ top: '-50px' }}>
          <Modal open={this.state.open} onClose={() => this.closeModal()}>
            <div>
              <img src={this.state.image} width="500"></img>
            </div>
          </Modal>
        </div>
      </>
    );
  }

  closeModal = () => {
    this.setState({ open: false });
  };

  private _onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.map(item => {
      const { uploadFile, setFieldTouched } = this.props;
      setFieldTouched('media', true);

      return uploadFile({ tempId: generateUUID(), file: item });
    });
  };

  private _onDropRejected = (rejectedFiles: File[]) => {
    rejectedFiles.map(item => {
      if (!dropzoneImagesTypes.includes(item.type)) {
        return alert('Unavailable extension!');
      } else {
        return alert('File rejected.');
      }
    });
  };

  private _renderFiles = (files: ISingleFile[]) => {
    return files.map(file => (
      <li
        className="uploaded-files__item crsrP"
        style={{ backgroundImage: file.data ? `url(${file.data.url})` : '' }}
        key={`file-${file.tempId}`}
        onClick={ev => this._openFile(ev, file)}
      >
        <button
          type="button"
          title="Remove image"
          className="remove-file"
          onClick={ev => this._removeFile(ev, file.tempId)}
        />
        {/* <button
          type="button"
          title="Enlarge image"
          className="remove-file2"
          onClick={ev => this._openFile(ev, file)}
        >
          <i className="fa fa-expand" aria-hidden="true"></i>
        </button> */}
        {/* <i className="fa fa-expand" aria-hidden="true" onClick={ev => this._openFile(ev,file)}></i> */}

        {file.requesting && <Loading />}
        {file.error && !file.requesting && (
          <span>
            <i className="icon icon--warning" />
            Error
          </span>
        )}
      </li>
    ));
  };

  private _openFile = (ev: SyntheticEvent, file: any) => {
    const { setFieldTouched } = this.props;
    ev.stopPropagation();
    setFieldTouched('media', true);
    this.setState({
      open: true,
      image: file.data.url
    });
  };

  private _removeFile = (ev: SyntheticEvent, tempId: string) => {
    const { setFieldTouched } = this.props;

    ev.stopPropagation();
    setFieldTouched('media', true);

    return this.props.removeFile({ tempId });
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    allFiles: selectAllUploadedFiles(state.fileUpload),
    readyFiles: selectReadyUploadedFiles(state.fileUpload)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        removeFile: offerFormFileRemove,
        uploadFile: offerFormUploadRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(FileUploader);
