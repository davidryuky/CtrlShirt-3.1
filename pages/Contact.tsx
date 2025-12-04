import React, { useState } from 'react';
import { Send, Terminal, Mail, MapPin, MessageSquare, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quest: '', // Subject
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula envio para API
    setTimeout(() => {
      setLoading(false);
      toast.success(
        <div className="flex flex-col">
          <span className="font-bold">Transmissão Recebida!</span>
          <span className="text-xs text-gray-300">Nossos droides entrarão em contato em breve.</span>
        </div>,
        { duration: 5000, icon: '📡' }
      );
      setFormData({ name: '', email: '', quest: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-geek-dark pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-geek-purple/10 rounded-full mb-4">
            <Terminal className="h-8 w-8 text-geek-purple" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Estabelecer <span className="text-geek-cyan">Conexão</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Encontrou um bug na Matrix? Precisa de ajuda com seu loot? 
            Ou apenas quer debater se Han Solo atirou primeiro? Mande um sinal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Info Side */}
          <div className="col-span-1 space-y-6">
            <div className="bg-geek-card border border-white/5 p-6 rounded-xl hover:border-geek-cyan/30 transition-colors">
              <div className="flex items-center gap-3 text-geek-cyan mb-2">
                <MapPin className="h-5 w-5" />
                <h3 className="font-bold">Base Secreta</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Setor 7G, Neo Tokyo<br/>
                Servidor BR-1
              </p>
            </div>

            <div className="bg-geek-card border border-white/5 p-6 rounded-xl hover:border-geek-cyan/30 transition-colors">
              <div className="flex items-center gap-3 text-geek-cyan mb-2">
                <Mail className="h-5 w-5" />
                <h3 className="font-bold">Canal Seguro</h3>
              </div>
              <p className="text-gray-400 text-sm break-all">
                suporte@ctrlshirt.com<br/>
                help@rebelalliance.org
              </p>
            </div>

            <div className="bg-geek-card border border-white/5 p-6 rounded-xl border-l-4 border-l-yellow-500">
              <div className="flex items-center gap-3 text-yellow-500 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-bold">Aviso</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Não aceitamos créditos imperiais, apenas cartões e Pix.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="col-span-1 md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-geek-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-300">Codinome (Nome)</label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Luke Skywalker"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-geek-purple transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-300">Frequência (Email)</label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="red5@alliance.com"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-geek-purple transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="quest" className="text-sm font-bold text-gray-300">Tipo da Missão (Assunto)</label>
                <select
                  required
                  name="quest"
                  id="quest"
                  value={formData.quest}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-geek-purple transition-colors appearance-none"
                >
                  <option value="" disabled>Selecione um tópico...</option>
                  <option value="order">Onde está meu loot? (Pedidos)</option>
                  <option value="bug">Reportar Bug / Glitch</option>
                  <option value="partnership">Parceria / Guilda</option>
                  <option value="other">Outros assuntos da galáxia</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-300">Log da Mensagem</label>
                <textarea
                  required
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva sua solicitação aqui..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-geek-purple transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-geek-purple hover:bg-violet-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando dados...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Enviar Transmissão
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};