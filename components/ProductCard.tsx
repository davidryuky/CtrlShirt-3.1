import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    // Default to 'M' size for quick add, real app might ask
    addToCart(product, product.sizes[0], 1);
    // You could add a toast here
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block bg-geek-card rounded-xl overflow-hidden border border-white/5 hover:border-geek-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:-translate-y-1">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.originalPrice && (
          <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
            Sale
          </span>
        )}
        {product.newArrival && (
          <span className="bg-geek-cyan/90 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
            Novo
          </span>
        )}
      </div>

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-900 relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl uppercase tracking-widest border-2 border-white px-4 py-2">Esgotado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-geek-cyan font-semibold uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center text-yellow-400 text-xs gap-1">
            <Star className="h-3 w-3 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="text-white font-medium text-lg leading-tight mb-2 truncate group-hover:text-geek-purple transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-gray-500 text-xs line-through">R$ {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-white font-bold text-xl">R$ {product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`p-2 rounded-full transition-colors ${
              product.inStock 
              ? 'bg-white/10 hover:bg-geek-purple text-white' 
              : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};