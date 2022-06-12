import * as yup from 'yup';

export const MAX_NUMBER_OF_IMAGES = 6;

const numberOfImagesValidation = (): [string, string, (value: string) => boolean] => [
  'number-of-images-validation',
  `Can upload maximum ${MAX_NUMBER_OF_IMAGES} images`,
  (value: string) => (value ? value.split(',').length <= MAX_NUMBER_OF_IMAGES : false)
];

const offerValidation = {
  title: yup
    .string()
    .max(22)
    .matches(/^[0-9a-zA-Z\s]+$/, 'Should contain only letters and numbers')
    .required()
    .label('Task name'),
  categoryId: yup
    .mixed()
    .required('Select category')
    .label('Category'),
  description: yup
    .string()
    .max(500)
    .label('Description'),
  price: yup
    .number()
    .min(1)
    .max(999999)
    .typeError('Price is empty or incorrect format')
    .positive()
    .integer('Please provide number without decimal')
    .label('Price'),
  media: yup
    .string()
    .required('Choose photos')
    .test(...numberOfImagesValidation()),
  lat: yup.number(),
  lng: yup.mixed().notOneOf([yup.ref('lat')])
};

export default offerValidation;
