import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';
import { Product, SortOption } from '../types';

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'Todos');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [priceRange, setPriceRange] = useState<number>(200);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['Todos', 'Anime', 'Filmes', 'Séries', 'Games', 'HQs', 'Tecnologia'];

  useEffect(() => {
    let result = [...products];

    // Filter by Search
    if (searchParam) {
      const lowerSearch = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Mock date or just use ID/newArrival flag
        result.sort((a, b) => (b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1));
        break;
      default:
        // Relevance (default order)
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortOption, priceRange, searchParam]);

  // Sync state with URL param if it changes externally
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  return (
    <div className="min-h-screen bg-geek-dark pt-20 pb-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-display font-bold text-white">
             {searchParam ? `Busca: "${searchParam}"` : 'Loja'}
           </h1>
           <p className="text-gray-400 text-sm mt-1">{filteredProducts.length} itens encontrados</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg py-2 text-white"
          >
            <Filter className="h-4 w-4" /> Filtros
          </button>
          
          <div className="relative flex-1 md:flex-none">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full md:w-48 appearance-none bg-white/5 border border-white/10 text-white py-2 px-4 rounded-lg focus:outline-none focus:border-geek-purple cursor-pointer"
            >
              <option value="relevance" className="bg-geek-dark">Relevância</option>
              <option value="price-asc" className="bg-geek-dark">Menor Preço</option>
              <option value="price-desc" className="bg-geek-dark">Maior Preço</option>
              <option value="newest" className="bg-geek-dark">Mais Recentes</option>
            </select>
            <SlidersHorizontal className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters (Desktop) & Mobile Modal */}
        <aside className={`
          fixed md:relative inset-0 z-40 bg-geek-dark md:bg-transparent md:block w-full md:w-64 p-6 md:p-0 overflow-y-auto transition-transform duration-300
          ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex justify-between md:hidden mb-6">
            <h2 className="text-xl font-bold text-white">Filtros</h2>
            <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400">Fechar</button>
          </div>

          <div className="space-y-8 sticky top-24">
            
            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-geek-cyan uppercase tracking-wider mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => {
                        setSelectedCategory(cat);
                        setMobileFiltersOpen(false);
                      }}
                      className="accent-geek-purple"
                    />
                    <span className={`text-sm ${selectedCategory === cat ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-bold text-geek-cyan uppercase tracking-wider mb-4">Preço Máximo</h3>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-geek-purple h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>R$ 0</span>
                <span className="text-white font-bold">R$ {priceRange}</span>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">👾</div>
              <h2 className="text-2xl font-bold text-white mb-2">Game Over?</h2>
              <p className="text-gray-400">Nenhum produto encontrado com estes filtros.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('Todos');
                  setPriceRange(200);
                  setSortOption('relevance');
                }}
                className="mt-6 text-geek-purple hover:underline"
              >
                Resetar Filtros
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};