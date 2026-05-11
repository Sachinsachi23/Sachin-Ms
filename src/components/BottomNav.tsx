import { Heart, Home, Map as MapIcon, PlayCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-forest-950/80 backdrop-blur-lg border-t border-forest-800 z-50 px-6 py-3 pb-6 sm:pb-3 max-w-md mx-auto sm:rounded-t-2xl">
      <ul className="flex justify-between items-center">
        <li>
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-forest-700' : 'text-earth-200/60'}`}>
            <Home size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('explore')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reels" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-forest-700' : 'text-earth-200/60'}`}>
            <PlayCircle size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Reels</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-forest-700' : 'text-earth-200/60'}`}>
            <MapIcon size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Map</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-forest-700' : 'text-earth-200/60'}`}>
            <Heart size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('favorites')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-forest-700' : 'text-earth-200/60'}`}>
            <User size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('profile')}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
