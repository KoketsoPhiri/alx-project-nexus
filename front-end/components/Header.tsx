import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Link from 'next/link';

export default function Header() {
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <img className="h-8 md:h-10" src="/images/amazon-logo-white.png" alt="Amazon Logo" />
        </Link>
        <div className="flex-1 max-w-xl mx-4 relative">
          <input className="w-full rounded-md py-2 px-4 text-gray-900 focus:outline-none" type="text" placeholder="Search" />
          <button className="absolute right-0 top-0 h-full w-12 flex items-center justify-center rounded-r-md bg-yellow-500">
            <img className="h-5" src="/images/icons/search-icon.png" alt="Search" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/orders" className="text-sm md:text-base">
            <span className="hidden md:inline">Returns & </span>Orders
          </Link>
          <Link href="/checkout" className="flex items-center">
            <div className="relative">
              <img className="h-6 md:h-8" src="/images/icons/cart-icon.png" alt="Cart" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                {cartQuantity}
              </div>
            </div>
            <div className="text-sm md:text-base ml-1">Cart</div>
          </Link>
        </div>
      </div>
    </header>
  );
}