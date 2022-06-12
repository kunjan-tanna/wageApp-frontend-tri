export default (websiteUrl: string) => {

  const url = websiteUrl.toLowerCase();

  if (url.includes('https') || url.includes('http') || url.includes('www.') || url.includes('://')) {
    return true;
  }

  return false;
}
