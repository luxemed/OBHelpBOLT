import { useState } from 'react';
import { BackHeader } from '../components/BackHeader';

const calcularIGporCCN_FMF = (ccnMm: number): { semanas: number; dias: number; formatted: string } => {
  const gaDays = 8.052 * Math.sqrt(ccnMm * 1.037) + 23.73;
  const semanas = Math.floor(gaDays / 7);
  const dias = Math.round(gaDays % 7);
  return {
    semanas,
    dias,
    formatted: `${semanas}s ${dias}d`
  };
};

export const Cromossomopatias = () => {
  const [idadeMae, setIdadeMae] = useState('');
  const [pesoMae, setPesoMae] = useState('');
  const [alturaMae, setAlturaMae] = useState('');
  const [etnia, setEtnia] = useState('');
  const [tabagismo, setTabagismo] = useState('nao');
  const [metodoConcepcao, setMetodoConcepcao] = useState('espontanea');

  const [metodoDatacao, setMetodoDatacao] = useState('ccn');
  const [dataExame, setDataExame] = useState('');
  const [ccn, setCcn] = useState('');
  const [igCalculada, setIgCalculada] = useState('');

  const [gestacaoMultipla, setGestacaoMultipla] = useState('nao');
  const [corionicidade, setCorionicidade] = useState('');

  const [hipertensaoCronica, setHipertensaoCronica] = useState('nao');
  const [diabetesTipo1, setDiabetesTipo1] = useState('nao');
  const [diabetesTipo2, setDiabetesTipo2] = useState('nao');
  const [maePE, setMaePE] = useState('nao');
  const [lupus, setLupus] = useState('nao');
  const [sindromeAntifosfolipidica, setSindromeAntifosfolipidica] = useState('nao');

  const [paridade, setParidade] = useState('nulipara');
  const [trissomia21Previa, setTrissomia21Previa] = useState('nao');
  const [trissomia18Previa, setTrissomia18Previa] = useState('nao');
  const [trissomia13Previa, setTrissomia13Previa] = useState('nao');

  const [atividadeCardiaca, setAtividadeCardiaca] = useState('presente');
  const [fcf, setFcf] = useState('');
  const [ccnUsg, setCcnUsg] = useState('');
  const [tn, setTn] = useState('');
  const [dbp, setDbp] = useState('');

  const [ossoNasal, setOssoNasal] = useState('presente');
  const [ductoVenoso, setDuctoVenoso] = useState('normal');
  const [regurgitacaoTric, setRegurgitacaoTric] = useState('ausente');

  const [pappA, setPappA] = useState('');
  const [betaHcg, setBetaHcg] = useState('');

  const [resultado, setResultado] = useState<{
    riscoBasalT21: string;
    riscoBasalT18: string;
    riscoBasalT13: string;
    riscoT21: string;
    riscoT18: string;
    riscoT13: string;
    classificacao: string;
    conduta: string;
    cor: string;
  } | null>(null);

  const imcCalculado = pesoMae && alturaMae 
    ? (parseFloat(pesoMae) / Math.pow(parseFloat(alturaMae) / 100, 2)).toFixed(1)
    : '';

  const calcularRisco = () => {
    const idade = parseInt(idadeMae) || 35;
    const tnVal = parseFloat(tn) || 1.5;
    const ccnVal = parseFloat(ccnUsg) || parseFloat(ccn) || 60;

    let riscoBaseT21 = 1 / (1 + Math.exp(-0.243 * (idade - 35)));
    if (idade < 25) riscoBaseT21 = 1 / 1500;
    else if (idade < 30) riscoBaseT21 = 1 / 1000;
    else if (idade < 35) riscoBaseT21 = 1 / 400;
    else if (idade < 38) riscoBaseT21 = 1 / 200;
    else if (idade < 40) riscoBaseT21 = 1 / 100;
    else if (idade < 42) riscoBaseT21 = 1 / 60;
    else riscoBaseT21 = 1 / 30;

    let fatorCorrecao = 1;

    const igFMF = calcularIGporCCN_FMF(ccnVal);
    const tnMediana = 0.8 + (0.012 * ccnVal);
    const tnMoM = tnVal / tnMediana;
    
    if (tnMoM > 2.0) fatorCorrecao *= 18;
    else if (tnMoM > 1.5) fatorCorrecao *= 6;
    else if (tnMoM > 1.2) fatorCorrecao *= 2.5;
    else if (tnMoM >= 0.8 && tnMoM <= 1.2) fatorCorrecao *= 0.7;
    else if (tnMoM < 0.8) fatorCorrecao *= 0.3;

    if (ossoNasal === 'ausente') fatorCorrecao *= 6.5;
    else if (ossoNasal === 'hipoplasico') fatorCorrecao *= 2.5;
    else if (ossoNasal === 'presente') fatorCorrecao *= 0.5;

    if (ductoVenoso === 'reverso') fatorCorrecao *= 3.5;
    else if (ductoVenoso === 'normal') fatorCorrecao *= 0.7;

    if (regurgitacaoTric === 'presente') fatorCorrecao *= 2.5;
    else if (regurgitacaoTric === 'ausente') fatorCorrecao *= 0.8;

    if (pappA) {
      const pappAVal = parseFloat(pappA);
      if (pappAVal < 0.4) fatorCorrecao *= 2.5;
      else if (pappAVal < 0.5) fatorCorrecao *= 1.8;
      else if (pappAVal >= 0.5 && pappAVal <= 2.0) fatorCorrecao *= 0.8;
      else if (pappAVal > 2.0) fatorCorrecao *= 0.5;
    }

    if (betaHcg) {
      const betaVal = parseFloat(betaHcg);
      if (betaVal > 2.5) fatorCorrecao *= 2.0;
      else if (betaVal >= 1.0 && betaVal <= 2.5) fatorCorrecao *= 1.2;
      else if (betaVal >= 0.5 && betaVal < 1.0) fatorCorrecao *= 0.7;
      else if (betaVal < 0.5) fatorCorrecao *= 0.4;
    }

    if (trissomia21Previa === 'sim') fatorCorrecao *= 1.5;

    const riscoBasalT18 = riscoBaseT21 * 0.3;
    const riscoBasalT13 = riscoBaseT21 * 0.15;

    const riscoT21 = riscoBaseT21 * fatorCorrecao;
    const riscoT18 = riscoBasalT18 * fatorCorrecao;
    const riscoT13 = riscoBasalT13 * fatorCorrecao;

    let classificacao = '';
    let conduta = '';
    let cor = '';

    if (riscoT21 >= 1 / 150) {
      classificacao = 'Alto Risco';
      conduta = 'Considerar teste invasivo (amniocentese ou BVC). NIPT como alternativa de rastreio.';
      cor = 'red';
    } else if (riscoT21 >= 1 / 1000) {
      classificacao = 'Risco Intermediário';
      conduta = 'Considerar NIPT. Acompanhamento com medicina fetal.';
      cor = 'yellow';
    } else {
      classificacao = 'Baixo Risco';
      conduta = 'Seguimento habitual. USG morfológico de 2º trimestre.';
      cor = 'green';
    }

    setResultado({
      riscoBasalT21: `1:${Math.round(1 / riscoBaseT21)}`,
      riscoBasalT18: `1:${Math.round(1 / riscoBasalT18)}`,
      riscoBasalT13: `1:${Math.round(1 / riscoBasalT13)}`,
      riscoT21: `1:${Math.round(1 / riscoT21)}`,
      riscoT18: `1:${Math.round(1 / riscoT18)}`,
      riscoT13: `1:${Math.round(1 / riscoT13)}`,
      classificacao,
      conduta,
      cor
    });
  };

  const limpar = () => {
    setIdadeMae('');
    setPesoMae('');
    setAlturaMae('');
    setEtnia('');
    setTabagismo('nao');
    setMetodoConcepcao('espontanea');
    setMetodoDatacao('ccn');
    setDataExame('');
    setCcn('');
    setIgCalculada('');
    setGestacaoMultipla('nao');
    setCorionicidade('');
    setHipertensaoCronica('nao');
    setDiabetesTipo1('nao');
    setDiabetesTipo2('nao');
    setMaePE('nao');
    setLupus('nao');
    setSindromeAntifosfolipidica('nao');
    setParidade('nulipara');
    setTrissomia21Previa('nao');
    setTrissomia18Previa('nao');
    setTrissomia13Previa('nao');
    setAtividadeCardiaca('presente');
    setFcf('');
    setCcnUsg('');
    setTn('');
    setDbp('');
    setOssoNasal('presente');
    setDuctoVenoso('normal');
    setRegurgitacaoTric('ausente');
    setPappA('');
    setBetaHcg('');
    setResultado(null);
  };

  const getCorClass = (cor: string) => {
    if (cor === 'red') return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-500' };
    if (cor === 'yellow') return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-500' };
    return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-500' };
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] pb-24">
      <BackHeader title="Cromossomopatias" />
      
      <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Cromossomopatias</h2>
          <p className="text-sm text-gray-500">Rastreio de Trissomias</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">1. Dados Maternos</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Idade (anos)</label>
                <input
                  type="number"
                  value={idadeMae}
                  onChange={(e) => setIdadeMae(e.target.value)}
                  placeholder="Ex: 32"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  value={pesoMae}
                  onChange={(e) => setPesoMae(e.target.value)}
                  placeholder="Ex: 65"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={alturaMae}
                  onChange={(e) => setAlturaMae(e.target.value)}
                  placeholder="Ex: 165"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">IMC</label>
                <input
                  type="text"
                  value={imcCalculado || 'Auto'}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Etnia</label>
                <select
                  value={etnia}
                  onChange={(e) => setEtnia(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="">Selecione</option>
                  <option value="branca">Branca</option>
                  <option value="negra">Negra</option>
                  <option value="asiatica">Asiática</option>
                  <option value="mista">Mista</option>
                  <option value="outra">Outra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tabagismo</label>
                <select
                  value={tabagismo}
                  onChange={(e) => setTabagismo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Método de Concepção</label>
              <select
                value={metodoConcepcao}
                onChange={(e) => setMetodoConcepcao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
              >
                <option value="espontanea">Espontânea</option>
                <option value="fiv">FIV</option>
                <option value="icsi">ICSI</option>
                <option value="iui">IUI</option>
                <option value="ovulacao_induzida">Ovulação Induzida</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">2. Datação da Gestação</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Método de Datação</label>
                <select
                  value={metodoDatacao}
                  onChange={(e) => setMetodoDatacao(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="ccn">CCN</option>
                  <option value="dum">DUM</option>
                  <option value="fiv">Data FIV</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Data do Exame</label>
                <input
                  type="date"
                  value={dataExame}
                  onChange={(e) => setDataExame(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">CCN (mm)</label>
              <input
                type="number"
                step="0.1"
                value={ccn}
                onChange={(e) => setCcn(e.target.value)}
                placeholder="Ex: 65.2"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">IG Calculada (Robinson 1975 - FMF)</label>
              <input
                type="text"
                value={ccn ? calcularIGporCCN_FMF(parseFloat(ccn)).formatted : 'Auto'}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">3. Gestação Atual</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Gestação Múltipla</label>
              <select
                value={gestacaoMultipla}
                onChange={(e) => setGestacaoMultipla(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
              >
                <option value="nao">Não</option>
                <option value="gemelar">Gemelar</option>
                <option value="trigemelar">Trigemelar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Corionicidade</label>
              <select
                value={corionicidade}
                onChange={(e) => setCorionicidade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
              >
                <option value="">Selecione</option>
                <option value="monocorionica">Monocoriônica</option>
                <option value="dicorionica">Dicoriônica</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">4. História Médica</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Hipertensão Crônica</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="hipertensao" value="sim" checked={hipertensaoCronica === 'sim'} onChange={(e) => setHipertensaoCronica(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="hipertensao" value="nao" checked={hipertensaoCronica === 'nao'} onChange={(e) => setHipertensaoCronica(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Diabetes Tipo I</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="diabetes1" value="sim" checked={diabetesTipo1 === 'sim'} onChange={(e) => setDiabetesTipo1(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="diabetes1" value="nao" checked={diabetesTipo1 === 'nao'} onChange={(e) => setDiabetesTipo1(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Diabetes Tipo II</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="diabetes2" value="sim" checked={diabetesTipo2 === 'sim'} onChange={(e) => setDiabetesTipo2(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="diabetes2" value="nao" checked={diabetesTipo2 === 'nao'} onChange={(e) => setDiabetesTipo2(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Mãe da Paciente teve PE</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="maePE" value="sim" checked={maePE === 'sim'} onChange={(e) => setMaePE(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="maePE" value="nao" checked={maePE === 'nao'} onChange={(e) => setMaePE(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Lúpus Eritematoso Sistêmico</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="lupus" value="sim" checked={lupus === 'sim'} onChange={(e) => setLupus(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="lupus" value="nao" checked={lupus === 'nao'} onChange={(e) => setLupus(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Síndrome Antifosfolipídica</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="saf" value="sim" checked={sindromeAntifosfolipidica === 'sim'} onChange={(e) => setSindromeAntifosfolipidica(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="saf" value="nao" checked={sindromeAntifosfolipidica === 'nao'} onChange={(e) => setSindromeAntifosfolipidica(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">5. História Obstétrica</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Paridade</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="paridade" value="nulipara" checked={paridade === 'nulipara'} onChange={(e) => setParidade(e.target.value)} className="text-blue-500" />
                  Nulípara (sem gestação ≥24 sem)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="paridade" value="multipara" checked={paridade === 'multipara'} onChange={(e) => setParidade(e.target.value)} className="text-blue-500" />
                  Multípara (≥1 gestação ≥24 sem)
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Trissomia 21 Prévia</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="t21" value="sim" checked={trissomia21Previa === 'sim'} onChange={(e) => setTrissomia21Previa(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="t21" value="nao" checked={trissomia21Previa === 'nao'} onChange={(e) => setTrissomia21Previa(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Trissomia 18 Prévia</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="t18" value="sim" checked={trissomia18Previa === 'sim'} onChange={(e) => setTrissomia18Previa(e.target.value)} className="text-blue-500" />
                    Sim
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="t18" value="nao" checked={trissomia18Previa === 'nao'} onChange={(e) => setTrissomia18Previa(e.target.value)} className="text-blue-500" />
                    Não
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Trissomia 13 Prévia</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="t13" value="sim" checked={trissomia13Previa === 'sim'} onChange={(e) => setTrissomia13Previa(e.target.value)} className="text-blue-500" />
                  Sim
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="t13" value="nao" checked={trissomia13Previa === 'nao'} onChange={(e) => setTrissomia13Previa(e.target.value)} className="text-blue-500" />
                  Não
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">6. Avaliação Ultrassonográfica</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Atividade Cardíaca Fetal</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="acf" value="presente" checked={atividadeCardiaca === 'presente'} onChange={(e) => setAtividadeCardiaca(e.target.value)} className="text-blue-500" />
                  Presente
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="acf" value="ausente" checked={atividadeCardiaca === 'ausente'} onChange={(e) => setAtividadeCardiaca(e.target.value)} className="text-blue-500" />
                  Ausente
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Frequência Cardíaca Fetal (bpm)</label>
              <input
                type="number"
                value={fcf}
                onChange={(e) => setFcf(e.target.value)}
                placeholder="Ex: 155"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">CCN (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ccnUsg || ccn}
                  onChange={(e) => setCcnUsg(e.target.value)}
                  placeholder="Ex: 64.0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Translucência Nucal - TN</label>
                <input
                  type="number"
                  step="0.1"
                  value={tn}
                  onChange={(e) => setTn(e.target.value)}
                  placeholder="Ex: 1.8"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">DBP (mm)</label>
              <input
                type="number"
                step="0.1"
                value={dbp}
                onChange={(e) => setDbp(e.target.value)}
                placeholder="Ex: 21.0"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">7. Marcadores de Aneuploidias</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Osso Nasal</label>
                <select
                  value={ossoNasal}
                  onChange={(e) => setOssoNasal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="presente">Presente</option>
                  <option value="hipoplasico">Hipoplásico</option>
                  <option value="ausente">Ausente</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Ducto Venoso</label>
                <select
                  value={ductoVenoso}
                  onChange={(e) => setDuctoVenoso(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="reverso">Onda A reversa</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Regurgitação Tricúspide</label>
              <select
                value={regurgitacaoTric}
                onChange={(e) => setRegurgitacaoTric(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
              >
                <option value="ausente">Ausente</option>
                <option value="presente">Presente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">8. Marcadores Bioquímicos (Opcional)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">PAPP-A (MoM)</label>
              <input
                type="number"
                step="0.01"
                value={pappA}
                onChange={(e) => setPappA(e.target.value)}
                placeholder="Ex: 0.85"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Free Beta-hCG (MoM)</label>
              <input
                type="number"
                step="0.01"
                value={betaHcg}
                onChange={(e) => setBetaHcg(e.target.value)}
                placeholder="Ex: 1.20"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">MoM = Múltiplos da Mediana. Valores normais: 0.5 - 2.0 MoM</p>
        </div>

        <button
          onClick={calcularRisco}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined">calculate</span>
          Calcular Risco
        </button>

        {resultado && (
          <div className={`rounded-2xl p-4 border ${getCorClass(resultado.cor).bg} ${getCorClass(resultado.cor).border}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-medium px-3 py-1 rounded-full text-white ${getCorClass(resultado.cor).badge}`}>
                {resultado.classificacao}
              </span>
              <span className="text-xs text-gray-500">Ref: FMF</span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Risco Basal (idade materna)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/40 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">T21</p>
                  <p className="text-sm font-medium text-gray-600">{resultado.riscoBasalT21}</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">T18</p>
                  <p className="text-sm font-medium text-gray-600">{resultado.riscoBasalT18}</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">T13</p>
                  <p className="text-sm font-medium text-gray-600">{resultado.riscoBasalT13}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Risco Corrigido (combinado)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/60 rounded-lg p-2 text-center border border-white/80">
                  <p className="text-xs text-gray-500">T21</p>
                  <p className="text-base font-bold text-gray-800">{resultado.riscoT21}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center border border-white/80">
                  <p className="text-xs text-gray-500">T18</p>
                  <p className="text-base font-bold text-gray-800">{resultado.riscoT18}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center border border-white/80">
                  <p className="text-xs text-gray-500">T13</p>
                  <p className="text-base font-bold text-gray-800">{resultado.riscoT13}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Conduta</p>
              <p className="text-sm text-gray-700">{resultado.conduta}</p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Pontos de Corte para Risco:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><span className="text-red-600 font-medium">Alto Risco:</span> ≥ 1:150 (considerar teste invasivo)</li>
            <li><span className="text-yellow-600 font-medium">Risco Intermediário:</span> 1:150 - 1:1000 (considerar NIPT)</li>
            <li><span className="text-green-600 font-medium">Baixo Risco:</span> &lt; 1:1000 (rotina)</li>
          </ul>
        </div>

        <button
          onClick={limpar}
          className="w-full py-3 px-6 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all mb-4"
        >
          Limpar Formulário
        </button>
      </main>
    </div>
  );
};
