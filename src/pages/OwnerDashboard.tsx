import { motion } from 'motion/react';
import { LayoutDashboard, Calendar, MessageSquare, Wallet, Plus, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function OwnerDashboard() {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Host Dashboard</h1>
          <p className="text-earth-200/40 text-sm tracking-widest uppercase font-bold">Welcome back, Jungle Lodge Coorg</p>
        </div>
        <button className="bg-forest-700 text-white p-4 rounded-2xl flex items-center gap-2 shadow-xl shadow-forest-900/50">
          <Plus size={20} />
          <span className="font-bold sm:block hidden">Add Listing</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: <Wallet className="text-emerald-400" />, label: "Earnings", value: formatCurrency(245000), trend: "+12%" },
          { icon: <Calendar className="text-blue-400" />, label: "Bookings", value: "18", trend: "+5" },
          { icon: <MessageSquare className="text-amber-400" />, label: "Messages", value: "4", trend: "2 new" },
          { icon: <Plus className="text-rose-400" />, label: "Views", value: "1.2K", trend: "+15%" },
        ].map((stat, i) => (
          <div key={i} className="bg-forest-900 border border-forest-800 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-forest-950 rounded-xl">{stat.icon}</div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">{stat.trend}</span>
            </div>
            <span className="text-xs font-bold text-earth-200/40 uppercase tracking-widest">{stat.label}</span>
            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-display font-bold text-white mb-8">Active Listings</h2>
      <div className="space-y-4">
        <div className="bg-forest-900 border border-forest-800 rounded-3xl p-4 flex items-center justify-between group cursor-pointer hover:border-forest-700 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="w-full h-full object-cover" alt="Stay" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Mist Haven Retreat</h3>
              <div className="flex items-center gap-2 text-earth-200/40 text-xs">
                <span className="text-emerald-400">Available</span>
                <span>•</span>
                <span>Coorg, Karnataka</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 px-4">
            <div className="hidden sm:block">
              <span className="block text-[10px] uppercase font-bold text-earth-200/20 mb-1">Pricing</span>
              <span className="font-bold text-white">{formatCurrency(6800)}</span>
            </div>
            <ChevronRight size={20} className="text-earth-200/20 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
