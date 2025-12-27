import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Halo! Selamat datang di ${BRAND_NAME}. Ada yang bisa saya bantu? 🌸` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error('API Key not found. Please set VITE_OPENROUTER_API_KEY in .env file.');
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': BRAND_NAME,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free', // Using a free model as default, can be changed
          messages: [
            {
              role: 'system',
              content: `You are a helpful and friendly customer service assistant for "${BRAND_NAME}", a small kitchen business selling desserts like Mochi. 
              Be polite, use emojis occasionally, and keep answers concise (under 3-4 sentences if possible). 
              If asked about prices: Mochi is Rp 15.000 (variants: Hitam, Hijau, Putih).
              If asked how to order: Tell them to click the buttons on the product cards to order via WhatsApp.
              The tone should be aesthetic, soft, and welcoming.`
            },
            ...messages,
            userMessage
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: data.choices[0]?.message?.content || 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti.' 
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan koneksi atau API Key belum diatur. Silakan hubungi kami via WhatsApp.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[300px] md:w-[350px] h-[450px] bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-pop-in origin-bottom-right">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-pink-200 to-rose-200 border-b border-white/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center">
                <Sparkles size={16} className="text-brand-dark" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-brand-dark text-sm">CS {BRAND_NAME}</h3>
                <p className="text-[10px] text-brand-dark/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={18} className="text-brand-dark/70" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] p-3 text-sm rounded-2xl
                    ${msg.role === 'user' 
                      ? 'bg-brand-dark text-white rounded-tr-sm' 
                      : 'bg-white/60 border border-white/50 text-brand-dark rounded-tl-sm shadow-sm'
                    }
                  `}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/60 border border-white/50 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white/40 border-t border-white/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 bg-white/60 rounded-full px-4 py-2 border border-white/40 focus-within:border-brand-primary/50 transition-colors shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tulis pesan..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-brand-dark placeholder-brand-dark/40"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-brand-primary disabled:opacity-30 hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-[9px] text-center mt-2 text-gray-400">
              Powered by AI • {BRAND_NAME}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full 
          bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 
          text-white shadow-lg 
          flex items-center justify-center 
          hover:scale-110 hover:rotate-6 transition-all duration-300 animate-float
          ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};
