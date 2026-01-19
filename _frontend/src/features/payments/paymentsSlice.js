import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchPayments = createAsyncThunk('payments/fetchAll', async () => {
  const response = await api.get('/payments');
  return response.data;
});

export const createPayment = createAsyncThunk('payments/create', async (data) => {
  const response = await api.post('/payments', data);
  return response.data;
});

const paymentsSlice = createSlice({
  name: 'payments',
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
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export const { clearError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
