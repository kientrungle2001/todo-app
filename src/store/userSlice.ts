// src/store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';
import { RootState } from './store';

export interface User {
  id?: number;
  username: string;
  password: string;
  role: string;
  department: string;
}

interface UserState {
  items: User[];
  pagination: { page: number; pageSize: number };
}

const initialState: UserState = {
  items: [],
  pagination: { page: 1, pageSize: 10 },
};

// Thunks
// src/store/userSlice.ts
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (pagination: { page: number; pageSize: number }) => {
    const { page, pageSize } = pagination;
    const response = await axios.get(`/users?page=${page}&pageSize=${pageSize}`);
    return response.data; // Make sure the API supports pagination and returns the correct data
  }
);


export const addUser = createAsyncThunk('users/addUser', async (user: User) => {
  const response = await axios.post('/users', user);
  return response.data; // Adjust according to API response
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  await axios.put(`/users/${user.id}`, user);
  return user;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.items.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.items.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(user => user.id !== action.payload);
      });
  },
});

export const { setPagination } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const selectUsers = (state: RootState) => state.users.items;
export const selectPagination = (state: RootState) => state.users.pagination;
