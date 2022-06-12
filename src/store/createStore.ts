import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

export default (rootReducer: any, rootSaga: any) => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currentUser']
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({});

  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
