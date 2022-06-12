import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { signalRConnectionRequest, signalRConnectionStopRequest } from '../../modules/Chat/actions';
import { IProps } from './types';

const SignalRConnector: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signalRConnectionRequest());
    return () => {
      dispatch(signalRConnectionStopRequest());
    };
  }, [dispatch]);

  return null;
};

export default SignalRConnector;
