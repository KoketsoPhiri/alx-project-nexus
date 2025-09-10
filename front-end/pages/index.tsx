import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId }));
  };

  return (
    <>
      <Header />
      <div className="bg-slate-800 text-slate-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-teal-400">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {status === 'loading' && <p className="col-span-full text-center text-lg">Loading products...</p>}
            {status === 'failed' && <p className="col-span-full text-center text-red-400">Error loading products. Please try again.</p>}
            {status === 'succeeded' &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
