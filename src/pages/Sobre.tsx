import { BackHeader } from '../components/BackHeader';

export const Sobre = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] pb-24">
      <BackHeader title="Sobre" />
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-5 max-w-lg mx-auto w-full">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl">medical_information</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">OBHelp</h2>
              <p className="text-sm text-gray-500">Versão 1.0.0</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              O <strong>OBHelp</strong> é uma ferramenta digital de apoio à decisão clínica voltada para médicos e especialistas em obstetrícia e medicina fetal.
            </p>

            <p>
              O aplicativo reúne guias de conduta, calculadoras obstétricas, análise estruturada de cardiotocografia e informações medicamentosas baseadas em diretrizes reconhecidas.
            </p>

            <p>
              O objetivo do OBHelp é otimizar o raciocínio clínico, facilitar o acesso rápido à informação e apoiar a prática médica diária em consultório, pronto atendimento e centro obstétrico.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                <strong>Aviso:</strong> O OBHelp não substitui o julgamento clínico, a experiência do profissional nem protocolos institucionais locais.
              </p>
            </div>

            <p>
              <strong>Público-alvo:</strong> Profissionais de saúde habilitados.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Desenvolvido para apoiar a prática obstétrica baseada em evidências.
          </p>
        </div>
      </main>
    </div>
  );
};
