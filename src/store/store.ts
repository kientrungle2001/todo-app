// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import thunk middleware
import { todoReducer } from './todoSlice';
import { userReducer } from './userSlice';
import { todoUserReducer } from './todoUserSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    todoUsers: todoUserReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Optional: enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
