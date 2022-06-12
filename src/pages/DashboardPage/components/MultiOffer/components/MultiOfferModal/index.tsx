import './styles.scss';

import { FieldArray, Formik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollArea from 'react-scrollbar';
import * as yup from 'yup';

import ErrorTooltip from '../../../../../../components/ErrorTooltip';
import ModalAlternative from '../../../../../../components/ModalAlternative';
import CategorySelect from '../../../../../../components/OfferModifyForm/components/CategorySelect';
import FileUploader from '../../../../../../components/OfferModifyForm/components/FileUpload';
import InputLabelWrapper from '../../../../../../components/OfferModifyForm/components/InputLabel';
import { currentUserSelector } from '../../../../../../modules/CurrentUser/selectors';
import { offerFormUploadReset } from '../../../../../../modules/FileUpload/actions';
import { multiOfferRequest } from '../../../../../../modules/MultiuploadOffers/actions';
import { IFormValues, IOffer } from '../../../../../../modules/MultiuploadOffers/types';
import { IStoreState } from '../../../../../../store';
import { renderFormMessages } from '../../../../../../utils/form';
import offerValidation from '../../../../../../utils/validation/offer';
import { IProps } from './types';

const initialValues: IFormValues = {
  categoryId: undefined,
  media: '',
  offers: []
};

const { categoryId, media, title, description, price } = offerValidation;
const validationSchema: any = yup.object().shape({
  categoryId,
  media,
  offers: yup.array().of(
    yup.object().shape({
      title,
      description,
      price
    })
  )
});

const MultiOfferModal = (props: IProps) => {
  const { offers, isOpen, closeModal } = props;
  initialValues.offers = offers;
  const dispatch = useDispatch();
  const location = useSelector(
    (state: IStoreState) => currentUserSelector(state.currentUser).businessAddressCity
  );

  const multiOfferCallback = useCallback(
    (values: IFormValues, actions: any) =>
      dispatch(
        multiOfferRequest({
          values,
          actions
        })
      ),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(offerFormUploadReset());
    };
  }, [dispatch]);

  return (
    <ModalAlternative isOpen={isOpen} extraClass="multiple-offer-page">
      <div className="multiple-offer-page__header">
        <h2>Add gigs</h2>
        <button className="btn-close" onClick={closeModal}>
          <i className="icon icon--close-gray" />
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={multiOfferCallback}
        render={({
          values,
          errors,
          status,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }) => (
          <>
            {status && renderFormMessages(status)}
            <form onSubmit={handleSubmit}>
              <div className="multi-offer__form__header">
                <CategorySelect
                  setFieldValue={setFieldValue}
                  error={errors.categoryId}
                  touched={touched.categoryId}
                  value={values.categoryId}
                  defaultCategoryName="Business Ads"
                />
                <InputLabelWrapper labelText="Photos">
                  <FileUploader
                    error={errors.media}
                    touched={touched.media}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </InputLabelWrapper>
                <div className="offer-info">
                  <div className="offer-info__data">
                    All records: <span>{offers ? offers.length : 0}</span>
                  </div>
                  <div className="offer-info__data">
                    Location for all: <span>{location}</span>
                  </div>
                </div>
              </div>
              <div className="multi-offer-page__form__content">
                {errors?.offers && (
                  <p className="error">Some error occured in offers validation.</p>
                )}
                <div className="multi-offer__caption">
                  <div className="col-number">No</div>
                  <div className="col-title">Title</div>
                  <div className="col-desc">Description</div>
                  <div className="col-price">Price</div>
                </div>
                <div className="multi-offer__list">
                  <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                  >
                    <FieldArray
                      name="offers"
                      render={() =>
                        values.offers.map((offer: IOffer, index: number) => {
                          const error =
                            errors?.offers && errors?.offers?.[index] ? errors.offers[index] : {};
                          return (
                            <label key={`${offer.title}-${index}`} className="multi-offer__label">
                              <div className="multi-offer__number col-number">{index + 1}</div>
                              <div className="multi-offer__title col-title">
                                {offer.title}
                                {error && error?.title && <ErrorTooltip message={error.title} />}
                              </div>
                              <div className="multi-offer__description col-desc">
                                {offer.description}
                                {error && error?.description && (
                                  <ErrorTooltip message={error.description} />
                                )}
                              </div>
                              <div className="multi-offer__price col-price">
                                {offer.price ? '$ ' + offer.price : 'Negotiable price'}
                                {error && error?.price && (
                                  <ErrorTooltip message={error.price} position="right" />
                                )}
                              </div>
                            </label>
                          );
                        })
                      }
                    />
                  </ScrollArea>
                </div>
              </div>
              <nav className="multi-offer__nav">
                <button className="btn btn--b" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn--a" type="submit" disabled={isSubmitting}>
                  Import
                </button>
              </nav>
            </form>
          </>
        )}
      />
    </ModalAlternative>
  );
};

export default MultiOfferModal;
