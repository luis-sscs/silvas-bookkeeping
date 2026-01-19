import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchCustomers = createAsyncThunk('customers/fetchAll', async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/customers?${params}`);
  return response.data;
});

export const createCustomer = createAsyncThunk('customers/create', async (data) => {
  const response = await api.post('/customers', data);
  return response.data;
});

export const updateCustomer = createAsyncThunk('customers/update', async ({ id, data }) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
});

export const deleteCustomer = createAsyncThunk('customers/delete', async (id) => {
  await api.delete(`/customers/${id}`);
  return id;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearError } = customersSlice.actions;
export default customersSlice.reducer;
