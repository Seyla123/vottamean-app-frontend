import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email : "",
    password : "",
    passwordConfirm: "",
    firstName : "",
    lastName : "",
    gender : "",
    dob : "",
    address : "",
    phoneNumber : "",
}
    const teacherSlice = createSlice({
        name: 'teacher',
        initialState,
        reducers: {
            createTeacherSlice: (state, action) => {
                return { ...state, ...action.payload };
            },
            resetTeacherSlice: () => initialState
        },
    });

export const { createTeacherSlice } = teacherSlice.actions;

