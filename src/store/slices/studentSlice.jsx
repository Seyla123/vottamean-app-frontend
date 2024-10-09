import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photo: '',
  first_name: '',
  last_name: '',
  class_id: '',
  gender: '',
  dob: '',
  phone_number: '',
  address: '',
  guardian_first_name: '',
  guardian_last_name: '',
  guardian_relationship: '',
  guardian_email: '',
  guardian_phone_number: '',
};

export const studentFormSlice = createSlice({
  name: 'studentForm',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { updateFormData, resetFormData } = studentFormSlice.actions;

export default studentFormSlice.reducer;
