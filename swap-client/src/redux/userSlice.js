import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
    try {
        
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/isAuthentic`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtSwap")
            },
        });

        const data = await res.json();

        if (data.success) {
            // console.log(data)
            return data.user; 
        } else {
            throw new Error("Authentication failed");
        }
    } catch (error) {
        console.error("Authentication error:", error.message);
        throw error; 
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        data: JSON.parse(localStorage.getItem("userSwap")) || null,
    },
    reducers: {
        signIn: (state, action) => {
            state.isAuth = true;
            state.data = action.payload;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuthAsync.fulfilled, (state, action) => {
            state.isAuth = true;
            state.data = action.payload;
        });
        builder.addCase(checkAuthAsync.rejected, (state) => {
            state.isAuth = false;
        });
    }
});

export const { signIn, logOut } = userSlice.actions;

export default userSlice.reducer;
