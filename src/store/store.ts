// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoSlice';
import { userReducer } from './userSlice';
import { todoUserReducer } from './todoUserSlice';
import { centerReducer } from './centerSlice';
import { roomReducer } from './roomSlice';
import { subjectReducer } from './subjectSlice';
import { teacherReducer } from './teacherSlice'; // Add your slice reducers here
import { classReducer } from './classSlice'; // Add your slice reducers here
import { studentReducer } from './studentSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    todoUsers: todoUserReducer,
    centers: centerReducer,
    rooms: roomReducer,
    subjects: subjectReducer,
    teachers: teacherReducer, // Add your slice reducers here
    classes: classReducer, // Add your slice reducers here
    students: studentReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Optional: enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
