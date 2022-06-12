import { ISelectOption } from '../../types';

export const sortBy: ISelectOption[] = [
  { value: 'dateCreated', label: 'Newest first' },
  { value: 'distance', label: 'Closest' },
  { value: 'price', label: 'Price' }
];
export const sortByData: ISelectOption[] = [
  { value: 'dateCreated', label: 'Date' },
  { value: 'name', label: 'Name' },
  { value: 'city', label: 'City' },
  { value: 'price', label: 'Price' }
];
