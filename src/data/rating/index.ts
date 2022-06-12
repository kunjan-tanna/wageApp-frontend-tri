export const rating: IRatingData = {
  1: [
    'Could not complete',
    'Outside of scope',
    'Inadequate skillset',
    'No communication',
    'Poor results'
  ],
  2: [
    'Was late',
    'Unfriendly',
    'Poor results'
  ],
  3: [
    'Poor communication',
    'On time',
    'Was late',
    'Poor results',
    'Adequate results'
  ],
  4: [
    'Well done',
    'Friendly',
    'On time',
    'Communicative'
  ],
  5: [
    'Great job',
    'Super friendly',
    'On time',
    'Great communication',
    'Skilled'
  ]
};

export interface IRatingData {
  [key: string]: string[];
}