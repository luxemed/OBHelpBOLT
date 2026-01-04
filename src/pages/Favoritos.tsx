import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FavoritoItem {
  id: string;
  icon: string;
  label: string;
  description: string;
  path: string;
  color: string;
  bgColor: string;
  count: number;
}

const todosRecursos: FavoritoItem[] = [
  { id: 'ig', icon: 'calculate', label: 'Cálculo de IG', description: 'Idade gestacional por DUM e USG', path: '/calc/ig', color: 'text-blue-500', bgColor: 'bg-blue-50', count: 45 },
  { id: 'ctg', icon: 'show_chart', label: 'Cardiotocografia', description: 'Interpretação CTG (FIGO)', path: '/flow/ctg/start', color: 'text-orange-500', bgColor: 'bg-orange-50', count: 38 },
  { id: 'usg', icon: 'monitor_heart', label: 'Ultrassonografia', description: 'Biometria e crescimento fetal', path: '/calc/usg', color: 'text-purple-500', bgColor: 'bg-purple-50', count: 32 },
  { id: 'fgr', icon: 'trending_down', label: 'Restrição de Crescimento', description: 'Classificação FGR Barcelona', path: '/calc/fgr', color: 'text-red-500', bgColor: 'bg-red-50', count: 28 },
  { id: 'cromossomopatias', icon: 'genetics', label: 'Cromossomopatias', description: 'Rastreio 1º trimestre', path: '/calc/cromossomopatias', color: 'text-indigo-500', bgColor: 'bg-indigo-50', count: 25 },
  { id: 'guias', icon: 'menu_book', label: 'Guia de Conduta', description: 'Protocolos clínicos', path: '/guides', color: 'text-teal-500', bgColor: 'bg-teal-50', count: 22 },
  { id: 'medicamentos', icon: 'medication', label: 'Medicamentos', description: 'Segurança na gestação', path: '/medications', color: 'text-green-500', bgColor: 'bg-green-50', count: 18 },
  { id: 'pfe', icon: 'straighten', label: 'Peso Fetal Estimado', description: 'Calculadora de PFE', path: '/calc/pfe', color: 'text-cyan-500', bgColor: 'bg-cyan-50', count: 15 },
];

export const Favoritos = () => {
  const navigate = useNavigate();
  const [favoritos] = useState<string[]>(['ig', 'ctg', 'usg', 'fgr', 'cromossomopatias']);

  const favoritosOrdenados = todosRecursos
    .filter(r => favoritos.includes(r.id))
    .sort((a, b) => b.count - a.count);

  const recentes = todosRecursos
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 px-4 py-4 shadow-sm">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white text-center">Favoritos</h1>
      </header>
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-6 max-w-lg mx-auto w-full">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800 dark:text-white">Mais Utilizados</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Baseado no seu uso</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {recentes.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 items-start text-left relative"
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} dark:bg-opacity-20 flex items-center justify-center ${item.color}`}>
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{item.count}x</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">{item.label}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800 dark:text-white">Meus Favoritos</h2>
            <button className="text-xs text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Editar
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            {favoritosOrdenados.length > 0 ? (
              favoritosOrdenados.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index < favoritosOrdenados.length - 1 ? 'border-b border-gray-50 dark:border-gray-700' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} dark:bg-opacity-20 flex items-center justify-center ${item.color}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{item.count}x</span>
                    <span className="material-symbols-outlined text-gray-400 text-xl">chevron_right</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-4xl mb-2">star_border</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum favorito adicionado</p>
                <p className="text-xs text-gray-400 mt-1">Toque no coração em qualquer ferramenta para adicionar</p>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">Acesso Rápido</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">Todos os recursos disponíveis</p>
          
          <div className="grid grid-cols-4 gap-2">
            {todosRecursos.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-1.5"
              >
                <div className={`w-10 h-10 rounded-full ${item.bgColor} dark:bg-opacity-20 flex items-center justify-center ${item.color}`}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium text-center leading-tight line-clamp-2">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
