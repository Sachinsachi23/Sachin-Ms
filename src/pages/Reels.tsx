import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Heart, MessageCircle, Share2, Music2, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Reel {
  id: string;
  name: string;
  location: string;
  videoUrl: string;
  rating: number;
}

export default function Reels() {
  const { t } = useTranslation();
  const [reels, setReels] = useState<Reel[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/homestays')
      .then(res => res.json())
      .then(data => setReels(data));
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / window.innerHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="reel-scroll bg-black"
    >
      {reels.map((reel, idx) => (
        <div key={reel.id} className="reel-item relative group">
          <video
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Overlay Info */}
          <div className="absolute bottom-28 left-6 right-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeIndex === idx ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-3"
            >
              <div className="w-10 h-10 rounded-full border-2 border-forest-500 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=host" alt="Host" />
              </div>
              <span className="font-bold text-white text-sm">StayNest Host • </span>
              <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full backdrop-blur-md hover:bg-emerald-400 hover:text-black transition-all">
                Book Now
              </button>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={activeIndex === idx ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-2xl font-display font-bold text-white mb-2"
            >
              {reel.name}
            </motion.h2>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={activeIndex === idx ? { opacity: 1, x: 0 } : {}}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-4 text-xs font-medium text-earth-100/80 mb-4"
            >
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-emerald-400" />
                <span>{reel.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>{reel.rating}</span>
              </div>
            </motion.div>

            <div className="flex items-center gap-2 overflow-hidden max-w-[200px]">
               <Music2 size={12} className="text-white animate-pulse shrink-0" />
               <div className="whitespace-nowrap animate-marquee text-[10px] font-medium text-white/60">
                 Native Nature Soundscape - Coffee Estate Morning Vibes
               </div>
            </div>
          </div>

          {/* Side Actions */}
          <div className="absolute bottom-32 right-4 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1">
              <button className="w-12 h-12 rounded-full bg-forest-900/40 backdrop-blur-xl border border-forest-800 flex items-center justify-center text-white hover:text-rose-500 transition-colors">
                <Heart size={24} />
              </button>
              <span className="text-[10px] font-bold text-white">42.5K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="w-12 h-12 rounded-full bg-forest-900/40 backdrop-blur-xl border border-forest-800 flex items-center justify-center text-white">
                <MessageCircle size={24} />
              </button>
              <span className="text-[10px] font-bold text-white">1.2K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="w-12 h-12 rounded-full bg-forest-900/40 backdrop-blur-xl border border-forest-800 flex items-center justify-center text-white">
                <Share2 size={24} />
              </button>
              <span className="text-[10px] font-bold text-white">Share</span>
            </div>
            <Link to={`/homestay/${reel.id}`} className="mt-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-forest-700 p-0.5 overflow-hidden shadow-lg border border-forest-500"
              >
                <img src={reel.image} className="w-full h-full object-cover rounded-[10px]" alt="Homestay" />
              </motion.div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
