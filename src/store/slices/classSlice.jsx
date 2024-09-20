import { createSlice } from "@reduxjs/toolkit";
import { classApi } from "../../services/classApi";

const classSlice = createSlice({
  name: "classes",
  initialState: {
    rows: [],
    selectClass:null, 
    search:'',
    snackbar: {
      open: false,
      message: '',
      severity:'success',
    },
  },
  reducers:{
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSelectedClass: (state, action) => {
      state.selectClass = action.payload;
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
        classApi.endpoints.deleteClassesData.matchPending,
        (state) => {
          state.snackbar = { open: true, message: 'Deleting...', severity: 'info' };
        }
      )
      .addMatcher(
        classApi.endpoints.deleteClassesData.matchFulfilled,
        (state, action) => {
          state.rows = state.rows.filter((row) => row.id !== action.payload);
          state.snackbar = { open: true, message: 'Deleted successfully', severity: 'success' };
        }
      )
      .addMatcher(
        classApi.endpoints.deleteClassesData.matchRejected,
        (state) => {
          state.snackbar = { open: true, message: 'Failed to delete', severity: 'error' };
        }
      );
  },
});

export const { setRows, setSelectedClass, setSearch ,setSnackbar} = classSlice.actions;
export default classSlice.reducer;
