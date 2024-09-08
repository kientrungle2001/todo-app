import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';
import { RootState } from './store';

export interface Room {
    id?: number;
    name: string;
    status: number; // 1 for Active, 0 for Inactive
    centerId: number;
    centerName?: string;
    size: number;
    note: string;
}

interface RoomState {
    items: Room[];
    centers: { id: number; name: string }[];  // For the select box
    pagination: { page: number; pageSize: number };
}

const initialState: RoomState = {
    items: [],
    centers: [],
    pagination: { page: 1, pageSize: 10 },
};

// Thunks
export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async ({ page, pageSize, searchText }: { page: number; pageSize: number; searchText?: string }) => {
        const response = await axios.get(`/rooms?page=${page}&pageSize=${pageSize}&search=${searchText}`);
        return response.data;
    }
);

export const fetchCenters = createAsyncThunk(
    'rooms/fetchCenters',
    async () => {
        const response = await axios.get('/rooms/centers');
        return response.data;
    }
);

export const addRoom = createAsyncThunk('rooms/addRoom', async (room: Room) => {
    const response = await axios.post('/rooms', room);
    return response.data; // Adjust according to API response
});

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (room: Room) => {
    await axios.put(`/rooms/${room.id}`, room);
    return room;
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: number) => {
    await axios.delete(`/rooms/${id}`);
    return id;
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setPagination(state, action: PayloadAction<{ page: number; pageSize: number }>) {
            state.pagination = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.items = action.payload;
            })
            .addCase(addRoom.fulfilled, (state, action: PayloadAction<Room>) => {
                state.items.push(action.payload);
            })
            .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
                const index = state.items.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(room => room.id !== action.payload);
            })
            .addCase(fetchCenters.fulfilled, (state, action) => {
                state.centers = action.payload;
            });
    },
});

export const { setPagination } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
export const selectRooms = (state: RootState) => state.rooms.items;
export const selectPagination = (state: RootState) => state.rooms.pagination;
