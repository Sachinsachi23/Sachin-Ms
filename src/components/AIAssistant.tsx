import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { askTravelAssistant } from '../services/geminiService';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function AIAssistant() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Namaste! I'm your StayNest AI Assistant. Looking for a hidden gem in India? Ask me about coffee estates, trekking, or monsoon stays!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiRes = await askTravelAssistant(input);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: aiRes, sender: 'ai' };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-forest-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-forest-900 z-[60] border border-forest-500 hover:scale-110 transition-transform active:scale-95"
      >
        <Sparkles size={28} className="animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-28 right-6 w-[calc(100vw-48px)] h-[500px] max-w-sm bg-forest-900 border border-forest-800 rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-bottom border-forest-800 flex justify-between items-center bg-forest-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-forest-700 rounded-xl flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none mb-1">{t('aiAssistant')}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Wisdom</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-earth-200/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-forest-700 text-white rounded-tr-none' 
                      : 'bg-forest-950 border border-forest-800 text-earth-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-forest-950 border border-forest-800 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-forest-700 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-forest-700 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-forest-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-forest-950 border-t border-forest-800">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('askAi')}
                  className="w-full bg-forest-900 border border-forest-800 rounded-2xl px-5 py-3.5 pr-14 text-sm text-white placeholder:text-earth-200/20 focus:outline-none focus:border-forest-700 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-forest-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
