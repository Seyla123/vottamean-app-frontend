import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  class_name: '',
  description: '',
};

export const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    updateClassData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetClassData: () => initialState,
  },
});

export const { updateClassData, resetClassData, createClassData } =
  classSlice.actions;

export default classSlice.reducer;
