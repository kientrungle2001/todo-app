import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axiosInstance';

export interface Teacher {
    id?: number;
    name: string;
    phone: string;
    address: string;
    school: string;
    salary: number;
    password: string;
    subjectId: number;
    status: number;
    departmentId: number;
    type: string;
    code: string;
}

interface TeacherState {
    items: Teacher[];
    loading: boolean;
    error: string | null;
}

const initialState: TeacherState = {
    items: [],
    loading: false,
    error: null,
};

// Async thunk to fetch teachers
export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async ({ searchText }: { searchText?: string }) => {
    const response = await axios.get(`/teachers?search=${searchText}`);
    return response.data;
});

// Async thunk to add a teacher
export const addTeacher = createAsyncThunk('teachers/addTeacher', async (teacher: Teacher) => {
    const response = await axios.post('/teachers', teacher);
    return response.data;
});

// Async thunk to edit a teacher
export const editTeacher = createAsyncThunk('teachers/editTeacher', async (teacher: Teacher) => {
    const response = await axios.put(`/teachers/${teacher.id}`, teacher);
    return response.data;
});

// Async thunk to delete a teacher
export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (id: number) => {
    await axios.delete(`/teachers/${id}`);
    return id;
});

const teacherSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeachers.fulfilled, (state, action: PayloadAction<Teacher[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch teachers';
            })
            .addCase(addTeacher.fulfilled, (state, action: PayloadAction<Teacher>) => {
                state.items.push(action.payload);
            })
            .addCase(editTeacher.fulfilled, (state, action: PayloadAction<Teacher>) => {
                const index = state.items.findIndex(teacher => teacher.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(teacher => teacher.id !== action.payload);
            });
    },
});

export const teacherReducer = teacherSlice.reducer;
