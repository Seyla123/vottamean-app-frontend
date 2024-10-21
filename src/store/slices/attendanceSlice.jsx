import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs'
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    filter:{
        subject:"",
        class:"",
        filter:"",
        filterLabel:"All",
        startDate:dayjs().format('YYYY-MM-DD'),
        endDate:dayjs().format('YYYY-MM-DD'),
    }
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    }
  },
});

export const { setFilter } = attendanceSlice.actions;

export default attendanceSlice.reducer;
