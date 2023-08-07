import { configureStore, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice";

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

const budgetsDataSlice = createSlice({
    name: 'budgetsData',
    initialState: [],
    reducers: {
        setBudgetsData: (state, action) => {
            return action.payload;
        }
    },
});

export const { login, logout } = userSlice.actions;
export const { setBudgetsData } = budgetsDataSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        budgetsData: budgetsDataSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
});
