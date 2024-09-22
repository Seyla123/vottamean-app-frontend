import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    rows: [],
    attendanceDetail: {},
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
    setAttendanceDetail(state, action) {
      state.attendanceDetail = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    }
  },
});

export const { setRows,setAttendanceDetail, setFilter } = attendanceSlice.actions;

export default attendanceSlice.reducer;
