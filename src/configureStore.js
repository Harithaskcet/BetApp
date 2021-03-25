import  reducer  from './counter/reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { combinedSaga } from './counter/saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger]
const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducer,composedEnhancer);

let sagaTask = sagaMiddleware.run(combinedSaga);

if (module.hot) {
    module.hot.accept('./counter/reducer', () => {
      store.replaceReducer(reducer);
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(combinedSaga);
      });
    });
  }

export default store;