export interface IDashboardOfferTypes {
  name: string;
  namePlural: string;
  title: string;
  countRequestLabel: string;
}

export const dashboardOfferTypes = {
  gigs: {
    namePlural: 'gigs',
    name: 'gig',
    title: 'Jobs',
    countRequestLabel: 'gig'
  } as IDashboardOfferTypes,
  services: {
    namePlural: 'services',
    name: 'service',
    title: 'Services',
    countRequestLabel: 'service'
  } as IDashboardOfferTypes
};
