import React, { Component, ReactNode } from 'react';
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';
import { IProps } from './types';

import './styles.scss';
import { VideoTypes } from './video-types';

class VideoModal extends Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
  };


  public handleEsc = (event: KeyboardEvent) => {

    const { closeModal } = this.props;

    if (event.keyCode === 27) {
      return closeModal();
    }
  };

  public componentDidMount() {
    document.addEventListener('keydown', this.handleEsc, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc, false);
  }

  public render() {
    const { isOpen, closeModal } = this.props;
    return (

      <ReactModal className="video-modal" overlayClassName="video-modal-overlay" isOpen={isOpen}>
        <button className="video-modal__close" onClick={closeModal}><i className="icon icon--close"/></button>
        {this._renderVideo()}
      </ReactModal>
    );
  }

  private _renderVideo = (): ReactNode => {
    const { videoType, videoUrl, closeModal } = this.props;
    switch (videoType) {
      case VideoTypes.VIMEO:
        return <ReactPlayer url={videoUrl} onEnded={closeModal} playing={true} vimeo={true} width="100%" height="100%"/>;
      case VideoTypes.YOUTUBE:
        return <ReactPlayer url={videoUrl} onEnded={closeModal} playing={true} youtube={true} width="100%"
                            height="100%"/>;
      default:
        return <ReactPlayer url={videoUrl} onEnded={closeModal} playing={true} width="100%" height="100%"/>;
    }
  };
}

export default VideoModal;
