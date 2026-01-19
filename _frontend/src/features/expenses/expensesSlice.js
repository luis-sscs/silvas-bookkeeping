import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchExpenses = createAsyncThunk('expenses/fetchAll', async () => {
  const response = await api.get('/expenses');
  return response.data;
});

export const createExpense = createAsyncThunk('expenses/create', async (data) => {
  const response = await api.post('/expenses', data);
  return response.data;
});

export const updateExpense = createAsyncThunk('expenses/update', async ({ id, data }) => {
  const response = await api.put(`/expenses/${id}`, data);
  return response.data;
});

export const deleteExpense = createAsyncThunk('expenses/delete', async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
});

const expensesSlice = createSlice({
  name: 'expenses',
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
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearError } = expensesSlice.actions;
export default expensesSlice.reducer;
