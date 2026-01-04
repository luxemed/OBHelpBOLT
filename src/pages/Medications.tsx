import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/BackHeader';
import { ALL_MEDICATIONS } from '../data/medications';
import { Medication } from '../types/medication';

export const Medications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentMeds] = useState<Medication[]>([
    ALL_MEDICATIONS[0],
    ALL_MEDICATIONS[8],
    ALL_MEDICATIONS[ALL_MEDICATIONS.length - 3]
  ]);

  const filteredSuggestions = ALL_MEDICATIONS.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMed = (med: Medication) => {
    setSearchTerm('');
    navigate('/medications/details', { state: { med } });
  };

  const getRiskStyles = (risk: string) => {
    if (risk.includes("A") || risk === "B") return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-green-600/20";
    if (risk === "X" || risk.includes("D")) return "bg-red-50 dark:bg-red-900/30 text-urgent dark:text-red-400 ring-red-600/20";
    return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-yellow-600/20";
  };

  const getIconStyles = (risk: string) => {
    if (risk.includes("A") || risk === "B") return "bg-gray-50 dark:bg-gray-800 text-primary";
    if (risk === "X" || risk.includes("D")) return "bg-gray-50 dark:bg-gray-800 text-urgent";
    return "bg-gray-50 dark:bg-gray-800 text-alert";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <BackHeader title="Medicamentos" />

      <main className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar medicamento..."
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {searchTerm && filteredSuggestions.length > 0 && (
          <div className="bg-white dark:bg-[#1e2329] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 max-h-[400px] overflow-y-auto">
            {filteredSuggestions.slice(0, 10).map((med, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectMed(med)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles(med.risk)}`}>
                  <span className="material-symbols-outlined text-[20px]">{med.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm truncate">{med.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{med.type}</div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-bold ring-1 ring-inset ${getRiskStyles(med.risk)}`}>
                  {med.risk}
                </div>
              </button>
            ))}
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Recentes</h3>
          <div className="space-y-2">
            {recentMeds.map((med, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectMed(med)}
                className="w-full bg-white dark:bg-[#1e2329] rounded-xl p-4 shadow-soft hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-4 border border-slate-100 dark:border-slate-800"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconStyles(med.risk)}`}>
                  <span className="material-symbols-outlined text-[24px]">{med.icon}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white text-base truncate">{med.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{med.desc}</div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ring-1 ring-inset flex-shrink-0 ${getRiskStyles(med.risk)}`}>
                  {med.risk}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
