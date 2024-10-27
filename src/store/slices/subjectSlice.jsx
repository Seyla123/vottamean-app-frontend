import { createSlice } from '@reduxjs/toolkit';
const subjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    rows: [],
    subjectToDelete: null,
  },
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSubjectToDelete: (state, action) => {
      state.subjectToDelete = action.payload;
    },
  },
});

export const {setRows, setSubjectToDelete, setSnackbar,setClassDetail} = subjectSlice.actions;
export default subjectSlice.reducer;