export interface IFAQ {
  category: string;
  data: IFAQItem[];
}

export interface IFAQItem {
  question: string;
  answer: string;
};

export interface IFeatureItem {
  name: string;
  description: string;
  icon: string;
};