import { createSlice } from '@reduxjs/toolkit';
import { attendanceApi } from '../../services/attendanceApi';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    rows: [],
    snackbar: {
      open: false,
      message: '',
      severity: 'success',
    },
    model: {
      open: false,
      title: 'attendance',
    },
    filter:{
        subject:"",
        class:"",
        filter:""
    }
  },
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },
    setSnackbar(state, action) {
      state.snackbar = action.payload;
    },
    clearSnackbar(state) {
      state.snackbar.open = false;
    },
    setModel(state, action) {
      state.model = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        attendanceApi.endpoints.deleteAttendance.matchPending,
        (state) => {
          state.snackbar = { open: true, message: 'Deleting...', severity: 'info' };
        }
      )
      .addMatcher(
        attendanceApi.endpoints.deleteAttendance.matchFulfilled,
        (state, action) => {
          state.rows = state.rows.filter((row) => row.id !== action.payload);
          state.snackbar = { open: true, message: 'Deleted successfully', severity: 'success' };
        }
      )
      .addMatcher(
        attendanceApi.endpoints.deleteAttendance.matchRejected,
        (state) => {
          state.snackbar = { open: true, message: 'Failed to delete', severity: 'error' };
        }
      );
  },
});

export const { setSnackbar, clearSnackbar, setRows, setModel } = attendanceSlice.actions;

export default attendanceSlice.reducer;
