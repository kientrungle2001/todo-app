// src/store/studentSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';
import { RootState } from './store';

export interface Student {
  id?: number;
  name: string;
  phone: string;
  school: string;
  extraFields: string;
  birthYear: number;
  schoolYear: number;
  classes: string;
  address: string;
  birthDate: string;
  parentName: string;
  paid: number;
  startStudyDate: string;
  endStudyDate: string;
  currentClassNames: string;
  periodNames: string;
  periodIds: string;
  note: string;
  online: number;
  classed: number;
  type: number;
  status: number;
  rating: number;
  assignId: number;
  assignName: string;
  color: string;
  fontStyle: string;
  currentClassIds: string;
  subjectIds: string;
  subjectNames: string;
  teacherIds: string;
  code: string;
  adviceStatus: number;
  adviceNote: string;
  grade: number;
  email: string;
  zalo?: string;
  facebook?: string;
}

interface StudentState {
  items: Student[];
  pagination: { page: number; pageSize: number };
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  items: [],
  pagination: { page: 1, pageSize: 10 },
  loading: false,
  error: null,
};

// Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async ({ page, pageSize, searchText, classId }: { page: number; pageSize: number; searchText?: string; classId: number }) => {
    const response = await axios.get(`/students?page=${page}&pageSize=${pageSize}&search=${searchText}&classId=${classId}`);
    return response.data;
  }
);

export const addStudent = createAsyncThunk('students/addStudent', async (student: Student) => {
  const response = await axios.post('/students', student);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async (student: Student) => {
  await axios.put(`/students/${student.id}`, student);
  return student;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id: number) => {
  await axios.delete(`/students/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.items.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        const index = state.items.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(student => student.id !== action.payload);
      });
  },
});

export const { setPagination } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
export const selectStudents = (state: RootState) => state.students.items;
export const selectPagination = (state: RootState) => state.students.pagination;
