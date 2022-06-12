import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton
} from 'react-share';

import { IProps } from './types';

import { ApiConfig, Routes, WebConfig } from '../../config';

import './styles.scss';
import { mixPanelEvent } from '../../utils/MixPanel';

const Socials = (props: IProps) => {
  const {
    offer: { title, id, coverPhotoUrl, description, offerType, type }
  } = props;
  const offerUrl = `${'https://wageapp.io'}${Routes.OFFER}/${id}/${title
    .trim()
    .replace(/\s/g, '-')
    .toLowerCase()}`;
  console.log('offerUUUU', offerUrl);
  console.log('OFFER TYPE', offerType, type);

  let eventName = offerType
    ? offerType[0].toUpperCase() + offerType.slice(1)
    : type
    ? type[0].toUpperCase() + type.slice(1)
    : 'Offer shared';
  return (
    <ul className="socials">
      <li className="socials__item">
        <FacebookShareButton
          url={offerUrl}
          quote={`I just did ${title}! Check out Wage if you are looking for side gigs.`}
          onShareWindowClose={() => {
            mixPanelEvent(`${eventName} shared`, {
              'Social share': 'Facebook'
            });
          }}
        >
          <i className="icon icon--facebook" />
        </FacebookShareButton>
      </li>
      <li className="socials__item">
        <TwitterShareButton
          url={offerUrl}
          title={`I just did ${title}! Check out Wage if you are looking for side gigs.`}
          onShareWindowClose={() => {
            mixPanelEvent(`${eventName} shared`, {
              'Social share': 'Twitter'
            });
          }}
        >
          <i className="icon icon--twitter" />
        </TwitterShareButton>
      </li>
      <li className="socials__item">
        <PinterestShareButton
          url={offerUrl}
          media={coverPhotoUrl ? `${ApiConfig.URL}${coverPhotoUrl}` : ''}
          onShareWindowClose={() => {
            mixPanelEvent(`${eventName} shared`, {
              'Social share': 'Pinterest'
            });
          }}
        >
          <i className="icon icon--pinterest" />
        </PinterestShareButton>
      </li>
      <li
        className="socials__item"
        onClick={() => {
          mixPanelEvent(`${eventName} shared`, {
            'Social share': 'Email'
          });
        }}
      >
        <EmailShareButton
          url={offerUrl}
          subject={title}
          body={`${description.slice(0, 160)}...`}
          onShareWindowClose={() => {
            mixPanelEvent(`${eventName} shared`, {
              'Social share': 'Email'
            });
          }}
        >
          <i className="icon icon--email-color" />
        </EmailShareButton>
      </li>
    </ul>
  );
};

export default Socials;
