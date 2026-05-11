import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Heart, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto h-screen flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 rounded-[40px] bg-forest-900 border border-forest-800 flex items-center justify-center mb-8"
      >
        <Heart size={48} className="text-rose-500/20" />
      </motion.div>
      <h2 className="text-3xl font-display font-bold text-white mb-4">No favorites yet</h2>
      <p className="text-earth-200/40 max-w-xs mb-8 text-sm leading-relaxed">
        Discover hidden gems across India and save them here for your next nature getaway.
      </p>
      <Link to="/">
        <button className="bg-forest-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-forest-800 transition-all shadow-xl shadow-forest-900/50">
          Start Exploring
        </button>
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-3xl opacity-10">
        <div className="w-96 h-96 bg-forest-700 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
