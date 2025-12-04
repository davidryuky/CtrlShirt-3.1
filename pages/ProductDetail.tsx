import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Truck, RefreshCcw } from 'lucide-react';
import { products } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white">Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecione um tamanho.");
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Por favor selecione um tamanho.");
      return;
    }
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-geek-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-white/5">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${activeImage === img ? 'border-geek-purple' : 'border-transparent'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-white">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-geek-cyan font-bold uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.inStock ? 'Em Estoque' : 'Esgotado'}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400 gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                   ))}
                   <span className="text-gray-300 ml-2 text-sm">({product.reviews} avaliações)</span>
                </div>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through mb-1">R$ {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 border-b border-white/10 pb-8">
              {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <span className="block text-sm font-bold text-gray-400 mb-3">Tamanho</span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-12 h-12 rounded-lg font-bold transition-all
                        ${selectedSize === size 
                          ? 'bg-geek-purple text-white ring-2 ring-geek-purple ring-offset-2 ring-offset-geek-dark' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                 <span className="block text-sm font-bold text-gray-400 mb-3">Quantidade</span>
                 <div className="flex items-center gap-4 bg-white/5 inline-flex rounded-lg p-1">
                   <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-white/10 rounded"><Minus className="h-4 w-4" /></button>
                   <span className="w-8 text-center font-bold">{quantity}</span>
                   <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-white/10 rounded"><Plus className="h-4 w-4" /></button>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-geek-purple hover:bg-violet-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 Comprar Agora
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
               <div className="flex items-center gap-2">
                 <Truck className="h-4 w-4 text-geek-cyan" /> Envio para todo o Brasil
               </div>
               <div className="flex items-center gap-2">
                 <RefreshCcw className="h-4 w-4 text-geek-cyan" /> 7 dias para troca grátis
               </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Você também pode curtir</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};