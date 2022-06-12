interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  avatarUrl: string;
  accountType: string;
}

export interface IProps {
  user: Partial<IUser>;
}
