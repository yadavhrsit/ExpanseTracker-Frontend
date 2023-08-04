import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/", credentials: "include" }),
    tagTypes: ['Budgets', 'Expenses'],
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
            query: () => "budget/viewall",
            providesTags: ['Budgets'],
        }),
        addBudget: builder.mutation({
            query: (budgetData) => ({
                url: "budget/add",
                method: "POST",
                body: budgetData,
                validateStatus: (response) =>
                    response.status === 201,
            }),
            invalidatesTags: ['Budgets'],
        }),
        expenses: builder.query({
            query: () => "expense/viewall",
            providesTags: ['Expenses'],
        }),
        addExpense: builder.mutation({
            query: (expenseData) => ({
                url: "expense/add",
                method: "POST",
                body: expenseData,
                alidateStatus: (response) =>
                    response.status === 201,
            }),
            invalidatesTags: ['Expenses', 'Budgets'],
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

