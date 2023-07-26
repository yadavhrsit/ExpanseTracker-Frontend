import { configureStore, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice"; // Replace "path/to/authApi" with the correct path to your authApi file

const initialState = { value: { Name: "", userId: "" } };
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialState.value;
        }
    },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    // Add the api middleware here
});
