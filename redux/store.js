import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleware = [thunk];
const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

const composeEnhancer =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancer(applyMiddleware(...middleware));

const persistConfig = {
  key: "main-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);
const Persistor = persistStore(store);
export { Persistor };
export default store;
