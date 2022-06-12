import { useEffect } from 'react';
import { withRouter } from 'react-router';
import scrollToElement from 'scroll-to-element';

const ScrollToTop = (parameters: any) => {
  const {
    children,
    location: { pathname }
  } = parameters;

  useEffect(() => {
    scrollToElement('#root', {
      offset: 0,
      duration: 10
    });
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
