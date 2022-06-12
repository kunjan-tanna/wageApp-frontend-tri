import React, { Component } from 'react';

import StaticContentHeader from '../../components/StaticContentItemHeader';
import { IProps, IState } from './types';

import VideoModal from '../../../../components/VideoModal';
import aboutData from '../../../../data/static/about';
import img from '../../../../styles/images/img.jpg';

import { VideoTypes } from '../../../../components/VideoModal/video-types';
import { introductionVideoUrl, tutorialVideoUrl } from '../../../../data/static/video-urls';
import './styles.scss';

class About extends Component<IProps, IState> {
  public static defaultState: IState = {
    videoModalOpened: false,
    videoUrl: ''
  }

  public constructor(props: IProps) {
    super(props);
    this.state = { ...About.defaultState };
  }

  public render() {
    const { videoModalOpened, videoUrl } = this.state;

    return (
      <>
        <StaticContentHeader title="About app"/>
        <div className="about-app">
          <div className="about-app__text">
            <div dangerouslySetInnerHTML={{ __html: aboutData }}/>
            <button className="btn btn--b" onClick={this._openIntroductionModal}>Watch Video</button>
            <button className="btn btn--b btn--b-color" onClick={this._openTutorialModal}>Watch tutorial</button>
          </div>
          <div className="about-app__photo">
            <img src={img} alt="About us"/>
          </div>
        </div>
        <VideoModal
          videoType={VideoTypes.VIMEO}
          videoUrl={videoUrl}
          closeModal={this._closeModal}
          isOpen={videoModalOpened}/>
      </>
    );
  };

  private _openIntroductionModal = (): void => {
    window.addEventListener('scroll', this._disableScroll);
    this.setState({ videoModalOpened: true, videoUrl: introductionVideoUrl })
  }

  private _openTutorialModal = (): void => {
    window.addEventListener('scroll', this._disableScroll);
    this.setState({ videoModalOpened: true, videoUrl: tutorialVideoUrl })
  }

  private _closeModal = (): void => {
    window.removeEventListener('scroll', this._disableScroll);
    this.setState({ videoModalOpened: false });
  }

  private _disableScroll = (): void => {
    window.scrollTo(0, 0);
  }
}

export default About;
