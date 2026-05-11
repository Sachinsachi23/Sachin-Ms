import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Navigation, Compass, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

export default function ExploreMap() {
  const [homestays, setHomestays] = useState<any[]>([]);
  const [selectedHome, setSelectedHome] = useState<any | null>(null);
  const [center] = useState({ lat: 12.9716, lng: 77.5946 }); // Default center near Karnataka

  useEffect(() => {
    fetch('/api/homestays')
      .then(res => res.json())
      .then(data => setHomestays(data));
  }, []);

  if (!API_KEY) {
    return (
      <div className="h-screen flex items-center justify-center p-8 bg-forest-950">
        <div className="max-w-md text-center bg-forest-900 p-8 rounded-3xl border border-forest-800">
          <Compass className="mx-auto mb-6 text-forest-700" size={64} />
          <h2 className="text-2xl font-display font-bold text-white mb-4">Google Maps Key Required</h2>
          <p className="text-earth-200/60 text-sm mb-8 leading-relaxed">
            Please add your <code className="text-forest-700 bg-forest-950 px-2 py-1 rounded">GOOGLE_MAPS_PLATFORM_KEY</code> in the Secrets panel to enable interactive discovery.
          </p>
          <div className="bg-forest-950 p-4 rounded-xl text-left border border-forest-800">
             <ol className="text-[10px] uppercase font-bold tracking-widest text-earth-200/40 space-y-3">
               <li>1. Open Settings (⚙️ icon)</li>
               <li>2. Go to Secrets</li>
               <li>3. Add GOOGLE_MAPS_PLATFORM_KEY</li>
             </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-20 relative">
      <div className="absolute top-24 left-6 right-6 z-10">
        <div className="bg-forest-950/80 backdrop-blur-xl border border-forest-800 rounded-2xl p-2 flex items-center gap-3 shadow-2xl max-w-lg mx-auto">
          <Search size={18} className="text-earth-200/40 ml-2" />
          <input 
            type="text" 
            placeholder="Search location (e.g. Coorg, Wayanad)"
            className="flex-1 bg-transparent border-none text-earth-100 placeholder:text-earth-200/20 text-sm focus:outline-none"
          />
          <button className="bg-forest-700 p-2.5 rounded-xl text-white">
            <Navigation size={18} />
          </button>
        </div>
      </div>

      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={center}
          defaultZoom={7}
          mapId="STAYNEST_MAP_STYLE"
          className="w-full h-full"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {homestays.map((home) => (
            <AdvancedMarker 
              key={home.id} 
              position={{ lat: home.lat, lng: home.lng }}
              onClick={() => setSelectedHome(home)}
            >
              <motion.div
                whileHover={{ scale: 1.15, y: -5 }}
                className="bg-forest-700 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-xl border-2 border-forest-900 group"
              >
                {formatCurrency(home.price)}
              </motion.div>
            </AdvancedMarker>
          ))}

          {selectedHome && (
            <InfoWindow 
              position={{ lat: selectedHome.lat, lng: selectedHome.lng }}
              onCloseClick={() => setSelectedHome(null)}
            >
               <Link to={`/homestay/${selectedHome.id}`} className="block max-w-[200px]">
                 <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                   <img src={selectedHome.image} className="w-full h-full object-cover" alt={selectedHome.name} />
                 </div>
                 <h4 className="font-bold text-forest-950 mb-1 leading-tight">{selectedHome.name}</h4>
                 <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
                   <MapPin size={10} />
                   <span>{selectedHome.location}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="font-bold text-forest-700">{formatCurrency(selectedHome.price)}</span>
                   <div className="flex items-center gap-1">
                     <Star size={10} className="fill-yellow-400 text-yellow-400" />
                     <span className="text-[10px] font-bold">{selectedHome.rating}</span>
                   </div>
                 </div>
               </Link>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Recommended Filter Pills */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center px-6 overflow-x-auto no-scrollbar pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {['Couple Friendly', 'Pet Friendly', 'Mountain View', 'Private Pool'].map((filter) => (
            <button key={filter} className="bg-forest-950/80 backdrop-blur-md border border-forest-800 text-earth-100/60 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:border-forest-700 hover:text-white transition-all">
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
