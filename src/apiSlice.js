import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://nodejs-production-0efc.up.railway.app/", credentials: "include" }),
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
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'GET',
            }),
            invalidatesTags: ['User'],
        }),
        getUser: builder.query({
            query: () => "utils/getuser",
            providesTags: ['User'],
        }),
        isEmailAvailable: builder.mutation({
            query: (email) => ({
                url: `utils/isemailavail/${email}`,
                method: 'GET',
            }),
        }),








        // BUDGETS

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
        updateBudget: builder.mutation({
            query: (updateBudgetData) => ({
                url: "budget/update",
                method: "PATCH",
                body: updateBudgetData,
                validateStatus: (response) =>
                    response.status === 200,
            }),
            invalidatesTags: ['Budgets'],
        }),
        deleteBudget: builder.mutation({
            query: (deleteBudgetData) => ({
                url: "budget/delete",
                method: "DELETE",
                body: deleteBudgetData,
                validateStatus: (response) =>
                    response.status === 204,
            }),
            invalidatesTags: ['Budgets'],
        }),





        // EXPENSES

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
        updateExpense: builder.mutation({
            query: (updateExpenseData) => ({
                url: "expense/update",
                method: "PATCH",
                body: updateExpenseData,
                validateStatus: (response) =>
                    response.status === 200,
            }),
            invalidatesTags: ['Expenses', 'Budgets'],
        }),
        deleteExpense: builder.mutation({
            query: (deleteExpenseData) => ({
                url: "expense/delete",
                method: "DELETE",
                body: deleteExpenseData,
                validateStatus: (response) =>
                    response.status === 204,
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
    useIsEmailAvailableMutation,
    useBudgetsQuery,
    useExpensesQuery,
    useAddBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = authApi;

