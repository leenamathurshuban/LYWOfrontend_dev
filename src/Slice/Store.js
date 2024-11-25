// import { configureStore } from '@reduxjs/toolkit';
// import loginSlice from './Login/LoginSlice'

// export const store = configureStore({
//   reducer: {
//     login: loginSlice
//   },
// });



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default local storage
import { combineReducers } from 'redux'; // To combine reducers
import loginSlice from './Login/LoginSlice'; // Your login slice

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage, // Use local storage by default
};

// Combine reducers (you can add other reducers here if needed)
const rootReducer = combineReducers({
  login: loginSlice,
});

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
});

const persistor = persistStore(store);

export { store, persistor };
