import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Coffee, CloudRain, Mountain, Waves, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';

interface Homestay {
  id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
}

export default function Home() {
  const { t } = useTranslation();
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/homestays')
      .then(res => res.json())
      .then(data => {
        setHomestays(data);
        setLoading(false);
      });
  }, []);

  const categories = [
    { icon: <CloudRain size={20} />, label: t('monsoon'), color: 'text-blue-400' },
    { icon: <Coffee size={20} />, label: t('coffee'), color: 'text-amber-600' },
    { icon: <Mountain size={20} />, label: 'Mountain', color: 'text-emerald-500' },
    { icon: <Waves size={20} />, label: t('waterfall'), color: 'text-cyan-400' },
    { icon: <Zap size={20} />, label: t('budget'), color: 'text-yellow-400' },
  ];

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 relative h-[500px] rounded-3xl overflow-hidden group shadow-2xl"
      >
        <img 
          src="https://images.unsplash.com/photo-1590073242672-ad9481ec18b8?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Nature Stay"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="absolute bottom-12 left-8 right-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-[0.9]"
          >
            {t('tagline')}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <button className="bg-forest-700 hover:bg-forest-800 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-forest-900/50">
              Explore Now
            </button>
            <Link to="/reels" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all">
              Watch Reels
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Horizontal Scroll */}
      <section className="mb-12 overflow-x-auto no-scrollbar -mx-6 px-6">
        <div className="flex gap-4 pb-4">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 p-4 bg-forest-900/40 border border-forest-800 rounded-3xl min-w-[120px] backdrop-blur-sm group hover:border-forest-700 transition-all"
            >
              <div className={`${cat.color} p-3 bg-forest-950 rounded-2xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-earth-200/80 group-hover:text-white">{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white">{t('trending')}</h2>
            <div className="h-1 w-12 bg-forest-700 rounded-full mt-2" />
          </div>
          <button className="text-sm font-bold uppercase tracking-widest text-forest-700 hover:text-forest-600 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-forest-900/50 rounded-3xl animate-pulse" />
            ))
          ) : (
            homestays.map((home, idx) => (
              <motion.div
                key={home.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/homestay/${home.id}`}>
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={home.image} 
                      alt={home.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-xs font-bold text-white">{home.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-forest-700 transition-colors">{home.name}</h3>
                  <div className="flex items-center gap-2 text-earth-200/60 text-sm mb-2 font-medium">
                    <MapPin size={14} />
                    <span>{home.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{formatCurrency(home.price)} <span className="text-xs font-normal text-earth-200/60 tracking-wider">/ NIGHT</span></span>
                    <div className="flex gap-1">
                      {home.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="text-[9px] uppercase font-bold tracking-tighter bg-forest-900 border border-forest-800 px-2 py-1 rounded-md text-emerald-400">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Monsoon Escapes Banners */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-64 rounded-3xl overflow-hidden group shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" 
            alt="Monsoon Sale"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-forest-900/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Exclusive Offer</span>
            <h3 className="text-3xl font-display font-bold text-white mb-4">Monsoon Weekend<br/>Getaway 20% OFF</h3>
            <button className="w-fit bg-emerald-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/50">
              Redeem Code
            </button>
          </div>
        </div>
        <div className="relative h-64 rounded-3xl overflow-hidden group shadow-lg">
           <img 
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" 
            alt="Hidden Gems"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-amber-900/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
            <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">{t('hiddenGems')}</span>
            <h3 className="text-3xl font-display font-bold text-white mb-4">Explore Private<br/>Waterfalls in Wayanad</h3>
            <button className="w-fit border-2 border-white/30 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-forest-950 transition-all">
              Discover Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
