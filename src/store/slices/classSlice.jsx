import { createSlice } from "@reduxjs/toolkit";
const classSlice = createSlice({
  name: "classes",
  initialState: {
    rows: [],
    selectClass:null, 
    search:'',
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
  },
});

export const { setRows, setSelectedClass, setSearch ,setSnackbar,setClassDetail} = classSlice.actions;
export default classSlice.reducer;
