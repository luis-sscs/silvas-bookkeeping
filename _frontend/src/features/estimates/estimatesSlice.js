import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchEstimates = createAsyncThunk('estimates/fetchAll', async () => {
  const response = await api.get('/estimates');
  return response.data;
});

export const createEstimate = createAsyncThunk('estimates/create', async (data) => {
  const response = await api.post('/estimates', data);
  return response.data;
});

export const updateEstimate = createAsyncThunk('estimates/update', async ({ id, data }) => {
  const response = await api.put(`/estimates/${id}`, data);
  return response.data;
});

export const deleteEstimate = createAsyncThunk('estimates/delete', async (id) => {
  await api.delete(`/estimates/${id}`);
  return id;
});

const estimatesSlice = createSlice({
  name: 'estimates',
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
      .addCase(fetchEstimates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEstimate.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearError } = estimatesSlice.actions;
export default estimatesSlice.reducer;
