import { BackHeader } from '../components/BackHeader';

export const Sobre = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
      <BackHeader title="Sobre" />
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-5 max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl">medical_information</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">OBHelp</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Versao 1.0.0</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <h3 className="text-base font-bold text-gray-800 dark:text-white">Sobre o OBHelp</h3>
            
            <p>
              O <strong>OBHelp</strong> e uma ferramenta digital de apoio a decisao clinica desenvolvida para medicos e especialistas em obstetricia e medicina fetal.
            </p>

            <p>
              O aplicativo reune guias de conduta, calculadoras obstetricas, analise estruturada de cardiotocografia e informacoes medicamentosas, organizadas a partir de diretrizes nacionais e internacionais reconhecidas.
            </p>

            <p>
              O objetivo do OBHelp e otimizar o raciocinio clinico, facilitar o acesso rapido a informacao relevante e apoiar a pratica medica diaria em consultorio, pronto atendimento e centro obstetrico, sem substituir a avaliacao clinica individual.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <h3 className="text-base font-bold text-gray-800 dark:text-white">Sobre o desenvolvedor</h3>
            
            <p>
              Sou medico, com atuacao em obstetricia e medicina fetal, envolvido diariamente com tomada de decisao clinica, seguimento de gestantes de alto e baixo risco e uso pratico de diretrizes baseadas em evidencia.
            </p>

            <p>
              O OBHelp surgiu da necessidade real de centralizar informacoes confiaveis, reduzir o tempo de busca em multiplas fontes e oferecer suporte objetivo ao raciocinio clinico, respeitando a autonomia e a responsabilidade profissional do medico.
            </p>

            <p>
              O desenvolvimento do aplicativo segue principios de medicina baseada em evidencias, seguranca da informacao e uso etico da tecnologia em saude.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>Aviso:</strong> O OBHelp nao substitui o julgamento clinico, a experiencia profissional ou protocolos institucionais locais.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Publico-alvo:</strong> Profissionais de saude legalmente habilitados.
          </p>
        </div>
      </main>
    </div>
  );
};
