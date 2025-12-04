import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { products } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newProducts = products.filter(p => p.newArrival).slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);

  // Simple auto-rotate for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-geek-dark pb-20 md:pb-0">
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
           {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <img 
            src={activeSlide === 0 ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" : "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop"}
            alt="Hero Background" 
            className={`w-full h-full object-cover transition-opacity duration-1000 ${activeSlide === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          />
          <img 
             src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2665&auto=format&fit=crop"
             alt="Hero Secondary"
             className={`w-full h-full object-cover transition-opacity duration-1000 ${activeSlide === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded bg-geek-purple/20 text-geek-purple border border-geek-purple/50 font-display text-sm mb-4 animate-pulse">
              NOVA COLEÇÃO 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
              VISTA SUA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-geek-purple to-geek-cyan">
                OBSESSÃO
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
              De Cyberpunk a High Fantasy. A melhor seleção de vestuário geek com qualidade premium e estampas exclusivas.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-geek-purple hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                Ver Coleção <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-white/5 bg-geek-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-geek-purple/10 rounded-full text-geek-purple">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-bold font-display">Frete Grátis</h4>
                <p className="text-sm text-gray-400">Em compras acima de R$ 200</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-geek-cyan/10 rounded-full text-geek-cyan">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-bold font-display">Compra Segura</h4>
                <p className="text-sm text-gray-400">Proteção SSL de ponta a ponta</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-pink-500/10 rounded-full text-pink-500">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-white font-bold font-display">Entrega Flash</h4>
                <p className="text-sm text-gray-400">Receba em até 48 horas*</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-white mb-8 border-l-4 border-geek-cyan pl-4">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Anime', 'Filmes', 'Séries', 'Games', 'HQs', 'Tecnologia'].map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`} className="group relative h-40 overflow-hidden rounded-xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
              <img 
                src={`https://source.unsplash.com/featured/300x400?${cat.toLowerCase()},technology`} 
                alt={cat}
                // Fallback since source.unsplash is deprecated/unreliable sometimes, using picsum with seed for consistency
                onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/${cat}/300/400`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-0 right-0 text-center z-20 font-bold text-white group-hover:text-geek-cyan transition-colors">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
             <h2 className="text-3xl font-display font-bold text-white border-l-4 border-geek-purple pl-4">Destaques</h2>
             <Link to="/products" className="text-geek-purple hover:text-white transition-colors text-sm font-semibold flex items-center">
               Ver Tudo <ArrowRight className="h-4 w-4 ml-1" />
             </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative bg-gradient-to-r from-geek-purple to-blue-600 h-64 flex items-center shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
           <div className="relative z-10 px-8 md:px-16 text-white">
             <h3 className="text-4xl font-display font-black mb-2">LEVEL UP YOUR STYLE</h3>
             <p className="mb-6 text-lg text-white/90">Use o cupom <span className="font-mono bg-white text-geek-purple px-2 py-1 rounded font-bold">GEEK2025</span> para 15% OFF.</p>
             <Link to="/products" className="bg-white text-geek-purple font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
               Aproveitar Oferta
             </Link>
           </div>
           <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-black/50 to-transparent hidden md:block"></div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-white mb-8 border-l-4 border-green-500 pl-4">Recém Chegados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};