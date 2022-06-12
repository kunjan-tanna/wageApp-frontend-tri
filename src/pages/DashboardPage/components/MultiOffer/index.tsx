import React, { useEffect, useState } from 'react';
import CSVReader from 'react-csv-reader';
import { useDispatch, useSelector } from 'react-redux';

import { multiOfferTemplateRequest } from '../../../../modules/MultiuploadOffers/actions';
import { multiUploadOffersSelector } from '../../../../modules/MultiuploadOffers/selectors';
import { IMultiUploadOffer } from '../../../../modules/MultiuploadOffers/types';
import { IStoreState } from '../../../../store';
import MultiOfferModal from './components/MultiOfferModal';
import MultiOfferStatusModal from './components/MultiOfferStatusModal';
import { csvParserOptions } from './constants';

const MultiOffer = () => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [loadedOffers, setOffers] = useState();
  const [fileNumber, increaseFileNumber] = useState(0);
  const [statusModalIsOpened, changeStatusModalState] = useState(false);
  const status = useSelector((state: IStoreState) => multiUploadOffersSelector(state));
  const dispatch = useDispatch();

  const handleForce = (data: IMultiUploadOffer[], fileName: string) => {
    if (!/\.(csv)$/i.test(fileName)) {
      return alert('Incorrect file format. Download template and try again.');
    }
    const correctedData = data.map(item =>
      Object.fromEntries(
        Object.entries(item).map(([k, v]) => [k.toLowerCase(), !v ? undefined : v])
      )
    );

    setOffers(correctedData);
    setFileLoaded(true);
  };

  const closeMainModal = () => {
    setFileLoaded(false);
    setOffers([]);
    increaseFileNumber(prev => prev + 1);
  };

  useEffect(() => {
    if (status.requesting) {
      changeStatusModalState(true);
    }
  }, [status]);

  return (
    <>
      <div className="multiple-offers">
        <h5>
          Add multiple <br /> gigs at one:
        </h5>
        <div className="multiple-offers__col multiple-offers__col--upload">
          <div className="multiple-offers__col__wrapper">
            <i className="multiple-offers__ico" />
            <span>Upload file</span>
          </div>
          <div className="react-file-input-container" key={fileNumber}>
            <CSVReader
              cssClass={`react-csv-input`}
              onFileLoaded={handleForce}
              parserOptions={csvParserOptions}
            />
          </div>
        </div>
        <button
          className="multiple-offers__col multiple-offers__col--download"
          onClick={() => dispatch(multiOfferTemplateRequest())}
        >
          <div className="multiple-offers__col__wrapper">
            <i className="multiple-offers__ico" />
            <span>Download template</span>
          </div>
        </button>
      </div>
      {fileLoaded && (
        <MultiOfferModal offers={loadedOffers} isOpen={true} closeModal={() => closeMainModal()} />
      )}
      {statusModalIsOpened && (
        <MultiOfferStatusModal
          status={status}
          closeModal={() => {
            closeMainModal();
            changeStatusModalState(false);
          }}
        />
      )}
    </>
  );
};

export default MultiOffer;
