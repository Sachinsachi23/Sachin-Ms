import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Star, MapPin, Heart, Share2, Coffee, Wifi, ShieldCheck, Calendar, Users, Info } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface Homestay {
  id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

export default function HomestayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [homestay, setHomestay] = useState<Homestay | null>(null);

  useEffect(() => {
    fetch('/api/homestays')
      .then(res => res.json())
      .then(data => {
        const found = data.find((h: any) => h.id === id);
        setHomestay(found);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (!homestay) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-forest-950 min-h-screen">
      {/* Header Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={homestay.image} 
          alt={homestay.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-black/30" />
        
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Share2 size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 relative z-10 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-forest-900 border border-forest-800 rounded-[32px] p-8 shadow-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">
                {homestay.category}
              </span>
              <h1 className="text-4xl font-display font-bold text-white mb-2">{homestay.name}</h1>
              <div className="flex items-center gap-2 text-earth-200/60 font-medium">
                <MapPin size={16} />
                <span>{homestay.location}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 bg-forest-800 px-3 py-1.5 rounded-full border border-forest-700">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="text-sm font-bold text-white">{homestay.rating}</span>
              </div>
              <span className="text-xs text-earth-200/40 mt-2 font-medium">128 reviews</span>
            </div>
          </div>

          <div className="h-px bg-forest-800 my-8" />

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-forest-800/50 p-4 rounded-2xl border border-forest-800">
              <Users className="text-forest-700 mb-2" size={20} />
              <span className="block text-xs font-bold text-white leading-tight">4 Guests<br/><span className="text-earth-200/40 font-normal">2 Bedrooms</span></span>
            </div>
            <div className="bg-forest-800/50 p-4 rounded-2xl border border-forest-800">
              <Calendar className="text-forest-700 mb-2" size={20} />
              <span className="block text-xs font-bold text-white leading-tight">Aug 24-26<br/><span className="text-earth-200/40 font-normal">Availability</span></span>
            </div>
            <div className="bg-forest-800/50 p-4 rounded-2xl border border-forest-800">
              <ShieldCheck className="text-forest-700 mb-2" size={20} />
              <span className="block text-xs font-bold text-white leading-tight">Verified<br/><span className="text-earth-200/40 font-normal">Host</span></span>
            </div>
          </div>

          <h3 className="text-xl font-display font-bold text-white mb-4">About this stay</h3>
          <p className="text-earth-200/70 leading-relaxed mb-8">
            {homestay.description}
          </p>

          <h3 className="text-xl font-display font-bold text-white mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-earth-200/80">
              <Coffee size={18} className="text-forest-700" />
              <span>Organic Coffee</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-earth-200/80">
              <Wifi size={18} className="text-forest-700" />
              <span>Gigabit Wi-Fi</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-earth-200/80">
              <Users size={18} className="text-forest-700" />
              <span>Local Guide</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-earth-200/80">
              <Info size={18} className="text-forest-700" />
              <span>Trek Assistance</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-forest-950/80 backdrop-blur-xl border-t border-forest-800 z-[100] max-w-md mx-auto rounded-t-3xl sm:static sm:max-w-7xl sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:p-0 sm:mt-12">
        <div className="flex items-center justify-between gap-6 sm:bg-forest-900 sm:p-8 sm:rounded-[32px] sm:border sm:border-forest-800 sm:max-w-7xl sm:mx-auto sm:mb-12">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-earth-200/40 block mb-1">Total Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{formatCurrency(homestay.price)}</span>
              <span className="text-xs text-earth-200/40 font-medium">/ night</span>
            </div>
          </div>
          <button className="bg-forest-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-forest-800 transition-all shadow-xl shadow-forest-900/50 flex-1 sm:flex-none">
            {t('bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
