import { useLocation } from 'react-router-dom';
import { BackHeader } from '../components/BackHeader';
import { MEDICATION_DETAILS_DB, GENERIC_DETAILS } from '../data/medications';
import { Medication } from '../types/medication';

export const MedicationDetail = () => {
  const location = useLocation();
  const med = location.state?.med as Medication | undefined;

  if (!med) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <BackHeader title="Medicamento" />
        <div className="p-4">Medicamento não encontrado.</div>
      </div>
    );
  }

  const details = MEDICATION_DETAILS_DB[med.name] || GENERIC_DETAILS;

  const getRiskStyles = (risk: string) => {
    if (risk.includes("A") || risk === "B") return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-green-600/20";
    if (risk === "X" || risk.includes("D")) return "bg-red-50 dark:bg-red-900/30 text-urgent dark:text-red-400 ring-red-600/20";
    return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-yellow-600/20";
  };

  const CardSection = ({ title, icon, children, color = "text-primary" }: { title: string; icon: string; children: React.ReactNode; color?: string }) => (
    <div className="bg-white dark:bg-[#1e2329] rounded-xl p-5 shadow-soft border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
        <span className={`material-symbols-outlined ${color}`}>{icon}</span>
        <h3 className={`text-sm font-bold uppercase tracking-wider ${color} dark:text-white`}>{title}</h3>
      </div>
      <div className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed">
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <BackHeader title={med.name} />

      <main className="flex-1 p-4 space-y-4 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between bg-white dark:bg-[#1e2329] p-4 rounded-xl shadow-soft border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Classificação</span>
            <span className="text-slate-900 dark:text-white font-bold text-lg">{med.type}</span>
          </div>
          <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg ring-1 ring-inset ${getRiskStyles(med.risk)}`}>
            <span className="text-[10px] uppercase font-bold opacity-80">Risco FDA</span>
            <span className="text-2xl font-bold leading-none">{med.risk}</span>
          </div>
        </div>

        <CardSection title="Indicação na Gestação" icon="medical_services">
          <p>{details.indication}</p>
        </CardSection>

        <CardSection title="Posologia" icon="schedule">
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-slate-400 font-bold min-w-[80px]">Inicial:</span>
              <span>{details.posology.start}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-slate-400 font-bold min-w-[80px]">Manut.:</span>
              <span>{details.posology.maintenance}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-slate-400 font-bold min-w-[80px]">Máxima:</span>
              <span>{details.posology.max}</span>
            </li>
            {details.posology.adjustments && details.posology.adjustments !== "-" && (
              <li className="mt-2 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg text-xs">
                <strong>Ajuste:</strong> {details.posology.adjustments}
              </li>
            )}
          </ul>
          <p className="mt-3 text-[10px] text-slate-400 italic border-t border-slate-100 dark:border-slate-700 pt-2">
            Informação para apoio à decisão clínica. A prescrição é responsabilidade do médico.
          </p>
        </CardSection>

        <CardSection title="Efeitos Maternos" icon="pregnant_woman" color="text-pink-600">
          <p>{details.maternal}</p>
        </CardSection>

        <CardSection title="Efeitos Fetais" icon="child_care" color="text-blue-500">
          <p>{details.fetal}</p>
        </CardSection>

        <CardSection title="Contraindicações" icon="block" color="text-red-500">
          <ul className="list-disc pl-4 space-y-1">
            {details.contra.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </CardSection>

        <div className="px-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Evidências & Diretrizes</h4>
          <ul className="space-y-1">
            {details.evidence.map((ref, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1e2329] px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                {ref}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
