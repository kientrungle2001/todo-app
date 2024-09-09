// src/store/subjectSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';

export interface Class {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  roomName: string;
  teacherName: string;
  status: number;
}

export interface Subject {
  id?: number;
  name: string;
  code: string;
  status: number;
  classes?: Class[];
}

interface SubjectState {
  items: Subject[];
}

const initialState: SubjectState = {
  items: [],
};

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async ({ searchText }: { searchText?: string }) => {
    const response = await axios.get(`/subjects?search=${searchText}`);
    return response.data;
  }
);

export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async (subject: Omit<Subject, 'id'>) => {
    await axios.post('/subjects', subject);
    return subject;
  }
);

export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async (subject: Subject) => {
    await axios.put(`/subjects/${subject.id}`, subject);
    return subject;
  }
);

export const deleteSubject = createAsyncThunk(
  'subjects/deleteSubject',
  async (id: number) => {
    await axios.delete(`/subjects/${id}`);
    return id;
  }
);

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
        state.items = action.payload;
      })
      .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.items.push(action.payload);
      })
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        const index = state.items.findIndex((subject) => subject.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((subject) => subject.id !== action.payload);
      });
  },
});

export const subjectReducer = subjectSlice.reducer;
