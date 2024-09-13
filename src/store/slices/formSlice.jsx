import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  gender: '',
  dob: null,
  phoneNumber: '',
  address: '',
  schoolName: '',
  schoolEmail: '',
  schoolPhone: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;
