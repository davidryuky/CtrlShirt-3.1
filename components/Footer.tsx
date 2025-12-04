import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Github, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-24 md:pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-6 w-6 text-geek-cyan" />
              <span className="font-display font-bold text-xl text-white">CTRL<span className="text-geek-purple">SHIRT</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              Vestuário premium para quem vive a cultura geek. De gamers para gamers, com qualidade lendária.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Loja</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?sort=newest" className="hover:text-geek-purple transition-colors">Lançamentos</Link></li>
              <li><Link to="/products?sort=relevance" className="hover:text-geek-purple transition-colors">Mais Vendidos</Link></li>
              <li><Link to="/products" className="hover:text-geek-purple transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-geek-purple transition-colors">Rastreamento</Link></li>
              <li><Link to="/contact" className="hover:text-geek-purple transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/contact" className="hover:text-geek-purple transition-colors">Fale Conosco / FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 CtrlShirt. All rights reserved. Made with &lt;/&gt; and ☕.</p>
          <div className="flex gap-4">
            <span className="px-2 py-1 bg-white/5 rounded">VISA</span>
            <span className="px-2 py-1 bg-white/5 rounded">MASTER</span>
            <span className="px-2 py-1 bg-white/5 rounded">PIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};