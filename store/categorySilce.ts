import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from the API
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('https://abdelrhmang4.pythonanywhere.com/api/categories/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

// Define initial state
const initialState = {
    list: [],
    loading: false,
};

// Category slice
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // Manually set categories (if needed)
        setCategories: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
