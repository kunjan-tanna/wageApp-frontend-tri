import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './styles.scss';

import c from 'classnames';
import React, { Component } from 'react';
import Slider from 'react-slick';

import { AccountTypes } from '../../types';
import Loading from '../Loading';
import { IProps, IState } from './types';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default class Gallery extends Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      initActive: true,
      loadedImages: [],
      open: false,
      url: '',
      selectedIndex: 0
    };
  }

  onOpenModal = async (url: string, index: number) => {
    await this.setState({ open: true, url: url, selectedIndex: index });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  swipe = (val: any) => {
    console.log('VVVV', val);
    this.setState({ selectedIndex: val });
  };

  public render() {
    const {
      userData: { accountType },
      items
    } = this.props;
    const { loadedImages } = this.state;

    const settings = {
      customPaging: (i: number) => {
        const loading = !loadedImages.find(img => img === items[i].id);
        const thumbClass = c('thumbnail', {
          'thumbnail--loading': loading
        });

        return (
          <>
            <div className={thumbClass}>
              <img
                src={items[i].url}
                alt="Wage"
                onLoad={() => this._markImageAsLoaded(items[i].id)}
                onClick={() => this.onOpenModal(items[i].url, i)}
              />
              {loading && <Loading className="thumbnail__loader" />}
            </div>
          </>
        );
      },
      dots: false,
      slidesToShow: 1,
      arrows: false,
      infinite: false
    };

    return (
      <>
        <Slider
          beforeChange={() => this.setState({ initActive: false })}
          className={`gallery${accountType === AccountTypes.BUSINESS ? ' gallery--business' : ''}`}
          {...settings}
        >
          {this._renderItems()}
        </Slider>
        <div className="thumbnailMain">
          {items.map((i, index, arr) => {
            const loading = !loadedImages.find(img => img === arr[index].id);
            console.log('LOA', arr[index].id, loadedImages);
            const thumbClass = c('thumbnail', {
              'thumbnail--loading': loading
            });
            return (
              <div className={thumbClass} key={index}>
                <img
                  src={i.url}
                  alt="Wage"
                  onLoad={() => this._markImageAsLoaded(arr[index].id)}
                  onClick={() => this.onOpenModal(i.url, index)}
                />
                {loading && <Loading className="thumbnail__loader" />}
              </div>
            );
          })}
        </div>
        {/* <Carousel
          showThumbs={true}
          showIndicators={false}
          swipeable={true}
          autoPlay={false}
          emulateTouch={true}
          showArrows={false}
          className="aaaaa"
          onClickThumb={(i)=>this.onOpenModal(items[i].url,i)}
          onClickItem={undefined}
        >
         {items.map(({id, mediaType, url }, index) => {
        const loading = !loadedImages.find(img => img === id);
        const itemClass = c('gallery__item', {
              'gallery__item--loading': loading
          });
  
        switch (mediaType) {
          case 'image':
            default:
              return (
              <li key={`image${id}`} className={itemClass}>
              <img
                className="gallery__item__image"
                src={`${url}?format=jpg&quality=70&width=600`}
                alt=""
                onLoad={() => this._markImageAsLoaded(id)}
              />
              {loading && <Loading />}
            </li>
            );
        }
      })}
        </Carousel> */}

        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <Carousel
            showThumbs={false}
            selectedItem={this.state.selectedIndex}
            showIndicators={false}
            swipeable={true}
            autoPlay={false}
            onChange={this.swipe}
            className="demoCss"
          >
            {items.map((i, index) => (
              <div key={index}>
                <img className="gallery__item__image" src={`${i.url}`} alt="" />
              </div>
            ))}
          </Carousel>
          {/* <Slider
          beforeChange={() => this.setState({ initActive: false })}
          className={`gallery${accountType === AccountTypes.BUSINESS ? ' gallery--business' : ''}`}
          arrows={true}
       >
          {this._renderItems()}
        </Slider> */}
        </Modal>
      </>
    );
  }

  private _markImageAsLoaded = (id: number) => {
    const { loadedImages } = this.state;

    if (loadedImages.indexOf(id) !== -1) {
      return;
    }

    return this.setState({
      loadedImages: [...loadedImages, id]
    });
  };

  private _renderItems = () => {
    const { items, offerType } = this.props;
    const { loadedImages } = this.state;
    if (items.length > 0) {
      return items.map(({ id, mediaType, url }, index) => {
        const loading = !loadedImages.find(img => img === id);
        const itemClass = c('gallery__item', {
          'gallery__item--loading': loading
        });

        switch (mediaType) {
          case 'image':
          default:
            return (
              <li key={`image${id}`} className={itemClass}>
                <span className={offerType === 'gig' ? 'listStatus job' : 'listStatus worker'}>
                  {offerType === 'gig' ? 'Job' : 'Worker'}
                </span>
                <img
                  className="gallery__item__image"
                  src={`${url}?format=jpg&quality=70&width=600`}
                  alt=""
                  onLoad={() => this._markImageAsLoaded(id)}
                />
                {loading && <Loading />}
              </li>
            );
        }
      });
    } else {
      return (
        <li className="gallery__item gallery__item--no-photo">
          <i className="icon icon--no-photo" />
        </li>
      );
    }
  };
}
