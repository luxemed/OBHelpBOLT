import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const getInitials = (name: string | undefined) => {
    if (!name) return '??';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getDisplayName = (name: string | undefined) => {
    if (!name) return 'Usuário';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-[#f5f7fa] dark:bg-gray-900">
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="OBHelp" className="w-9 h-9 object-contain" />
          <h1 className="text-lg font-bold text-[#121417] dark:text-white">OBHelp</h1>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="relative cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-700 shadow-sm bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-300 font-bold text-sm">{getInitials(profile?.nome)}</span>
          </div>
        </button>
      </header>

      <main className="flex-1 px-4 pt-5 flex flex-col gap-6 max-w-lg mx-auto w-full">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold text-[#121417] dark:text-white leading-tight">Olá, Dr(a). {getDisplayName(profile?.nome)}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Painel de Decisão Clínica</p>
        </div>

        <section className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#121417] dark:text-white">Ferramentas Essenciais</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/calc/ig')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <span className="material-symbols-outlined text-2xl">calculate</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Cálculo de Idade Gestacional</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Por DUM e ultrassom</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/flow/ctg/start')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left relative"
            >
              <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Urgente</span>
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <span className="material-symbols-outlined text-2xl">monitor_heart</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Cardiotocografia</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Interpretação padronizada de CTG (FIGO)</p>
              </div>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#121417] dark:text-white">Guias e Protocolos</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/guides')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Guia de Conduta</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Conduta clínica baseada em diretrizes</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/medications')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <span className="material-symbols-outlined text-2xl">medication</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Medicamentos</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Segurança na gestação</p>
              </div>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#121417] dark:text-white">Avaliações Específicas</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/calc/usg')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                <span className="material-symbols-outlined text-2xl">preview</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Ultrassonografia (USG)</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avaliação biométrica e crescimento fetal</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/restricao-crescimento')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <span className="material-symbols-outlined text-2xl">pregnancy</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Restrição de Crescimento e Doppler</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avaliação de crescimento fetal e Doppler</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/cromossomopatias')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center text-pink-500">
                <span className="material-symbols-outlined text-2xl">genetics</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Cromossomopatias</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Risco e rastreio de aneuploidias</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/pre-eclampsia')}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                <span className="material-symbols-outlined text-2xl">heart_broken</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-sm font-bold text-[#121417] dark:text-white">Pré-eclâmpsia</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estratificação e conduta</p>
              </div>
            </button>
          </div>
        </section>

      </main>

    </div>
  );
};
