// rootSaga.js
import { all } from 'redux-saga/effects';
import { watchPostRequest } from './sagas';

export default function* rootSaga() {
  yield all([
    watchPostRequest(),
    // Add other sagas here if needed
  ]);
}
