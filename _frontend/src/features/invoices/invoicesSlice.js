import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchInvoices = createAsyncThunk('invoices/fetchAll', async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/invoices?${params}`);
  return response.data;
});

export const fetchInvoiceById = createAsyncThunk('invoices/fetchById', async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
});

export const createInvoice = createAsyncThunk('invoices/create', async (data) => {
  const response = await api.post('/invoices', data);
  return response.data;
});

export const updateInvoice = createAsyncThunk('invoices/update', async ({ id, data }) => {
  const response = await api.put(`/invoices/${id}`, data);
  return response.data;
});

export const deleteInvoice = createAsyncThunk('invoices/delete', async (id) => {
  await api.delete(`/invoices/${id}`);
  return id;
});

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    items: [],
    currentInvoice: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.currentInvoice = action.payload;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearError, clearCurrentInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
