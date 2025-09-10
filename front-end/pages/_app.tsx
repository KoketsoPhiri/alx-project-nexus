import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store/store';
import '../styles/globals.css';
import { useEffect } from 'react';
import { setCartItems } from '../store/slices/cartSlice';
import { setWishlistItems } from '../store/slices/wishlistSlice'; // Import wishlist action
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    // Hydrate cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length > 0) {
      store.dispatch(setCartItems(cartItems));
    }
    // Hydrate wishlist from localStorage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlistItems.length > 0) {
        store.dispatch(setWishlistItems(wishlistItems));
    }
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
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
