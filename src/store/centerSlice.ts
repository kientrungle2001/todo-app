import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';
import { RootState } from './store';

export interface Center {
  id?: number;
  name: string;
  code: string;
  address: string;
  status: number;
}

interface CenterState {
  items: Center[];
  pagination: { page: number; pageSize: number };
}

const initialState: CenterState = {
  items: [],
  pagination: { page: 1, pageSize: 10 },
};

// Thunks
export const fetchCenters = createAsyncThunk(
  'centers/fetchCenters',
  async ({ page, pageSize, searchText }: { page: number; pageSize: number; searchText?: string }) => {
    const response = await axios.get(`/centers?page=${page}&pageSize=${pageSize}&search=${searchText}`);
    return response.data;
  }
);

export const addCenter = createAsyncThunk('centers/addCenter', async (center: Center) => {
  const response = await axios.post('/centers', center);
  return response.data;
});

export const updateCenter = createAsyncThunk('centers/updateCenter', async (center: Center) => {
  await axios.put(`/centers/${center.id}`, center);
  return center;
});

export const deleteCenter = createAsyncThunk('centers/deleteCenter', async (id: number) => {
  await axios.delete(`/centers/${id}`);
  return id;
});

const centerSlice = createSlice({
  name: 'centers',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCenters.fulfilled, (state, action: PayloadAction<Center[]>) => {
        state.items = action.payload;
      })
      .addCase(addCenter.fulfilled, (state, action: PayloadAction<Center>) => {
        state.items.push(action.payload);
      })
      .addCase(updateCenter.fulfilled, (state, action: PayloadAction<Center>) => {
        const index = state.items.findIndex(center => center.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCenter.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(center => center.id !== action.payload);
      });
  },
});

export const { setPagination } = centerSlice.actions;
export const centerReducer = centerSlice.reducer;
export const selectCenters = (state: RootState) => state.centers.items;
export const selectPagination = (state: RootState) => state.centers.pagination;
