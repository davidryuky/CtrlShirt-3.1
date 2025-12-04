import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = items.length > 0 ? (totalPrice > 200 ? 0 : 25) : 0;
  
  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'GEEK2025') {
      setDiscount(totalPrice * 0.15);
      alert("Cupom aplicado com sucesso!");
    } else {
      alert("Cupom inválido :(");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#06D6A0', '#ffffff']
      });
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-geek-dark flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <ShoppingBag className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-4xl font-display font-bold text-white mb-4">GG! Order Placed!</h2>
        <p className="text-gray-400 mb-8 max-w-md">Seu loot lendário foi confirmado e já está sendo preparado pelos nossos minions. Verifique seu email para rastreio.</p>
        <Link to="/" className="bg-geek-purple text-white px-8 py-3 rounded-lg font-bold hover:bg-violet-600 transition-colors">
          Voltar para Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-geek-dark pt-24 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 mb-6 opacity-50 bg-[url('https://picsum.photos/seed/empty/200/200')] bg-cover rounded-full grayscale" />
        <h2 className="text-3xl font-display font-bold text-white mb-4">Seu inventário está vazio</h2>
        <p className="text-gray-400 mb-8">Parece que você ainda não equipou nenhum item.</p>
        <Link to="/products" className="bg-geek-cyan text-black font-bold px-8 py-3 rounded-lg hover:bg-teal-400 transition-colors">
          Explorar Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-geek-dark pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Carrinho de Compras</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-geek-card border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                <div className="w-20 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">Tamanho: <span className="text-geek-cyan">{item.selectedSize}</span></p>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-geek-purple">R$ {item.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="flex items-center bg-white/5 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="p-2 text-white hover:bg-white/10 rounded-l-lg"
                    ><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="p-2 text-white hover:bg-white/10 rounded-r-lg"
                    ><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-geek-card border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-display font-bold text-white mb-6">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Frete</span>
                  <span>{shipping === 0 ? <span className="text-green-400">Grátis</span> : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Desconto</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {(totalPrice + shipping - discount).toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Cupom" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-geek-purple uppercase"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-white/20"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-geek-purple hover:bg-violet-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {isCheckingOut ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Finalizar Compra <ArrowRight className="h-5 w-5" /></>
                )}
              </button>
              
              <Link to="/products" className="block text-center text-gray-400 text-sm mt-4 hover:text-white">
                Continuar Comprando
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};