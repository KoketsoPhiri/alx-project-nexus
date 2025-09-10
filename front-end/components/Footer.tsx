// components/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link href="/">
              <img className="h-10 mb-4" src="/images/E-shopping.png" alt="E-shopping Logo" />
            </Link>
            <p className="text-sm">Your one-stop shop for all your needs. Quality products, fast delivery, and unbeatable prices.</p>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-400">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-teal-400">Shipping Information</Link></li>
              <li><Link href="#" className="hover:text-teal-400">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-teal-400">FAQ</Link></li>
            </ul>
          </div>

          {/* My Account Links */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">My Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/orders" className="hover:text-teal-400">Order History</Link></li>
              <li><Link href="#" className="hover:text-teal-400">Wishlist</Link></li>
              <li><Link href="#" className="hover:text-teal-400">My Profile</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-400">About Us</Link></li>
              <li><Link href="#" className="hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-teal-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Notice */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} E-shopping. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}