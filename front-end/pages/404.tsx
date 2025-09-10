// pages/404.tsx

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <div className="bg-slate-800 text-slate-100 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-9xl font-extrabold text-teal-400">404</h1>
        <h2 className="text-4xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-lg text-slate-300 max-w-lg mb-6">
          Oops! The page you are looking for does not exist or has been moved. It might be time to head back home.
        </p>
        <Link href="/" className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors">
          Go to Homepage
        </Link>
      </div>
    </>
  );
}