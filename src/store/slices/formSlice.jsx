import { Description } from '@mui/icons-material';
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
  school_name: '',
  school_address: '',
  school_phone_number: '',
  class_name: '',
  Description:'',
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
