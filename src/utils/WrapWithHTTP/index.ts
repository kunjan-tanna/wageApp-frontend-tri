export default (websiteUrl: string) => {
  const includesProtocol = /^(http|https)/;

  return includesProtocol.test(websiteUrl) ? websiteUrl : `http://${websiteUrl}`;
};
