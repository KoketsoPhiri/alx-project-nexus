import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types/types';
import toast from 'react-hot-toast'; // Import toast

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`Increased quantity to ${existingItem.quantity}`);
      } else {
        state.items.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
        toast.success('Item added to cart!');
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload.productId);
      localStorage.setItem('cart', JSON.stringify(state.items));
      toast.error('Item removed from cart.');
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
      toast('Delivery option updated.');
    },
  },
});

export const { addToCart, removeFromCart, updateDeliveryOption, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;