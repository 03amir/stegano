import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: JSON.parse(localStorage.getItem("userSwap")) || null,
    },
    reducers: {
        signIn: (state, action) => {
            state.data = action.payload;
        },
        logOut: (state) => {
            state.data = null;
        },
    },
});

export const { signIn, logOut } = userSlice.actions;

export default userSlice.reducer;
