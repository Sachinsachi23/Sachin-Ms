import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Reels from './pages/Reels';
import HomestayDetail from './pages/HomestayDetail';
import ExploreMap from './pages/ExploreMap';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminPanel from './pages/AdminPanel';
import AIAssistant from './components/AIAssistant';
import './i18n';

export default function App() {
  return (
    <div className="min-h-screen bg-forest-950">
      <Navbar />
      <main className="pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/homestay/:id" element={<HomestayDetail />} />
          <Route path="/map" element={<ExploreMap />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <AIAssistant />
      <BottomNav />
    </div>
  );
}
