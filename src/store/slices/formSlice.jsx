import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  dob: '',
  first_name: '',
  last_name: '',
  gender: '',
  phone_number: '',
  address: '',
  photo: '',
  school_name: '',
  school_address: '',
  school_phone_number: '',
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
