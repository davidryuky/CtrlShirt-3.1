import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav = () => {
  const { totalItems } = useCart();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Loja', path: '/products' },
    // Search in mobile is usually a dedicated page or focused modal, linking to products for simplicity
    { icon: Search, label: 'Busca', path: '/products?focus=search' }, 
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: totalItems },
    { icon: User, label: 'Perfil', path: '/profile' }, // Profile is a placeholder
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-geek-dark/95 backdrop-blur-lg border-t border-white/10 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full h-full space-y-1 relative
              transition-colors duration-200
              ${isActive ? 'text-geek-cyan' : 'text-gray-400 hover:text-gray-200'}
            `}
          >
            <div className="relative">
              <item.icon className="h-6 w-6" />
              {item.badge ? (
                 <span className="absolute -top-2 -right-3 bg-geek-purple text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};