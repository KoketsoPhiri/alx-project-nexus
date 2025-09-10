import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { setSortBy } from '../store/slices/filtersSlice';
import { Product } from '../types/types';
import { FiltersState } from '../store/slices/filtersSlice'; // Import the FiltersState type

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector((state: RootState) => state.products);
  const sortBy = useSelector((state: RootState) => state.filters.sortBy);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId }));
  };

  const getSortedProducts = (products: Product[]) => {
    const sortedProducts = [...products];
    if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.priceCents - b.priceCents);
    } else if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.priceCents - a.priceCents);
    } else if (sortBy === 'rating-desc') {
      sortedProducts.sort((a, b) => b.rating.stars - a.rating.stars);
    } else if (sortBy === 'name-asc') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sortedProducts;
  };

  const sortedProducts = getSortedProducts(products);

  return (
    <>
      <div className="bg-slate-800 text-slate-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-teal-400">Our Products</h1>
          <div className="mb-6 flex justify-end">
            <label htmlFor="sort-by" className="mr-2 text-slate-300">Sort by:</label>
            <select
              id="sort-by"
              className="rounded-md bg-slate-700 text-slate-100 border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as FiltersState['sortBy']))} // Corrected type cast
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating-desc">Rating</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {status === 'loading' && <p className="col-span-full text-center text-lg">Loading products...</p>}
            {status === 'failed' && <p className="col-span-full text-center text-red-400">Error loading products. Please try again.</p>}
            {status === 'succeeded' &&
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
