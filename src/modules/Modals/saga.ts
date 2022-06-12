import { all } from 'redux-saga/effects';

import BlockPeopleSaga from './BlockPeople/saga';

export default function* modalsSaga() {
  yield all([
    BlockPeopleSaga()
  ]);
}