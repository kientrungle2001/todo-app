// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoSlice';
import { userReducer } from './userSlice';
import { todoUserReducer } from './todoUserSlice';
import { centerReducer } from './centerSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    todoUsers: todoUserReducer,
    centers: centerReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Optional: enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
