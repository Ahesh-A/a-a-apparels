import { compose, createStore, applyMiddleware, Middleware} from "redux";

import logger from 'redux-logger';

import { persistReducer, persistStore, PersistConfig} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

// const loggerMiddleWare = (store) => (next) => (action) => {
//   if (!action.type) return next(action);

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);
//   console.log("nextState: ", store.getState());
// };
export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig  = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
