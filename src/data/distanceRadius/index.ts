import { IDistanceSelectOption } from '../../types';

export const distance: IDistanceSelectOption[] = [
  { value: 5, label: 'within 5 mi', distanceIndex: 0 },
  { value: 10, label: 'within 10 mi', distanceIndex: 1 },
  { value: 20, label: 'within 20 mi', distanceIndex: 2 },
  { value: 30, label: 'within 30 mi', distanceIndex: 3 },
  { value: 50, label: 'within 50 mi', distanceIndex: 4 }
];

export const defaultDistanceValue = distance.find(item => item.distanceIndex === 1)?.value;
