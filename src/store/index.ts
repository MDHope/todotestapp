import {configureStore} from '@reduxjs/toolkit';
import {rootApi} from './api';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
