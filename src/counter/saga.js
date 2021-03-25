
import {
    first,
    setPlayers,
    setPlayersList,
} from './types';
import {
    select,
    takeEvery,
    all,
    call,
    // fork,
    put,
  } from 'redux-saga/effects';
import { callGet } from '../services/Api';
 
function* exampleSaga() {
    console.log("Example saga reached");
  }

  function* getPlayers() {
    try{
        const response = yield call(callGet, 'http://localhost:8080/api/getAllUsers');
        yield put({
            type: setPlayersList,
            payload: response
        })
    }
    catch(e) {
        console.log(e);
    }
  }


  function* watchFirstVisit() {
    yield takeEvery(first, exampleSaga);
  }

  function* watchSetPlayers() {
      yield takeEvery(setPlayers, getPlayers);
  }

  export const combinedSaga = function* combinedSaga() {
    yield all([
      watchFirstVisit(),
      watchSetPlayers(),
    ]);
  };