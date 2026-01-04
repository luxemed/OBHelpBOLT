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
            Politica de Privacidade
          </h2>
        </div>
      ) : (
        <BackHeader title="Politica de Privacidade" />
      )}
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-blue-500 text-2xl">shield</span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Politica de Privacidade</h2>
          </div>

          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-4">
            A sua privacidade e uma prioridade.
          </p>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Coleta de dados</h3>
              <p>
                O OBHelp nao coleta dados sensiveis de pacientes, como nome, CPF, prontuario, exames identificaveis ou qualquer informacao pessoal de saude.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Uso das informacoes</h3>
              <p>
                As informacoes eventualmente inseridas pelo usuario sao utilizadas exclusivamente para o funcionamento local da aplicacao, sem processamento externo ou finalidade comercial.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Armazenamento local</h3>
              <p>
                Dados como favoritos, historico de buscas ou preferencias podem ser armazenados localmente no dispositivo do usuario, quando aplicavel.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Compartilhamento</h3>
              <p>
                O OBHelp nao compartilha informacoes com terceiros.
              </p>
              <p>
                Nao ha venda, cessao ou uso comercial de dados.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Seguranca</h3>
              <p>
                Sao adotadas medidas tecnicas razoaveis de seguranca para proteger as informacoes armazenadas localmente, de acordo com boas praticas de desenvolvimento de software.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Alteracoes nesta politica</h3>
              <p>
                Esta Politica de Privacidade pode ser atualizada periodicamente. Recomenda-se a revisao regular do conteudo.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
