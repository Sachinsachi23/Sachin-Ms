import { ShieldCheck, Users, Hotel, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function AdminPanel() {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto pb-32">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-900/50">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-1">Central Command</h1>
          <p className="text-earth-200/40 text-[10px] tracking-[0.4em] uppercase font-bold">StayNest India Oversight</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-xl font-bold text-white">Approval Queue</h2>
             <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase tracking-widest">3 Pending</span>
          </div>
          
          <div className="bg-forest-900 border border-forest-800 rounded-[32px] overflow-hidden">
            {[1, 2].map((item) => (
              <div key={item} className="p-6 border-b border-forest-800 last:border-0 hover:bg-forest-800/20 transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-forest-950 flex-shrink-0 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-1542314831-${item}68cd1dbfeeb`} className="w-full h-full object-cover opacity-60" alt="New Stay" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Wayanad Valley View {item}</h4>
                      <p className="text-earth-200/40 text-sm mb-2">Host: Arjun Sharma • Kerala</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-forest-800 text-earth-200/60 rounded">Waterfall</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-forest-800 text-earth-200/60 rounded">Trekking</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-xl bg-forest-950 text-emerald-500 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                      <CheckCircle size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-xl bg-forest-950 text-rose-500 border border-rose-500/20 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Mini */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white">Quick Analytics</h2>
           <div className="bg-forest-900 border border-forest-800 rounded-[32px] p-6 space-y-6">
              {[
                { icon: <Users size={18} />, label: "Active Users", value: "1,248" },
                { icon: <Hotel size={18} />, label: "Total Stays", value: "42" },
                { icon: <CreditCard size={18} />, label: "Monthly Gross", value: formatCurrency(1250000) },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-forest-950 flex items-center justify-center text-forest-700 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-earth-200/20 uppercase tracking-[0.2em]">{stat.label}</span>
                    <div className="font-bold text-white">{stat.value}</div>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-forest-800">
                 <button className="w-full bg-forest-800 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-earth-100 hover:bg-forest-700 transition-colors">
                    View Full Reports
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
