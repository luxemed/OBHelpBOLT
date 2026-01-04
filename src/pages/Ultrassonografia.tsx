import { useState } from 'react';
import { BackHeader } from '../components/BackHeader';

const hadlockWeightTable: { [key: number]: { p3: number; p10: number; p50: number; p90: number; p97: number } } = {
  20: { p3: 249, p10: 275, p50: 331, p90: 399, p97: 435 },
  21: { p3: 299, p10: 331, p50: 399, p90: 481, p97: 524 },
  22: { p3: 359, p10: 398, p50: 478, p90: 574, p97: 626 },
  23: { p3: 426, p10: 471, p50: 568, p90: 684, p97: 745 },
  24: { p3: 503, p10: 556, p50: 670, p90: 807, p97: 879 },
  25: { p3: 589, p10: 652, p50: 785, p90: 945, p97: 1030 },
  26: { p3: 685, p10: 758, p50: 913, p90: 1099, p97: 1197 },
  27: { p3: 791, p10: 876, p50: 1055, p90: 1270, p97: 1383 },
  28: { p3: 908, p10: 1004, p50: 1210, p90: 1457, p97: 1587 },
  29: { p3: 1034, p10: 1145, p50: 1379, p90: 1661, p97: 1809 },
  30: { p3: 1169, p10: 1294, p50: 1559, p90: 1878, p97: 2045 },
  31: { p3: 1313, p10: 1453, p50: 1751, p90: 2108, p97: 2296 },
  32: { p3: 1465, p10: 1621, p50: 1953, p90: 2352, p97: 2562 },
  33: { p3: 1622, p10: 1794, p50: 2162, p90: 2604, p97: 2836 },
  34: { p3: 1783, p10: 1973, p50: 2377, p90: 2863, p97: 3118 },
  35: { p3: 1946, p10: 2154, p50: 2595, p90: 3125, p97: 3403 },
  36: { p3: 2110, p10: 2335, p50: 2813, p90: 3387, p97: 3689 },
  37: { p3: 2271, p10: 2513, p50: 3028, p90: 3646, p97: 3971 },
  38: { p3: 2427, p10: 2686, p50: 3236, p90: 3897, p97: 4244 },
  39: { p3: 2576, p10: 2851, p50: 3435, p90: 4137, p97: 4505 },
  40: { p3: 2714, p10: 3004, p50: 3619, p90: 4359, p97: 4747 },
  41: { p3: 2838, p10: 3141, p50: 3785, p90: 4559, p97: 4965 },
  42: { p3: 2946, p10: 3261, p50: 3929, p90: 4732, p97: 5153 },
};

const calcularPesoHadlock = (cc: number, ca: number, cf: number, dbp: number): number => {
  const ccCm = cc / 10;
  const caCm = ca / 10;
  const cfCm = cf / 10;
  const dbpCm = dbp / 10;
  
  const logPeso = 1.3596 + 0.0064 * ccCm + 0.0424 * caCm + 0.174 * cfCm + 0.00061 * dbpCm * caCm - 0.00386 * caCm * cfCm;
  return Math.round(Math.pow(10, logPeso));
};

const calcularPercentilExato = (peso: number, ig: number): { percentil: number; classificacao: string } => {
  const tabela = hadlockWeightTable[ig];
  if (!tabela) return { percentil: 50, classificacao: 'AIG' };
  
  let percentil = 50;
  
  if (peso <= tabela.p3) {
    percentil = Math.round((peso / tabela.p3) * 3);
  } else if (peso <= tabela.p10) {
    percentil = 3 + Math.round(((peso - tabela.p3) / (tabela.p10 - tabela.p3)) * 7);
  } else if (peso <= tabela.p50) {
    percentil = 10 + Math.round(((peso - tabela.p10) / (tabela.p50 - tabela.p10)) * 40);
  } else if (peso <= tabela.p90) {
    percentil = 50 + Math.round(((peso - tabela.p50) / (tabela.p90 - tabela.p50)) * 40);
  } else if (peso <= tabela.p97) {
    percentil = 90 + Math.round(((peso - tabela.p90) / (tabela.p97 - tabela.p90)) * 7);
  } else {
    percentil = 97 + Math.min(3, Math.round(((peso - tabela.p97) / tabela.p97) * 100));
  }
  
  percentil = Math.max(1, Math.min(99, percentil));
  
  let classificacao = 'AIG';
  if (percentil < 10) classificacao = 'PIG';
  else if (percentil > 90) classificacao = 'GIG';
  
  return { percentil, classificacao };
};

