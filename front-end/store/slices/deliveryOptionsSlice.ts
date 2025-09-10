import { createSlice } from '@reduxjs/toolkit';
import type { DeliveryOption } from '../../types/types';

interface DeliveryOptionsState {
  options: DeliveryOption[];
}

const initialState: DeliveryOptionsState = {
  options: [
    {
      id: '1',
      deliveryDays: 7,
      priceCents: 0,
    },
    {
      id: '2',
      deliveryDays: 3,
      priceCents: 499,
    },
    {
      id: '3',
      deliveryDays: 1,
      priceCents: 999,
    },
  ],
};

const deliveryOptionsSlice = createSlice({
  name: 'deliveryOptions',
  initialState,
  reducers: {},
});

export default deliveryOptionsSlice.reducer;