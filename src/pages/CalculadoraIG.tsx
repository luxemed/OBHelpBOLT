import { useState } from 'react';
import { BackHeader } from '../components/BackHeader';

interface IGData {
  semanas: number;
  dias: number;
  diasTotais: number;
  dpp: string;
  trimestre: string;
}

interface ResultadoCompleto {
  igDUM?: IGData;
  igUSGResult?: IGData;
  igUSGnoExame?: number;
  diferencaDias?: number;
  decisao?: {
    metodoAdotado: 'DUM' | 'USG';
    justificativa: string;
    limiar: number;
  };
  igAdotada?: IGData;
}

export const CalculadoraIG = () => {
  const [dum, setDum] = useState('');
  const [dataUSG, setDataUSG] = useState('');
  const [ccn, setCcn] = useState('');
  const [igUSG, setIgUSG] = useState({ semanas: '', dias: '' });
  const [resultado, setResultado] = useState<ResultadoCompleto | null>(null);

  const calcularTrimestre = (semanas: number) => {
    if (semanas < 14) return '1º Trimestre';
    if (semanas < 28) return '2º Trimestre';
    return '3º Trimestre';
  };

  const formatarDPP = (data: Date) => {
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const obterLimiarRedatacao = (diasIGnoUSG: number): { limiar: number; descricao: string } => {
    const semanasUSG = diasIGnoUSG / 7;
    
    if (semanasUSG <= 8 + 6/7) {
      return { limiar: 5, descricao: 'até 8 semanas + 6 dias' };
    } else if (semanasUSG <= 13 + 6/7) {
      return { limiar: 7, descricao: '9 a 13 semanas + 6 dias' };
    } else if (semanasUSG <= 15 + 6/7) {
      return { limiar: 7, descricao: '14 a 15 semanas + 6 dias' };
    } else if (semanasUSG <= 21 + 6/7) {
      return { limiar: 10, descricao: '16 a 21 semanas + 6 dias' };
    } else if (semanasUSG <= 27 + 6/7) {
      return { limiar: 14, descricao: '22 a 27 semanas + 6 dias' };
    }
    return { limiar: 21, descricao: 'acima de 28 semanas' };
  };

  const calcularIdadeGestacional = () => {
    const hoje = new Date();
    let resultadoCalc: ResultadoCompleto = {};

    if (dum) {
      const dataDUM = new Date(dum);
      const diffDays = Math.floor((hoje.getTime() - dataDUM.getTime()) / (1000 * 60 * 60 * 24));
      const igSemanas = Math.floor(diffDays / 7);
      const igDias = diffDays % 7;
      
      const dpp = new Date(dataDUM);
      dpp.setDate(dpp.getDate() + 280);
      
      resultadoCalc.igDUM = {
        semanas: igSemanas,
        dias: igDias,
        diasTotais: diffDays,
        dpp: formatarDPP(dpp),
        trimestre: calcularTrimestre(igSemanas)
      };
    }

    if (dataUSG && (igUSG.semanas || ccn)) {
      const dataUltrassom = new Date(dataUSG);
      const diasDesdeUSG = Math.floor((hoje.getTime() - dataUltrassom.getTime()) / (1000 * 60 * 60 * 24));
      
      let diasIGnaUSG = 0;
      if (igUSG.semanas) {
        diasIGnaUSG = (parseInt(igUSG.semanas) * 7) + (parseInt(igUSG.dias) || 0);
      } else if (ccn) {
        const ccnValue = parseFloat(ccn);
        const semanasEstimadas = 5.2876 + (0.1584 * ccnValue) - (0.0007 * ccnValue * ccnValue);
        diasIGnaUSG = Math.round(semanasEstimadas * 7);
      }
      
      resultadoCalc.igUSGnoExame = diasIGnaUSG;
      
      const diasTotais = diasIGnaUSG + diasDesdeUSG;
      const igSemanas = Math.floor(diasTotais / 7);
      const igDias = diasTotais % 7;
      
      const dumCorrigida = new Date(hoje);
      dumCorrigida.setDate(dumCorrigida.getDate() - diasTotais);
      const dpp = new Date(dumCorrigida);
      dpp.setDate(dpp.getDate() + 280);
      
      resultadoCalc.igUSGResult = {
        semanas: igSemanas,
        dias: igDias,
        diasTotais: diasTotais,
        dpp: formatarDPP(dpp),
        trimestre: calcularTrimestre(igSemanas)
      };
    }

    if (resultadoCalc.igDUM && resultadoCalc.igUSGResult && resultadoCalc.igUSGnoExame !== undefined) {
      const diferencaDias = Math.abs(resultadoCalc.igDUM.diasTotais - resultadoCalc.igUSGResult.diasTotais);
      resultadoCalc.diferencaDias = diferencaDias;
      
      const { limiar, descricao } = obterLimiarRedatacao(resultadoCalc.igUSGnoExame);
      
      if (diferencaDias > limiar) {
        resultadoCalc.decisao = {
          metodoAdotado: 'USG',
          justificativa: `IG redefinida pelo USG: discrepância de ${diferencaDias} dias é superior ao limite de ${limiar} dias aceito para IG de ${descricao} conforme diretrizes.`,
          limiar
        };
        resultadoCalc.igAdotada = resultadoCalc.igUSGResult;
      } else {
        resultadoCalc.decisao = {
          metodoAdotado: 'DUM',
          justificativa: `DUM mantida: discrepância de ${diferencaDias} dias é inferior ao limite de ${limiar} dias aceito para IG de ${descricao}.`,
          limiar
        };
        resultadoCalc.igAdotada = resultadoCalc.igDUM;
      }
    } else if (resultadoCalc.igDUM) {
      resultadoCalc.igAdotada = resultadoCalc.igDUM;
      resultadoCalc.decisao = {
        metodoAdotado: 'DUM',
        justificativa: 'IG calculada apenas pela DUM (dados de USG não informados).',
        limiar: 0
      };
    } else if (resultadoCalc.igUSGResult) {
      resultadoCalc.igAdotada = resultadoCalc.igUSGResult;
      resultadoCalc.decisao = {
        metodoAdotado: 'USG',
        justificativa: 'IG calculada apenas pelo USG (DUM não informada).',
        limiar: 0
      };
    }

    if (resultadoCalc.igAdotada) {
      setResultado(resultadoCalc);
    }
  };

  const temDoisMetodos = resultado?.igDUM && resultado?.igUSGResult;

  return (
    <div className="flex flex-col min-h-screen bg-[#e8f4fc] dark:bg-gray-900 pb-24">
      <BackHeader title="Idade Gestacional" />
      
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">Sincronizar IG por DUM e USG</p>
        
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 shadow-sm border border-red-100 dark:border-red-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">DUM</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Data da Última Menstruação</p>
            </div>
          </div>
          <input
            type="date"
            value={dum}
            onChange={(e) => setDum(e.target.value)}
            className="w-full px-4 py-3 border border-red-200 dark:border-red-700 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-sm border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Ultrassom</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dados biométricos do feto</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-blue-100">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Data do Exame</label>
              <input
                type="date"
                value={dataUSG}
                onChange={(e) => setDataUSG(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">CCN (mm)</label>
                <input
                  type="number"
                  placeholder="0 mm"
                  value={ccn}
                  onChange={(e) => setCcn(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">IG no USG</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Sem"
                    value={igUSG.semanas}
                    onChange={(e) => setIgUSG({ ...igUSG, semanas: e.target.value })}
                    className="w-full px-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white text-sm"
                    min="0"
                    max="42"
                  />
                  <input
                    type="number"
                    placeholder="Dias"
                    value={igUSG.dias}
                    onChange={(e) => setIgUSG({ ...igUSG, dias: e.target.value })}
                    className="w-full px-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none bg-white text-sm"
                    min="0"
                    max="6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calcularIdadeGestacional}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined text-xl">calculate</span>
          Calcular Idade Gestacional
        </button>

        {resultado && (
          <>
            {temDoisMetodos && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Comparação DUM vs USG</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`rounded-xl p-4 border ${resultado.decisao?.metodoAdotado === 'DUM' ? 'bg-red-50 border-red-200 ring-2 ring-red-400' : 'bg-red-50/50 border-red-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-xs font-semibold text-red-700">Por DUM</span>
                      {resultado.decisao?.metodoAdotado === 'DUM' && (
                        <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Adotada</span>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-gray-800">{resultado.igDUM!.semanas}</span>
                      <span className="text-xs text-gray-500">s</span>
                      <span className="text-xl font-bold text-gray-800 ml-1">{resultado.igDUM!.dias}</span>
                      <span className="text-xs text-gray-500">d</span>
                    </div>
                  </div>

                  <div className={`rounded-xl p-4 border ${resultado.decisao?.metodoAdotado === 'USG' ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-400' : 'bg-blue-50/50 border-blue-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <span className="text-xs font-semibold text-blue-700">Por USG</span>
                      {resultado.decisao?.metodoAdotado === 'USG' && (
                        <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Adotada</span>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-gray-800">{resultado.igUSGResult!.semanas}</span>
                      <span className="text-xs text-gray-500">s</span>
                      <span className="text-xl font-bold text-gray-800 ml-1">{resultado.igUSGResult!.dias}</span>
                      <span className="text-xs text-gray-500">d</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Diferença entre métodos</span>
                    <span className="text-sm font-bold text-gray-800">{resultado.diferencaDias} dias</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Limiar para redatação</span>
                    <span className="text-sm font-medium text-gray-600">{resultado.decisao?.limiar} dias</span>
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded-2xl p-4 shadow-sm border ${
              resultado.decisao?.metodoAdotado === 'USG' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined text-lg ${
                  resultado.decisao?.metodoAdotado === 'USG' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  verified
                </span>
                <h4 className="text-sm font-bold text-gray-800">
                  IG Padrão Adotada: {resultado.decisao?.metodoAdotado}
                </h4>
              </div>

              <div className={`rounded-xl p-3 mb-4 ${
                resultado.decisao?.metodoAdotado === 'USG' 
                  ? 'bg-blue-100/50' 
                  : 'bg-green-100/50'
              }`}>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {resultado.decisao?.justificativa}
                </p>
              </div>

              <div className="text-center mb-4">
                <p className="text-xs text-gray-500 mb-1">Idade Gestacional Atual</p>
                <span className="text-3xl font-bold text-gray-800">{resultado.igAdotada!.semanas}</span>
                <span className="text-base text-gray-500 ml-1">semanas</span>
                <span className="text-3xl font-bold text-gray-800 ml-2">{resultado.igAdotada!.dias}</span>
                <span className="text-base text-gray-500 ml-1">dias</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">DPP Final Adotada</p>
                  <p className="text-sm font-bold text-gray-800">{resultado.igAdotada!.dpp}</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Trimestre</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    resultado.decisao?.metodoAdotado === 'USG' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {resultado.igAdotada!.trimestre}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center py-3">
              <p className="text-xs text-gray-400">
                Ref: ACOG/AIUM/SMFM – Committee Opinion No. 700
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
