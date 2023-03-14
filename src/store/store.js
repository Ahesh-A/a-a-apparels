import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { persistReducer, persistStore } from "redux-persist";
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
const persistConfig = {
  key: "root",
  storage,
  whilelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter(Boolean);

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
