import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PendingApproval = () => {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden justify-center items-center p-4">
      <div className="w-full max-w-[480px] flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
            <span className="material-symbols-outlined text-5xl">hourglass_top</span>
          </div>
          <h1 className="text-[#121417] dark:text-white tracking-tight text-[28px] font-bold leading-tight text-center">
            Aguardando Aprovacao
          </h1>
          <p className="text-[#677283] dark:text-gray-400 text-base font-normal leading-normal pt-2 text-center px-4">
            Seu cadastro foi realizado com sucesso!
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e2430] rounded-2xl shadow-sm border border-[#eef0f3] dark:border-gray-800 p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-blue-600 text-xl">verified_user</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Verificacao em andamento</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Um administrador ira revisar seu cadastro para confirmar que voce e um profissional de saude habilitado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-green-600 text-xl">mail</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notificacao por email</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Voce recebera um email em <strong>{profile?.email}</strong> assim que sua conta for aprovada.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-purple-600 text-xl">schedule</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Prazo estimado</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                O processo de aprovacao geralmente leva ate 24 horas uteis.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
            <strong>Dica:</strong> Enquanto aguarda, voce pode explorar os termos de uso e politica de privacidade do OBHelp.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined mr-2">logout</span>
          Sair da conta
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} OBHelp - Apoio Clinico em Obstetricia
          </p>
        </div>
      </div>
    </div>
  );
};
