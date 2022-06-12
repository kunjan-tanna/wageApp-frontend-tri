import querystring from 'querystring';

export const getSearchParamsAsObject = (params: string) => {
  return querystring.parse(params.replace(/^\?/, ''));
};

export default getSearchParamsAsObject;
