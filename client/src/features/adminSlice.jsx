import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URLs for development and production environments
const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:2000'
    : 'https://new-e-commerce-mern-tailwind.onrender.com';

console.log(process.env.NODE_ENV)
export const login = createAsyncThunk(
    'admin/login',
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/login`, loginData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            return response.data
        }catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'order/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${apiUrl}/order/delete`, { data: { id } });
            return response.data;
        }catch (error) {
            console.error('Error deleting item', error);
            throw error;
        }
    }
);

export const deleteAllOrders = createAsyncThunk(
    'orders/deleteAll',
    async (password, thunkAPI) => {
        try {
            const response = await axios.delete(`${apiUrl}/order/deleteAll`, { data: { password } });
            return response.data;
        } catch (error) {
            console.error('Error deleting all orders:', error);
            throw error;
        }
    }
);

const initialState = {
    status: 'idle',
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteAllOrders.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteAllOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default adminSlice.reducer