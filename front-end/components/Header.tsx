import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Link from 'next/link';

export default function Header() {
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-slate-900 text-slate-100 py-5 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <img className="h-10 md:h-12" src="/images/E-shopping.png" alt="E-shopping Logo" />
        </Link>
        <div className="flex-1 max-w-2xl mx-6 relative">
          <input className="w-full rounded-full py-2 px-6 text-slate-900 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400" type="text" placeholder="Search for products..." />
          <button className="absolute right-0 top-0 h-full w-14 flex items-center justify-center rounded-r-full bg-teal-500 hover:bg-teal-400 transition-colors duration-200">
            <img className="h-5" src="/images/icons/search-icon.png" alt="Search" />
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/orders" className="text-sm md:text-base font-medium hover:text-teal-400 transition-colors duration-200">
            Orders
          </Link>
          <Link href="/checkout" className="flex items-center">
            <div className="relative">
              <img className="h-7 md:h-8" src="/images/icons/cart-icon.png" alt="Cart" />
              <div className="absolute -top-1 -right-2 bg-red-600 text-[10px] font-bold text-white rounded-full h-4 w-4 flex items-center justify-center">
                {cartQuantity}
              </div>
            </div>
            <div className="text-sm md:text-base ml-2 font-medium">Cart</div>
          </Link>
        </div>
      </div>
    </header>
  );
}