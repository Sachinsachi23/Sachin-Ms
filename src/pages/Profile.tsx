import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { User, LogIn, Settings, Bell, CircleHelp, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';

import { NavLink } from 'react-router-dom';

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 px-6 max-w-lg mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 rounded-3xl bg-forest-900 border border-forest-800 mx-auto flex items-center justify-center mb-4 relative overflow-hidden">
          <User size={48} className="text-forest-700" />
        </div>
        <h1 className="text-2xl font-display font-bold text-white mb-2">Guest Traveler</h1>
        <p className="text-earth-200/40 text-sm font-medium tracking-wide">Sign in to sync your bookings and favorites</p>
      </motion.div>

      <div className="space-y-4">
        <button className="w-full bg-forest-700 p-5 rounded-2xl flex items-center justify-between group hover:bg-forest-800 transition-colors shadow-lg shadow-forest-900/50">
          <div className="flex items-center gap-4">
            <LogIn size={20} className="text-white" />
            <span className="font-bold text-white">{t('login')} / {t('signup')}</span>
          </div>
          <ChevronRight size={18} className="text-white/40 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="bg-forest-900/50 border border-forest-800 rounded-3xl p-2 space-y-1">
          <NavLink to="/owner" className="w-full p-4 rounded-2xl flex items-center justify-between group hover:bg-forest-800/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-forest-950 flex items-center justify-center text-forest-700 group-hover:text-emerald-400 transition-colors">
                <Settings size={18} />
              </div>
              <span className="text-sm font-bold text-earth-100">Owner Dashboard (Demo)</span>
            </div>
            <ChevronRight size={16} className="text-earth-200/20" />
          </NavLink>
          
          <NavLink to="/admin" className="w-full p-4 rounded-2xl flex items-center justify-between group hover:bg-forest-800/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-forest-950 flex items-center justify-center text-forest-700 group-hover:text-rose-500 transition-colors">
                <ShieldCheck size={18} />
              </div>
              <span className="text-sm font-bold text-earth-100">Admin Control (Demo)</span>
            </div>
            <ChevronRight size={16} className="text-earth-200/20" />
          </NavLink>

          {[
            { icon: <Bell size={18} />, label: "Notifications" },
            { icon: <CircleHelp size={18} />, label: "Support" },
          ].map((item) => (
            <button key={item.label} className="w-full p-4 rounded-2xl flex items-center justify-between group hover:bg-forest-800/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-forest-950 flex items-center justify-center text-forest-700 group-hover:text-emerald-400 transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-earth-100">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-earth-200/20" />
            </button>
          ))}
        </div>

        <button className="w-full p-5 flex items-center justify-center gap-2 text-rose-500 font-bold hover:bg-rose-500/10 rounded-2xl transition-colors">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      <div className="mt-12 text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-earth-200/20">Version 1.0.4 • Beta</span>
      </div>
    </div>
  );
}
