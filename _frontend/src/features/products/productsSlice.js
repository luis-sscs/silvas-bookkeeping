import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await api.get('/products');
  return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (data) => {
  const response = await api.post('/products', data);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
