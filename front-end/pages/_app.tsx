import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store/store';
import '../styles/globals.css';
import { useEffect } from 'react';
import { setCartItems } from '../store/slices/cartSlice';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Header from '../components/Header';
import Footer from '../components/Footer';
import { setWishlistItems } from '../store/slices/wishlistSlice';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length > 0) {
      store.dispatch(setCartItems(cartItems));
    }
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlistItems.length > 0) {
        store.dispatch(setWishlistItems(wishlistItems));
    }
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Toaster position="top-right" /> {/* Add Toaster component */}
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
