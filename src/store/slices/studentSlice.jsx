import { createSlice } from "@reduxjs/toolkit";
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
