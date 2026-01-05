import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BackHeader } from '../components/BackHeader';

export const TermosUso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const isFromLogin = location.pathname === '/termos' && !user;

  const handleBack = () => {
    if (isFromLogin) {
      navigate('/login');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 ${isFromLogin ? 'pb-8' : 'pb-24'}`}>
      {isFromLogin ? (
        <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#1a202c]/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <button
            onClick={handleBack}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-10 truncate">
            Termos de Uso
          </h2>
        </div>
      ) : (
        <BackHeader title="Termos de Uso" />
      )}
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-blue-500 text-2xl">gavel</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Termos de Uso</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Destinação</h3>
              <p>
                O OBHelp é destinado exclusivamente a profissionais de saúde legalmente habilitados.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Natureza das informações</h3>
              <p>
                As informações disponibilizadas têm caráter educacional e de apoio à decisão clínica.
              </p>
              <p className="mt-2">
                O aplicativo não fornece diagnóstico médico, não prescreve tratamentos e não substitui avaliação clínica presencial.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Responsabilidade profissional</h3>
              <p>
                A responsabilidade por decisões clínicas, prescrições, condutas e interpretações é inteiramente do profissional usuário.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Atualizações</h3>
              <p>
                O conteúdo do aplicativo pode ser atualizado, modificado ou expandido a qualquer momento, sem aviso prévio, visando melhoria contínua e alinhamento com novas evidências científicas.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Uso indevido</h3>
              <p>
                O uso do aplicativo fora de sua finalidade médica ou em desacordo com estes termos não é de responsabilidade dos desenvolvedores.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
