// scheduleSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axiosInstance';

export interface Schedule {
  id: number;
  classId: number;
  studyDate: string;  // Using string to store date in 'YYYY-MM-DD' format
  studyTime: string;  // Using string to store time in 'HH:MM:SS' format
  status: number;
}

interface ScheduleState {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedules: [],
  loading: false,
  error: null,
};

// Async thunk to fetch schedules for a class
export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async (classId: string | string[]) => {
    const response = await axios.get(`/schedules?classId=${classId}`);
    return response.data;
  }
);

// Async thunk to add a new schedule
export const addSchedule = createAsyncThunk(
  'schedules/addSchedule',
  async (schedule: Omit<Schedule, 'id'>) => {
    const response = await axios.post('/api/schedules', schedule);
    return response.data;
  }
);

// Async thunk to update a schedule
export const updateSchedule = createAsyncThunk(
  'schedules/updateSchedule',
  async (schedule: Schedule) => {
    const response = await axios.put(`/schedules/${schedule.id}`, schedule);
    return response.data;
  }
);

// Async thunk to delete a schedule
export const deleteSchedule = createAsyncThunk(
  'schedules/deleteSchedule',
  async (scheduleId: number) => {
    await axios.delete(`/schedules/${scheduleId}`);
    return scheduleId;
  }
);

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch schedules
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action: PayloadAction<Schedule[]>) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch schedules';
      })
      // Add schedule
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchedule.fulfilled, (state, action: PayloadAction<Schedule>) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add schedule';
      })
      // Update schedule
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action: PayloadAction<Schedule>) => {
        state.loading = false;
        const index = state.schedules.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update schedule';
      })
      // Delete schedule
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.schedules = state.schedules.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete schedule';
      });
  },
});

export const scheduleReducer = scheduleSlice.reducer;
