import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';
  category: string;
}

const initialState: FiltersState = {
  searchTerm: '',
  sortBy: 'name-asc',
  category: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.sortBy = 'name-asc';
      state.category = 'all';
    },
  },
});

export const { setSearchTerm, setSortBy, setCategory, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;