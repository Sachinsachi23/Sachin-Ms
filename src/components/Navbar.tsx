import { Search, MapPin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [showLangs, setShowLangs] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLangs(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center shadow-lg shadow-forest-900/50">
          <MapPin className="text-earth-100" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-white leading-none">StayNest</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-forest-700 font-bold">India</span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowLangs(!showLangs)}
          className="w-10 h-10 rounded-full bg-forest-900/50 backdrop-blur-md border border-forest-800 flex items-center justify-center text-earth-200"
        >
          <Globe size={18} />
        </button>
        
        <AnimatePresence>
          {showLangs && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-16 right-6 bg-forest-900 border border-forest-800 rounded-2xl p-2 w-32 shadow-2xl z-50 overflow-hidden"
            >
              {['en', 'hi', 'kn'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-forest-800 transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ'}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button className="w-10 h-10 rounded-full bg-forest-900/50 backdrop-blur-md border border-forest-800 flex items-center justify-center text-earth-200">
          <Search size={18} />
        </button>
      </div>
    </header>
  );
}
