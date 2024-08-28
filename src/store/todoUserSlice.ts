// src/store/todoUserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

interface TodoUserState {
  assignedUsers: User[];
}

const initialState: TodoUserState = {
  assignedUsers: [],
};

const todoUserSlice = createSlice({
  name: 'todoUsers',
  initialState,
  reducers: {
    setAssignedUsers: (state, action: PayloadAction<User[]>) => {
      state.assignedUsers = action.payload;
    },
  },
});

export const { setAssignedUsers } = todoUserSlice.actions;
export const todoUserReducer = todoUserSlice.reducer;
