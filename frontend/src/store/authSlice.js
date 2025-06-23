/**
 * authSlice.js
 * 
 * Purpose: Manage authentication state and async actions
 * 
 * Exports:
 * - authReducer
 * - Async Thunks:
 *   - loginUser
 *   - logoutUser
 *   - registerUser
 * 
 * State Structure:
 * {
 *   user: null | object,
 *   status: 'idle' | 'loading' | 'succeeded' | 'failed',
 *   error: null | string
 * }
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    // Synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  }
});

export default authSlice.reducer;