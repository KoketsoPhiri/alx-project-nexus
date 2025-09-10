import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import deliveryOptionsReducer from './slices/deliveryOptionsSlice';
import ordersReducer from './slices/ordersSlice';
import authReducer from './slices/authSlice';
import filtersReducer from './slices/filtersSlice';
import wishlistReducer from './slices/wishlistSlice'; // Import wishlist slice

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    deliveryOptions: deliveryOptionsReducer,
    orders: ordersReducer,
    auth: authReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer, // Add wishlist reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;