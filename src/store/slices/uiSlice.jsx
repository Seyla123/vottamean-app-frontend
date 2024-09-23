import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        modal: {
            open: false,
            itemName: "",
            message: ""
        },
        snackbar: {
            open: false,
            message: "",
            severity: ""
        },
    },
    reducers: {
        setSnackbar(state, action) {
            state.snackbar = {...state.snackbar, ...action.payload};
        },
        setModal(state, action) {
            state.modal = {...state.modal, ...action.payload};
        },
    },
});

export const { setSnackbar, setModal } = uiSlice.actions;

export default uiSlice.reducer;