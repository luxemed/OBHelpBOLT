import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BackHeader } from '../components/BackHeader';

export const PoliticaPrivacidade = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const isFromLogin = location.pathname === '/privacidade' && !user;

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
            Política de Privacidade
          </h2>
        </div>
      ) : (
        <BackHeader title="Política de Privacidade" />
      )}
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-blue-500 text-2xl">shield</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Política de Privacidade</h2>
          </div>

          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-4">
            A sua privacidade é uma prioridade.
          </p>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Coleta de dados</h3>
              <p>
                O OBHelp não coleta dados sensíveis de pacientes, como nome, CPF, prontuário, exames identificáveis ou qualquer informação pessoal de saúde.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Uso das informações</h3>
              <p>
                As informações eventualmente inseridas pelo usuário são utilizadas exclusivamente para o funcionamento local da aplicação, sem processamento externo ou finalidade comercial.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Armazenamento local</h3>
              <p>
                Dados como favoritos, histórico de buscas ou preferências podem ser armazenados localmente no dispositivo do usuário, quando aplicável.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Compartilhamento</h3>
              <p>
                O OBHelp não compartilha informações com terceiros.
              </p>
              <p>
                Não há venda, cessão ou uso comercial de dados.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Segurança</h3>
              <p>
                São adotadas medidas técnicas razoáveis de segurança para proteger as informações armazenadas localmente, de acordo com boas práticas de desenvolvimento de software.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Alterações nesta política</h3>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente. Recomenda-se a revisão regular do conteúdo.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