export const Ultrassonografia = () => {
  const [igSemanas, setIgSemanas] = useState('');
  const [igDias, setIgDias] = useState('');
  const [dbp, setDbp] = useState('');
  const [cc, setCc] = useState('');
  const [ca, setCa] = useState('');
  const [cf, setCf] = useState('');
  const [resultado, setResultado] = useState<{
    peso: number;
    percentil: number;
    classificacao: string;
    margem: string;
  } | null>(null);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const calcularPeso = () => {
    const igNum = parseInt(igSemanas);
    const dbpNum = parseFloat(dbp);
    const ccNum = parseFloat(cc);
    const caNum = parseFloat(ca);
    const cfNum = parseFloat(cf);

    if (!igNum || !dbpNum || !ccNum || !caNum || !cfNum) return;

    const peso = calcularPesoHadlock(ccNum, caNum, cfNum, dbpNum);
    const { percentil, classificacao } = calcularPercentilExato(peso, igNum);
    
    const margemInferior = Math.round(peso * 0.9);
    const margemSuperior = Math.round(peso * 1.1);

    setResultado({
      peso,
      percentil,
      classificacao,
      margem: `${margemInferior}g - ${margemSuperior}g`
    });
  };

  const limpar = () => {
    setIgSemanas('');
    setIgDias('');
    setDbp('');
    setCc('');
    setCa('');
    setCf('');
    setResultado(null);
  };

  const getClassificacaoStyle = (classificacao: string) => {
    switch (classificacao) {
      case 'PIG': return 'bg-red-100 text-red-700';
      case 'GIG': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] pb-24">
      <BackHeader title="Ultrassonografia (USG)" />
      
      <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Biometria e Avaliação</h2>
          <p className="text-sm text-gray-500">Insira os dados biométricos para calcular o crescimento e percentis fetais.</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">straighten</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Biometria Fetal</h3>
              <p className="text-xs text-gray-400">Medidas em milímetros (mm)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">DBP (mm)</label>
              <input
                type="number"
                value={dbp}
                onChange={(e) => setDbp(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">CC (mm)</label>
              <input
                type="number"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">CA (mm)</label>
              <input
                type="number"
                value={ca}
                onChange={(e) => setCa(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fêmur (mm)</label>
              <input
                type="number"
                value={cf}
                onChange={(e) => setCf(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-gray-800"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-gray-500 mb-2">Idade Gestacional Atual</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={igSemanas}
                  onChange={(e) => setIgSemanas(e.target.value)}
                  placeholder="--"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-blue-600 font-semibold"
                  min="20"
                  max="42"
                />
                <span className="text-sm text-gray-500 w-12">sem</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={igDias}
                  onChange={(e) => setIgDias(e.target.value)}
                  placeholder="--"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 text-blue-600 font-semibold"
                  min="0"
                  max="6"
                />
                <span className="text-sm text-gray-500 w-12">dias</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calcularPeso}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined">calculate</span>
          Calcular Peso Fetal
        </button>

        {resultado && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">monitoring</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Crescimento Fetal</h3>
                <p className="text-xs text-gray-400">Estimativa de peso e percentil</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Peso Estimado</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-800">{resultado.peso.toLocaleString('pt-BR')}</span>
                  <span className="text-sm text-gray-500">g</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">+/- 10%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Percentil</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">p{resultado.percentil}</span>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getClassificacaoStyle(resultado.classificacao)}`}>
                  {resultado.classificacao}
                </span>
              </div>
            </div>

            {resultado.classificacao === 'PIG' && (
              <div className="mt-4 bg-red-50 rounded-xl p-3 flex items-start gap-2">
                <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                <p className="text-xs text-red-700">Peso abaixo do percentil 10. Considerar avaliação de RCIU e Doppler.</p>
              </div>
            )}

            {resultado.classificacao === 'GIG' && (
              <div className="mt-4 bg-yellow-50 rounded-xl p-3 flex items-start gap-2">
                <span className="material-symbols-outlined text-yellow-600 text-lg">info</span>
                <p className="text-xs text-yellow-700">Peso acima do percentil 90. Avaliar diabetes gestacional e macrossomia.</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={limpar}
          className="w-full py-3 px-6 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Limpar Dados
        </button>

        <button
          onClick={() => setMostrarTabela(!mostrarTabela)}
          className="w-full py-3 px-6 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">{mostrarTabela ? 'expand_less' : 'expand_more'}</span>
          {mostrarTabela ? 'Ocultar' : 'Mostrar'} Tabela de Pesos por IG
        </button>

        {mostrarTabela && (
          <div className="bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
            <h3 className="font-semibold text-gray-800 mb-3">Tabela de Pesos por Idade Gestacional (Hadlock)</h3>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-2 text-left font-semibold text-gray-600">IG</th>
                    <th className="py-2 px-2 text-center font-semibold text-gray-600">p3</th>
                    <th className="py-2 px-2 text-center font-semibold text-gray-600">p10</th>
                    <th className="py-2 px-2 text-center font-semibold text-blue-600">p50</th>
                    <th className="py-2 px-2 text-center font-semibold text-gray-600">p90</th>
                    <th className="py-2 px-2 text-center font-semibold text-gray-600">p97</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(hadlockWeightTable).map(([semana, pesos]) => (
                    <tr key={semana} className="border-t border-gray-100">
                      <td className="py-2 px-2 font-medium text-gray-800">{semana} sem</td>
                      <td className="py-2 px-2 text-center text-gray-500">{pesos.p3}</td>
                      <td className="py-2 px-2 text-center text-gray-500">{pesos.p10}</td>
                      <td className="py-2 px-2 text-center font-medium text-blue-600">{pesos.p50}</td>
                      <td className="py-2 px-2 text-center text-gray-500">{pesos.p90}</td>
                      <td className="py-2 px-2 text-center text-gray-500">{pesos.p97}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">Referência: Hadlock FP et al. Radiology 1991</p>
          </div>
        )}
      </main>
    </div>
  );
};
