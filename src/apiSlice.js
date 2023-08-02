import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/", credentials: "include" }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (newUserData) => ({
                url: 'auth/register',
                method: 'POST',
                body: newUserData,
            }),
        }),
        login: builder.mutation({
            query: (userData) => ({
                url: 'auth/login',
                method: 'POST',
                body: userData,
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'GET',
            }),
        }),
        getUser: builder.query({
            query: () => "utils/getuser",
        }),
        budgets: builder.query({
            query: () => "budget/viewall"
        }),
        addBudget: builder.mutation({
            query: () => ({
                url: "budget/add",
                method: "POST"
            }),
        }),
        expenses: builder.query({
            query: () => "expense/viewall"
        }),
        addExpense: builder.mutation({
            query: () => ({
                url: "expense/add",
                method: "POST"
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery,
    useAddBudgetMutation,
    useAddExpenseMutation,
    useBudgetsQuery,
    useExpensesQuery
} = authApi;

