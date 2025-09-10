import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Shipping() {
  return (
    <>
      <Header />
      <div className="bg-slate-800 text-slate-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-teal-400">Shipping Information</h1>
          <div className="bg-slate-700 p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Enter Your Address</h2>
            {/* You would add a form here */}
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 rounded bg-slate-600 border border-slate-500" />
              <input type="text" placeholder="Address Line 1" className="w-full p-2 rounded bg-slate-600 border border-slate-500" />
              <input type="text" placeholder="City" className="w-full p-2 rounded bg-slate-600 border border-slate-500" />
              <input type="text" placeholder="Zip Code" className="w-full p-2 rounded bg-slate-600 border border-slate-500" />
            </div>
            <Link href="/checkout/payment">
              <button className="mt-6 w-full py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 transition-colors">
                Continue to Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}