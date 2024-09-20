import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/authApi';
import { classApi } from '../services/classApi';
import formReducer from './slices/formSlice';
import authReducer from './slices/authSlice';
import attendanceReducer from './slices/attendanceSlice';
import { attendanceApi } from '../services/attendanceApi';
<<<<<<< HEAD
import { teacherApi } from '../services/teacherApi';
import teacherReducer from './slices/teacherSlice';
import uiReducer from './slices/uiSlice';
=======
import classReducer from './slices/classSlice';
>>>>>>> a7df0ed (feature: rebase develop into class-fetch api)

const store = configureStore({
  reducer: {
    ui:uiReducer,
    form: formReducer,
    auth: authReducer,
    teachers: teacherReducer, 
    attendance: attendanceReducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    class: classReducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    class: classReducer,
    [authApi.reducerPath]: authApi.reducer,
<<<<<<< HEAD
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, attendanceApi.middleware, teacherApi.middleware),
=======
    [classApi.reducerPath]: classApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, attendanceApi.middleware,classApi.middleware),
>>>>>>> a7df0ed (feature: rebase develop into class-fetch api)
});

setupListeners(store.dispatch);

export default store;
