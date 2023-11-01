import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userData: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            // Set a key-value pair in local storage to store JWT Token
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.userData = null;
            // Clear all data in local storage
            localStorage.clear();
        },
        getAllUsers: (state, action) => {
            state.users = action.payload;
        },
    }
})

export const { login, logout, getAllUsers } = userSlice.actions
export default userSlice.reducer