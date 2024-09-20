import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/authApi';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import { attendanceApi } from '../services/attendanceApi';

const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    attendance : attendanceReducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, attendanceApi.middleware),
});

setupListeners(store.dispatch);

export default store;
