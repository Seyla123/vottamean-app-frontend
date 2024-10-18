import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    filter:{
        subject:"",
        class:"",
        filter:"",
        filterLabel:"All",
        startDate:null,
        endDate:null,
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
