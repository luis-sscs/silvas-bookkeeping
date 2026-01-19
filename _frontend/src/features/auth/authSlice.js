import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

const DEFAULT_TEST_USER = {
  username: 'testuser',
  password: 'password123'
};

export const login = createAsyncThunk('auth/login', async (credentials = DEFAULT_TEST_USER) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
