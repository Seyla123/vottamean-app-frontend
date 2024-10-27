// Store Configuration
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Redux Slice Reducers
import formReducer from './slices/formSlice';
import studentReducer from './slices/studentSlice';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import teacherReducer from './slices/teacherSlice';
import classReducer from './slices/classSlice';
import subjectReducer from './slices/subjectSlice';
import uiReducer from './slices/uiSlice';

// APIs Reducers
import { authApi } from '../services/authApi';
import { classApi } from '../services/classApi';
import { attendanceApi } from '../services/attendanceApi';
import { teacherApi } from '../services/teacherApi';
import { subjectApi } from '../services/subjectApi';
import { studentApi } from '../services/studentApi';

const store = configureStore({
  reducer: {
    // Redux Slice Reducers
    ui: uiReducer,
    form: formReducer,
    student: studentReducer,
    auth: authReducer,
    teachers: teacherReducer,
    attendance: attendanceReducer,
    subjects: subjectReducer,
    classes: classReducer,

    // APIs Reducers
    [subjectApi.reducerPath]: subjectApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  // Middleware for API calls
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      attendanceApi.middleware,
      teacherApi.middleware,
      subjectApi.middleware,
      classApi.middleware,
      studentApi.middleware
    ),
});

// Persist Store
setupListeners(store.dispatch);

export default store;
