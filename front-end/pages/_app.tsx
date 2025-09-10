// pages/_app.tsx

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';
import { useEffect } from 'react';
import { setCartItems } from '../store/slices/cartSlice';
import Footer from '../components/Footer'; // Import the Footer component

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Check if localStorage is available (i.e., we are on the client)
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length > 0) {
      store.dispatch(setCartItems(cartItems));
    }
  }, []);

  return (
    <Provider store={store}>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Provider>
  );
}

export default MyApp;
