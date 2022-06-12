export interface IDashboardOfferStatus {
  id: number;
  name: string;
  label: string;
}

export const offerStatuses = [
  {
    id: 0,
    name: 'pending',
    label: 'active'
  },
  {
    id: 2,
    name: 'inprogress',
    label: 'in progress'
  },
  {
    id: 1,
    name: 'completed',
    label: 'completed'
  }
];

export default offerStatuses;
