import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload.productId);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateDeliveryOption: (
      state,
      action: PayloadAction<{ productId: string; deliveryOptionId: string }>
    ) => {
      const { productId, deliveryOptionId } = action.payload;
      const matchingItem = state.items.find((item) => item.productId === productId);

      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateDeliveryOption } = cartSlice.actions;

export default cartSlice.reducer;