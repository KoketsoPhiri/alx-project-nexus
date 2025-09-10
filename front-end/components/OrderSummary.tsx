'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart, updateDeliveryOption } from '../store/slices/cartSlice';
import dayjs from 'dayjs';
import { formatCurrency } from '../utils/money';
import { DeliveryOption, Product } from '../types/types';

export default function OrderSummary() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const deliveryOptions = useSelector((state: RootState) => state.deliveryOptions.options);

  const getProductById = (id: string): Product | undefined => products.find((p) => p.id === id);
  const getDeliveryOptionById = (id: string): DeliveryOption | undefined =>
    deliveryOptions.find((d) => d.id === id);

  const handleDelete = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleDeliveryChange = (productId: string, deliveryOptionId: string) => {
    dispatch(updateDeliveryOption({ productId, deliveryOptionId }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart ({cartItems.length} items)</h2>
      {cartItems.map((cartItem) => {
        const product = getProductById(cartItem.productId);
        const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);

        if (!product || !deliveryOption) return null;

        const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D');

        return (
          <div key={cartItem.productId} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0">
            <p className="text-green-700 font-semibold mb-2">Delivery date: {deliveryDate}</p>
            <div className="flex items-center space-x-4">
              <img className="w-24 h-24 object-contain" src={product.image} alt={product.name} />
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-red-500 font-bold mt-1">${formatCurrency(product.priceCents)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Quantity: {cartItem.quantity}
                  <button className="text-blue-600 ml-2">Update</button>
                  <button className="text-blue-600 ml-2" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <p className="font-semibold text-gray-700 mb-2">Choose a delivery option:</p>
                {deliveryOptions.map((option) => {
                  const optionDate = dayjs().add(option.deliveryDays, 'day').format('dddd, MMMM D');
                  const isChecked = option.id === cartItem.deliveryOptionId;

                  return (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`delivery-${product.id}`}
                        checked={isChecked}
                        onChange={() => handleDeliveryChange(product.id, option.id)}
                        className="mr-2"
                      />
                      <div className="text-sm">
                        <p className="font-bold">{optionDate}</p>
                        <p className="text-gray-500">
                          {option.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(option.priceCents)} - Shipping`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}