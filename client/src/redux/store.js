import { configureStore, combineReducers } from '@reduxjs/toolkit';
import updateMateriaReducer from './reducers/updateMateria';
import updatePanelReducer from './reducers/updatePanel';
import userReducer from './reducers/userRedux';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
  
const persistConfig = {
key: "root",
version: 1,
storage,
};

const rootReducer = combineReducers({ 
    updateM: updateMateriaReducer,
    updateP: updatePanelReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


//const store = configureStore({
//    reducer: rootReducer
//});

//export default store;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
export let persistor = persistStore(store);