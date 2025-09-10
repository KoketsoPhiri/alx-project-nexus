import { useState } from 'react';
import { Product } from '../types/types';
import { formatCurrency } from '../utils/money';
import { FaCheckCircle } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const getStarsUrl = (stars: number) => `/images/ratings/rating-${stars * 10}.png`;

  const handleAddClick = () => {
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img className="w-full h-48 object-contain mb-4" src={product.image} alt={product.name} />
      <div className="text-center font-bold text-gray-700 h-12 overflow-hidden mb-2">
        {product.name}
      </div>
      <div className="flex items-center mb-2">
        <img className="h-4 mr-1" src={getStarsUrl(product.rating.stars)} alt={`${product.rating.stars} stars`} />
        <span className="text-blue-600 font-medium text-sm">{product.rating.count}</span>
      </div>
      <div className="text-lg font-bold text-gray-900 mb-2">
        ${formatCurrency(product.priceCents)}
      </div>
      <select className="w-full border rounded-md py-1 px-2 text-sm mb-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>
      {product.type === 'clothing' && (
        <a href={product.sizeChartLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm mb-2">
          Size chart
        </a>
      )}
      <div className={`flex items-center text-green-500 transition-opacity duration-300 ${added ? 'opacity-100' : 'opacity-0'}`}>
        <FaCheckCircle className="mr-1" />
        Added
      </div>
      <button onClick={handleAddClick} className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}