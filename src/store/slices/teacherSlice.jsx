import { createSlice } from "@reduxjs/toolkit";
import { teacherApi } from "../../services/teacherApi";

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    rows: [],
    selectedTeacher: null,
    search: '',
  },
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload; 
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  }
});

export const { setRows, setSelectedTeacher, setSearch } = teacherSlice.actions;
export default teacherSlice.reducer;
