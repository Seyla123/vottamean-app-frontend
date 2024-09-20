import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/authApi';
import { classApi } from '../services/classApi';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import { attendanceApi } from '../services/attendanceApi';
import { teacherApi } from '../services/teacherApi';
import teacherReducer from './slices/teacherSlice';
import uiReducer from './slices/uiSlice';
import classReducer from './slices/classSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    ui:uiReducer,
    form: formReducer,
    auth: authReducer,
<<<<<<< HEAD
    teachers: teacherReducer, 
    attendance: attendanceReducer,
    classes: classReducer,
    [classApi.reducerPath]: classApi.reducer,
=======
    attendance : attendanceReducer,
    classes: classReducer,
    ui: uiReducer,
>>>>>>> cd8235e (feature: Done on using ui slice in ClassList)
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, attendanceApi.middleware, teacherApi.middleware,classApi.middleware),
});

setupListeners(store.dispatch);

export default store;
