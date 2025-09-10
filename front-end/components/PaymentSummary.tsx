'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { formatCurrency } from '../utils/money';
import Link from 'next/link';

export default function PaymentSummary() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const deliveryOptions = useSelector((state: RootState) => state.deliveryOptions.options);

  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getDeliveryOptionById = (id: string) => deliveryOptions.find((d) => d.id === id);

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cartItems.forEach((cartItem) => {
    const product = getProductById(cartItem.productId);
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);

    if (product && deliveryOption) {
      productPriceCents += product.priceCents * cartItem.quantity;
      shippingPriceCents += deliveryOption.priceCents;
    }
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  return (
    <div className="bg-blue-500 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Items ({cartItems.length}):</p>
          <p className="font-semibold text-black-700">${formatCurrency(productPriceCents)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Shipping & handling:</p>
          <p className="font-semibold text-black-700">${formatCurrency(shippingPriceCents)}</p>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <p className="font-bold">Total before tax:</p>
          <p className="font-bold text-black-700">${formatCurrency(totalBeforeTaxCents)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Estimated tax (10%):</p>
          <p className="font-semibold text-black-700">${formatCurrency(taxCents)}</p>
        </div>
        <div className="border-t-2 border-gray-800 pt-3 flex justify-between items-center font-bold text-lg text-red-600">
          <p>Order total:</p>
          <p>${formatCurrency(totalCents)}</p>
        </div>
      </div>
      <Link href="/orders">
        <button className="mt-6 w-full py-3 bg-yellow-400 text-black font-bold rounded-md hover:bg-yellow-500 transition-colors">
          Place your order
        </button>
      </Link>
    </div>
  );
}