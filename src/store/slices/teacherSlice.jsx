import { createSlice } from "@reduxjs/toolkit";
import { teacherApi } from "../../services/teacherApi";

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    rows: [],
    selectedTeacher: null,
    search: '',
    snackbar: {
      open: false,
      message: '',
      severity: 'success',
    },
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
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        teacherApi.endpoints.deleteTeacher.matchPending,
        (state) => {
          state.snackbar = { open: true, message: 'Deleting...', severity: 'info' };
        }
      )
      .addMatcher(
        teacherApi.endpoints.deleteTeacher.matchFulfilled,
        (state, action) => {
          state.rows = state.rows.filter((row) => row.id !== action.payload.id); 
          state.snackbar = { open: true, message: 'Deleted successfully', severity: 'success' };
        }
      )
      .addMatcher(
        teacherApi.endpoints.deleteTeacher.matchRejected,
        (state) => {
          state.snackbar = { open: true, message: 'Failed to delete', severity: 'error' };
        }
      );
  },
});

export const { setRows, setSelectedTeacher, setSearch, setSnackbar } = teacherSlice.actions;
export default teacherSlice.reducer;
