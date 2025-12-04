import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Cpu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Anime', path: '/products?category=Anime' },
    { name: 'Filmes', path: '/products?category=Filmes' },
    { name: 'Séries', path: '/products?category=Séries' },
    { name: 'Games', path: '/products?category=Games' },
    { name: 'Tecnologia', path: '/products?category=Tecnologia' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-geek-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Cpu className="h-8 w-8 text-geek-cyan group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-display font-bold text-2xl tracking-wider text-white">
              CTRL<span className="text-geek-purple">SHIRT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-300 hover:text-geek-cyan font-medium transition-colors text-sm uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar loot..."
                className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 pl-10 text-sm text-white focus:outline-none focus:border-geek-purple w-48 transition-all focus:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            </form>

            <button className="text-gray-300 hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </button>

            <Link to="/cart" className="relative text-gray-300 hover:text-geek-cyan transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-geek-purple text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative text-gray-300 mr-2">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-geek-purple text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-geek-card border-t border-white/10 absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-geek-purple"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </form>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};