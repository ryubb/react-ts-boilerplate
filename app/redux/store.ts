import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import rootMiddleware from "./rootMiddleware";

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare let window: ExtendedWindow;

// Store
const configureStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [
    sagaMiddleware,
    routerMiddleware(history),
    ...rootMiddleware,
  ];
  const enhancers = [applyMiddleware(...middleWares)];

  const composeEnhancers =
    process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga, history);
  return store;
};

export default configureStore;
