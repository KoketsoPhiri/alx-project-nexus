import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

interface AuthState {
  user: Session['user'] | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
}

const initialState: AuthState = {
  user: null,
  status: 'unauthenticated',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (
      state,
      action: PayloadAction<{ user: AuthState['user']; status: AuthState['status'] }>
    ) => {
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
  },
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;