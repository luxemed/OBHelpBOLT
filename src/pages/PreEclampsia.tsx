import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PreEclampsia = () => {
  const navigate = useNavigate();

  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [etnia, setEtnia] = useState('');
  const [paridade, setParidade] = useState('');
  const [tabagismo, setTabagismo] = useState('nao');
  const [concepcao, setConcepcao] = useState('espontanea');

  const [hipertensaoCronica, setHipertensaoCronica] = useState('nao');
  const [diabetes, setDiabetes] = useState('nao');
  const [lupus, setLupus] = useState('nao');
  const [sindromeAntifosfolipide, setSindromeAntifosfolipide] = useState('nao');
  const [doencaRenal, setDoencaRenal] = useState('nao');

  const [pePrevia, setPePrevia] = useState('nao');
  const [intervaloPartos, setIntervaloPartos] = useState('');

  const [igSemanas, setIgSemanas] = useState('');
  const [metodoDatacao, setMetodoDatacao] = useState('dum');
  const [acf, setAcf] = useState('');
  const [gestacaoMultipla, setGestacaoMultipla] = useState('nao');

  const [paMedia, setPaMedia] = useState('');
  const [ipUterinaDir, setIpUterinaDir] = useState('');
  const [ipUterinaEsq, setIpUterinaEsq] = useState('');
  const [psvOftalmicaDir, setPsvOftalmicaDir] = useState('');
  const [psvOftalmicaEsq, setPsvOftalmicaEsq] = useState('');

  const [resultado, setResultado] = useState<{
    riscoPE34: number;
    riscoPE37: number;
    categoria: string;
    conduta: string[];
    cor: string;
  } | null>(null);

  const calcularIMC = () => {
    if (peso && altura) {
      const alturaM = parseFloat(altura) / 100;
      const imc = parseFloat(peso) / (alturaM * alturaM);
      return imc.toFixed(1);
    }
    return '';
  };

  const calcularIPMedio = () => {
    if (ipUterinaDir && ipUterinaEsq) {
      const media = (parseFloat(ipUterinaDir) + parseFloat(ipUterinaEsq)) / 2;
      return media.toFixed(2);
    }
    return '';
  };

  const calcularRelacaoOftalmica = () => {
    if (psvOftalmicaDir && psvOftalmicaEsq) {
      const relacao = parseFloat(psvOftalmicaDir) / parseFloat(psvOftalmicaEsq);
      return relacao.toFixed(2);
    }
    return '';
  };

  const calcularRisco = () => {
    const idadeNum = parseFloat(idade) || 30;
    const imc = parseFloat(calcularIMC()) || 25;
    
    let riscoBase = 1 / 100;

    if (idadeNum >= 35) riscoBase *= 1.5;
    if (idadeNum >= 40) riscoBase *= 2;
    
    if (imc >= 30) riscoBase *= 1.5;
    if (imc >= 35) riscoBase *= 2;

    if (etnia === 'afrodescendente') riscoBase *= 2.0;
    if (etnia === 'sul_asiatico') riscoBase *= 1.5;

    if (hipertensaoCronica === 'sim') riscoBase *= 5;
    if (diabetes === 'sim') riscoBase *= 2;
    if (lupus === 'sim') riscoBase *= 3;
    if (sindromeAntifosfolipide === 'sim') riscoBase *= 9;
    if (doencaRenal === 'sim') riscoBase *= 4;

    if (pePrevia === 'sim') riscoBase *= 8;

    if (gestacaoMultipla === 'sim') riscoBase *= 3;

    if (concepcao === 'fiv') riscoBase *= 1.5;

    if (tabagismo === 'sim') riscoBase *= 0.7;

    if (paMedia) {
      const pa = parseFloat(paMedia);
      if (pa > 95) riscoBase *= 2;
      else if (pa > 90) riscoBase *= 1.5;
    }

    const ipMedio = parseFloat(calcularIPMedio());
    if (ipMedio) {
      if (ipMedio > 2.0) riscoBase *= 3;
      else if (ipMedio > 1.7) riscoBase *= 2;
      else if (ipMedio > 1.5) riscoBase *= 1.5;
    }

    const riscoPE34 = Math.min(riscoBase * 100, 99);
    const riscoPE37 = Math.min(riscoPE34 * 1.5, 99);

    let categoria = '';
    let conduta: string[] = [];
    let cor = '';

    if (riscoPE34 >= 1 / 100 * 100) {
      if (riscoPE34 > 10) {
        categoria = 'Alto Risco';
        cor = 'red';
        conduta = [
          'Iniciar AAS 150mg/dia até 36 semanas',
          'Suplementação de Cálcio 1-2g/dia',
          'Monitorização pressórica frequente',
          'USG com Doppler a cada 4 semanas',
          'Avaliação de crescimento fetal seriada',
          'Considerar internação se sinais de alerta'
        ];
      } else if (riscoPE34 > 5) {
        categoria = 'Risco Intermediário';
        cor = 'orange';
        conduta = [
          'Considerar AAS 150mg/dia',
          'Suplementação de Cálcio',
          'Monitorização pressórica regular',
          'USG com avaliação de crescimento'
        ];
      } else {
        categoria = 'Baixo Risco';
        cor = 'green';
        conduta = [
          'Pré-natal habitual',
          'Orientar sinais de alerta',
          'Aferição de PA em todas as consultas'
        ];
      }
    }

    setResultado({
      riscoPE34,
      riscoPE37,
      categoria,
      conduta,
      cor
    });
  };

  const limpar = () => {
    setIdade('');
    setPeso('');
    setAltura('');
    setEtnia('');
    setParidade('');
    setTabagismo('nao');
    setConcepcao('espontanea');
    setHipertensaoCronica('nao');
    setDiabetes('nao');
    setLupus('nao');
    setSindromeAntifosfolipide('nao');
    setDoencaRenal('nao');
    setPePrevia('nao');
    setIntervaloPartos('');
    setIgSemanas('');
    setMetodoDatacao('dum');
    setAcf('');
    setGestacaoMultipla('nao');
    setPaMedia('');
    setIpUterinaDir('');
    setIpUterinaEsq('');
    setPsvOftalmicaDir('');
    setPsvOftalmicaEsq('');
    setResultado(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] pb-28">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-gray-800">Risco Pré-eclâmpsia</h1>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </header>
      
      <main className="flex-1 px-4 pt-5 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Cálculo de Risco</h2>
          <p className="text-sm text-gray-500">Preencha os dados abaixo para a avaliação clínica.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-b border-blue-100">
            <span className="material-symbols-outlined text-blue-600">person</span>
            <h3 className="text-sm font-bold text-blue-800">Dados Maternos</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Idade (anos)</label>
              <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex: 28"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Peso (kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ex: 65"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Altura (cm)</label>
              <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex: 165"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">IMC</label>
              <input
                type="text"
                value={calcularIMC() || 'Auto'}
                readOnly
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Etnia</label>
              <select
                value={etnia}
                onChange={(e) => setEtnia(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="afrodescendente">Afrodescendente</option>
                <option value="sul_asiatico">Sul-asiático</option>
                <option value="leste_asiatico">Leste asiático</option>
                <option value="mista">Mista</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Paridade</label>
              <select
                value={paridade}
                onChange={(e) => setParidade(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Selecione</option>
                <option value="nulipara">Nulípara</option>
                <option value="primipara">Primípara</option>
                <option value="multipara">Multípara</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tabagismo</label>
              <select
                value={tabagismo}
                onChange={(e) => setTabagismo(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Concepção</label>
              <select
                value={concepcao}
                onChange={(e) => setConcepcao(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="espontanea">Espontânea</option>
                <option value="fiv">FIV</option>
                <option value="inducao">Indução ovulação</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border-b border-amber-100">
            <span className="material-symbols-outlined text-amber-600">medical_information</span>
            <h3 className="text-sm font-bold text-amber-800">História Médica</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Hipertensão Crônica</label>
              <select
                value={hipertensaoCronica}
                onChange={(e) => setHipertensaoCronica(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Diabetes</label>
              <select
                value={diabetes}
                onChange={(e) => setDiabetes(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Lúpus (LES)</label>
              <select
                value={lupus}
                onChange={(e) => setLupus(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Síndrome Antifosfolípide</label>
              <select
                value={sindromeAntifosfolipide}
                onChange={(e) => setSindromeAntifosfolipide(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs text-gray-500 mb-1 block">Doença Renal</label>
              <select
                value={doencaRenal}
                onChange={(e) => setDoencaRenal(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-pink-50 border-b border-pink-100">
            <span className="material-symbols-outlined text-pink-600">pregnant_woman</span>
            <h3 className="text-sm font-bold text-pink-800">História Obstétrica</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Pré-eclâmpsia Prévia</label>
              <select
                value={pePrevia}
                onChange={(e) => setPePrevia(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Intervalo entre partos (a...)</label>
              <input
                type="number"
                value={intervaloPartos}
                onChange={(e) => setIntervaloPartos(e.target.value)}
                placeholder="Ex: 2"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
            <span className="material-symbols-outlined text-gray-600">child_care</span>
            <h3 className="text-sm font-bold text-gray-800">Gestação Atual</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Idade Gestacional (sem...)</label>
              <input
                type="text"
                value={igSemanas}
                onChange={(e) => setIgSemanas(e.target.value)}
                placeholder="Ex: 12.3"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Método de Datação</label>
              <select
                value={metodoDatacao}
                onChange={(e) => setMetodoDatacao(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="dum">DUM</option>
                <option value="usg">USG 1º trimestre</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Atividade Cardíaca Fetal</label>
              <select
                value={acf}
                onChange={(e) => setAcf(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Selecione</option>
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Gestação Múltipla</label>
              <select
                value={gestacaoMultipla}
                onChange={(e) => setGestacaoMultipla(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-purple-50 border-b border-purple-100">
            <span className="material-symbols-outlined text-purple-600">ecg</span>
            <h3 className="text-sm font-bold text-purple-800">Medidas Biofísicas (Opcional)</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">PA Média (mmHg)</label>
              <input
                type="number"
                value={paMedia}
                onChange={(e) => setPaMedia(e.target.value)}
                placeholder="Ex: 85"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">IP Artéria Uterina Direita</label>
              <input
                type="text"
                value={ipUterinaDir}
                onChange={(e) => setIpUterinaDir(e.target.value)}
                placeholder="Ex: 1.45"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">IP Artéria Uterina Esquerda</label>
              <input
                type="text"
                value={ipUterinaEsq}
                onChange={(e) => setIpUterinaEsq(e.target.value)}
                placeholder="Ex: 1.52"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">IP Médio (calculado)</label>
              <input
                type="text"
                value={calcularIPMedio() || 'Auto'}
                readOnly
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">PSV Art. Oftálm. Dir (c...)</label>
              <input
                type="text"
                value={psvOftalmicaDir}
                onChange={(e) => setPsvOftalmicaDir(e.target.value)}
                placeholder="Ex: 35.2"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">PSV Art. Oftálm. Esq (c...)</label>
              <input
                type="text"
                value={psvOftalmicaEsq}
                onChange={(e) => setPsvOftalmicaEsq(e.target.value)}
                placeholder="Ex: 34.8"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs text-gray-500 mb-1 block">Relação Oftálmica (calc)</label>
              <input
                type="text"
                value={calcularRelacaoOftalmica() || 'Auto'}
                readOnly
                className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        </div>

        <button
          onClick={calcularRisco}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined">calculate</span>
          Calcular Risco
        </button>

        {resultado && (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resultado</h3>
            
            <div className={`p-4 rounded-xl mb-4 ${
              resultado.cor === 'red' ? 'bg-red-50 border-2 border-red-200' :
              resultado.cor === 'orange' ? 'bg-orange-50 border-2 border-orange-200' :
              'bg-green-50 border-2 border-green-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  resultado.cor === 'red' ? 'bg-red-500 text-white' :
                  resultado.cor === 'orange' ? 'bg-orange-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {resultado.categoria}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{resultado.riscoPE34.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">Risco PE &lt;34 sem</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{resultado.riscoPE37.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">Risco PE &lt;37 sem</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Conduta Recomendada:</h4>
              <ul className="space-y-2">
                {resultado.conduta.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Referência:</strong> Algoritmo FMF (Fetal Medicine Foundation) para rastreamento de pré-eclâmpsia no primeiro trimestre. O'Gorman et al., 2017.
              </p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
};
