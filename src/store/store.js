import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/authApi';
import { classApi } from '../services/classApi';
import { attendanceApi } from '../services/attendanceApi';
import { teacherApi } from '../services/teacherApi';
import { subjectApi } from '../services/subjectApi';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import teacherReducer from './slices/teacherSlice';
import classReducer from './slices/classSlice';
import subjectReducer from './slices/subjectSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    form: formReducer,
    auth: authReducer,
    teachers: teacherReducer,
    attendance: attendanceReducer,
    subjects: subjectReducer,
    classes: classReducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      attendanceApi.middleware,
      teacherApi.middleware,
      subjectApi.middleware,
      classApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
