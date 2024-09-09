import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axiosInstance';

export interface Class {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    roomId: number;
    roomName: string;
    subjectId: number;
    subjectName: string;
    teacherId: number;
    teacherName: string;
    level: number;
    amount: number;
    amountBy: string;
    status: number;
    teacher2Id: number;
    teacher2Name: string;
    online: number;
    classed: number;
    code: string;
    feeType: number;
    scheduleDays: string;
}

interface ClassState {
    items: Class[];
    teachers: { id: number; name: string }[];
    subjects: { id: number; name: string }[];
    rooms: { id: number; name: string }[];
    pagination: { page: number; pageSize: number };
    searchText: string;
    loading: boolean;
    error: string | null;
}

const initialState: ClassState = {
    items: [],
    teachers: [],
    subjects: [],
    rooms: [],
    pagination: { page: 1, pageSize: 10 },
    searchText: '',
    loading: false,
    error: null,
};

export const fetchClasses = createAsyncThunk(
    'classes/fetchClasses',
    async ({ page, pageSize, searchText }: { page: number; pageSize: number; searchText?: string }) => {
        const response = await axios.get(`/classes?page=${page}&pageSize=${pageSize}&search=${searchText}`);
        return response.data;
    }
);

export const addClass = createAsyncThunk('classes/addClass', async (classData: Class) => {
    const response = await axios.post('/classes', classData);
    return response.data;
});

export const updateClass = createAsyncThunk('classes/updateClass', async (classData: Class) => {
    await axios.put(`/classes/${classData.id}`, classData);
    return classData;
});

export const deleteClass = createAsyncThunk('classes/deleteClass', async (id: number) => {
    await axios.delete(`/classes/${id}`);
    return id;
});

const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
            state.pagination = action.payload;
        },
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
                state.items = action.payload;
            })
            .addCase(addClass.fulfilled, (state, action: PayloadAction<Class>) => {
                state.items.push(action.payload);
            })
            .addCase(updateClass.fulfilled, (state, action: PayloadAction<Class>) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteClass.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { setPagination, setSearchText } = classSlice.actions;
export const classReducer = classSlice.reducer;
