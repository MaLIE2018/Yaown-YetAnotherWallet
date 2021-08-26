import { createStore, StoreEnhancer } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};
const isReduxDevtoolsExtensionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return "__REDUX_DEVTOOLS_EXTENSION__" in arg;
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const storePersist = () => {
  const store = createStore<any, any, any, any>(
    persistedReducer,
    isReduxDevtoolsExtensionExist(window)
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

const { store, persistor } = storePersist();

export { store, persistor };
