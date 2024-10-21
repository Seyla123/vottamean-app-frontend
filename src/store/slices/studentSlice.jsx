// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   photo: '',
//   first_name: '',
//   last_name: '',
//   class_id: '',
//   gender: '',
//   dob: '',
//   phone_number: '',
//   address: '',
//   guardian_first_name: '',
//   guardian_last_name: '',
//   guardian_relationship: '',
//   guardian_email: '',
//   guardian_phone_number: '',
// };

// export const studentFormSlice = createSlice({
//   name: 'studentForm',
//   initialState,
//   reducers: {
//     updateFormData: (state, action) => {
//       return { ...state, ...action.payload };
//     },
//     resetFormData: () => initialState,
//   },
// });

// export const { updateFormData, resetFormData } = studentFormSlice.actions;

// export default studentFormSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { studentApi } from "../../services/studentApi"; // Assuming you have a studentApi service

const studentSlice = createSlice({
  name: "students",
  initialState: {
    rows: [],
    selectedStudent: null,
    search: '',
  },
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload; 
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  }
});

export const { setRows, setSelectedStudent, setSearch } = studentSlice.actions;
export default studentSlice.reducer;
