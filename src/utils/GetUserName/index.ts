import { AccountType, AccountTypes, Nullable } from '../../types';

const GetUserName = (accountType: AccountType, firstName: string, lastName: string, businessName: Nullable<string>) => {
  return accountType === AccountTypes.BUSINESS ? `${businessName}` : `${firstName} ${lastName}`;
};

export default GetUserName;