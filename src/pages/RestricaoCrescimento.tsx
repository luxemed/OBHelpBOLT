import { useState, useEffect } from 'react';
import { BackHeader } from '../components/BackHeader';

const tabDopplerAU: { [key: number]: { p5: number; p50: number; p95: number } } = {
  20: { p5: 0.80, p50: 1.04, p95: 1.35 },
  21: { p5: 0.78, p50: 1.02, p95: 1.33 },
  22: { p5: 0.76, p50: 1.00, p95: 1.31 },
  23: { p5: 0.74, p50: 0.98, p95: 1.29 },
  24: { p5: 0.72, p50: 0.96, p95: 1.27 },
  25: { p5: 0.70, p50: 0.94, p95: 1.25 },
  26: { p5: 0.68, p50: 0.91, p95: 1.22 },
  27: { p5: 0.66, p50: 0.89, p95: 1.20 },
  28: { p5: 0.64, p50: 0.87, p95: 1.18 },
  29: { p5: 0.63, p50: 0.85, p95: 1.16 },
  30: { p5: 0.61, p50: 0.83, p95: 1.14 },
  31: { p5: 0.59, p50: 0.81, p95: 1.12 },
  32: { p5: 0.57, p50: 0.79, p95: 1.10 },
  33: { p5: 0.55, p50: 0.77, p95: 1.08 },
  34: { p5: 0.54, p50: 0.75, p95: 1.06 },
  35: { p5: 0.52, p50: 0.73, p95: 1.04 },
  36: { p5: 0.50, p50: 0.71, p95: 1.02 },
  37: { p5: 0.48, p50: 0.69, p95: 1.00 },
  38: { p5: 0.47, p50: 0.67, p95: 0.98 },
  39: { p5: 0.45, p50: 0.65, p95: 0.96 },
  40: { p5: 0.43, p50: 0.63, p95: 0.94 },
  41: { p5: 0.41, p50: 0.61, p95: 0.91 },
  42: { p5: 0.40, p50: 0.59, p95: 0.89 },
};

const tabDopplerACM: { [key: number]: { p5: number; p50: number; p95: number } } = {
  20: { p5: 1.36, p50: 1.83, p95: 2.46 },
  21: { p5: 1.40, p50: 1.87, p95: 2.51 },
  22: { p5: 1.44, p50: 1.91, p95: 2.55 },
  23: { p5: 1.47, p50: 1.95, p95: 2.59 },
  24: { p5: 1.49, p50: 1.97, p95: 2.62 },
  25: { p5: 1.51, p50: 2.00, p95: 2.64 },
  26: { p5: 1.52, p50: 2.01, p95: 2.66 },
  27: { p5: 1.53, p50: 2.02, p95: 2.66 },
  28: { p5: 1.53, p50: 2.02, p95: 2.66 },
  29: { p5: 1.52, p50: 2.01, p95: 2.65 },
  30: { p5: 1.51, p50: 1.99, p95: 2.63 },
  31: { p5: 1.49, p50: 1.97, p95: 2.60 },
  32: { p5: 1.47, p50: 1.94, p95: 2.56 },
  33: { p5: 1.44, p50: 1.90, p95: 2.51 },
  34: { p5: 1.40, p50: 1.85, p95: 2.45 },
  35: { p5: 1.36, p50: 1.80, p95: 2.38 },
  36: { p5: 1.32, p50: 1.74, p95: 2.30 },
  37: { p5: 1.27, p50: 1.67, p95: 2.21 },
  38: { p5: 1.21, p50: 1.60, p95: 2.12 },
  39: { p5: 1.15, p50: 1.52, p95: 2.01 },
  40: { p5: 1.09, p50: 1.44, p95: 1.90 },
  41: { p5: 1.02, p50: 1.35, p95: 1.78 },
  42: { p5: 0.95, p50: 1.25, p95: 1.66 },
};

const calcularPercentilDopplerAU = (ip: number, igSemanas: number, igDias: number): number => {
  const gaExata = igSemanas + igDias / 7;
  if (gaExata < 20 || gaExata > 42 || ip <= 0) return -1;
  
  const semanaBase = Math.floor(gaExata);
  const frac = gaExata - semanaBase;
  const semana1 = Math.max(20, Math.min(42, semanaBase));
  const semana2 = Math.min(42, semana1 + 1);
  
  const t1 = tabDopplerAU[semana1];
  const t2 = tabDopplerAU[semana2];
  
  const p5 = t1.p5 + frac * (t2.p5 - t1.p5);
  const p50 = t1.p50 + frac * (t2.p50 - t1.p50);
  const p95 = t1.p95 + frac * (t2.p95 - t1.p95);
  
  const logP5 = Math.log(p5);
  const logP50 = Math.log(p50);
  const logP95 = Math.log(p95);
  const logIp = Math.log(ip);
  
  const sd = (logP95 - logP5) / 3.29;
  const zScore = (logIp - logP50) / sd;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const calcularPercentilDopplerACM = (ip: number, igSemanas: number, igDias: number): number => {
  const gaExata = igSemanas + igDias / 7;
  if (gaExata < 20 || gaExata > 42 || ip <= 0) return -1;
  
  const semanaBase = Math.floor(gaExata);
  const frac = gaExata - semanaBase;
  const semana1 = Math.max(20, Math.min(42, semanaBase));
  const semana2 = Math.min(42, semana1 + 1);
  
  const t1 = tabDopplerACM[semana1];
  const t2 = tabDopplerACM[semana2];
  
  const p5 = t1.p5 + frac * (t2.p5 - t1.p5);
  const p50 = t1.p50 + frac * (t2.p50 - t1.p50);
  const p95 = t1.p95 + frac * (t2.p95 - t1.p95);
  
  const logP5 = Math.log(p5);
  const logP50 = Math.log(p50);
  const logP95 = Math.log(p95);
  const logIp = Math.log(ip);
  
  const sd = (logP95 - logP5) / 3.29;
  const zScore = (logIp - logP50) / sd;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const calcularPercentilDopplerUtA = (ipMedio: number, igSemanas: number, igDias: number): number => {
  const ga = igSemanas + igDias / 7;
  if (ga < 11 || ga > 42 || ipMedio <= 0) return -1;
  const median = 2.58 - 0.098 * ga + 0.00127 * ga * ga;
  const sd = 0.35;
  const zScore = (ipMedio - median) / sd;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const calcularPercentilDopplerDV = (ip: number, igSemanas: number, igDias: number): number => {
  const ga = igSemanas + igDias / 7;
  if (ga < 20 || ga > 42 || ip <= 0) return -1;
  const median = 0.72 - 0.007 * ga;
  const sd = 0.15;
  const zScore = (ip - median) / sd;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const calcularPercentilRCP = (rcp: number, igSemanas: number, igDias: number): number => {
  const ga = igSemanas + igDias / 7;
  if (ga < 20 || ga > 42 || rcp <= 0) return -1;
  const median = -5.0744 + 0.6170 * ga - 0.0177 * ga * ga + 0.0001537 * ga * ga * ga;
  const logSd = -0.8849 - 0.0583 * ga + 0.000920 * ga * ga;
  const sd = Math.exp(logSd);
  const logRcp = Math.log10(rcp);
  const logMedian = Math.log10(median);
  const zScore = (logRcp - logMedian) / sd;
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const calcularPercentilBarcelona = (peso: number, igSemanas: number, igDias: number, sexo: 'masculino' | 'feminino'): number => {
  const ga = igSemanas + igDias / 7;
  
  if (ga < 20 || ga > 42) return -1;
  
  const isMale = sexo === 'masculino';
  
  const mu = isMale
    ? -4.194 + 0.2583 * ga - 0.00287 * ga * ga
    : -4.2579 + 0.2593 * ga - 0.00287 * ga * ga;
  
  const sigma = isMale ? 0.1162 : 0.1182;
  
  const pesoMedioLocal = isMale ? 3500 : 3400;
  const pesoMedio40Ref = isMale ? 3546 : 3416;
  const proporcao = pesoMedioLocal / pesoMedio40Ref;
  
  const lnPeso = Math.log(peso);
  const lnPesoEsperado = mu + Math.log(40 * proporcao);
  
  const zScore = (lnPeso - (mu + Math.log(pesoMedio40Ref * proporcao * Math.exp(mu - (-4.194 + 0.2583 * 40 - 0.00287 * 40 * 40))))) / sigma;
  
  const p50Weight = pesoMedio40Ref * proporcao * Math.exp(mu - (-4.194 + 0.2583 * 40 - 0.00287 * 40 * 40));
  const zScoreSimple = (Math.log(peso) - Math.log(p50Weight)) / sigma;
  
  const percentil = 100 * (0.5 * (1 + erf(zScoreSimple / Math.sqrt(2))));
  
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

const erf = (x: number): number => {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

const pesoP50Barcelona: { [key: number]: { masculino: number; feminino: number } } = {
  20: { masculino: 331, feminino: 322 },
  21: { masculino: 399, feminino: 388 },
  22: { masculino: 478, feminino: 465 },
  23: { masculino: 568, feminino: 553 },
  24: { masculino: 670, feminino: 652 },
  25: { masculino: 785, feminino: 764 },
  26: { masculino: 913, feminino: 889 },
  27: { masculino: 1055, feminino: 1027 },
  28: { masculino: 1210, feminino: 1178 },
  29: { masculino: 1379, feminino: 1342 },
  30: { masculino: 1559, feminino: 1518 },
  31: { masculino: 1751, feminino: 1704 },
  32: { masculino: 1953, feminino: 1901 },
  33: { masculino: 2162, feminino: 2104 },
  34: { masculino: 2377, feminino: 2314 },
  35: { masculino: 2595, feminino: 2526 },
  36: { masculino: 2813, feminino: 2738 },
  37: { masculino: 3028, feminino: 2947 },
  38: { masculino: 3236, feminino: 3150 },
  39: { masculino: 3435, feminino: 3343 },
  40: { masculino: 3619, feminino: 3523 },
  41: { masculino: 3785, feminino: 3685 },
  42: { masculino: 3929, feminino: 3825 },
};

const calcularPercentilExato = (peso: number, igSemanas: number, igDias: number, sexo: 'masculino' | 'feminino'): number => {
  if (igSemanas < 20 || igSemanas > 42) return -1;
  
  const p50Base = pesoP50Barcelona[igSemanas]?.[sexo];
  const p50Next = pesoP50Barcelona[Math.min(42, igSemanas + 1)]?.[sexo];
  
  if (!p50Base) return -1;
  
  const p50Interpolado = p50Base + (p50Next - p50Base) * (igDias / 7);
  
  const cvMasc = 0.135;
  const cvFem = 0.14;
  const sigma = sexo === 'masculino' ? cvMasc : cvFem;
  
  const zScore = (Math.log(peso) - Math.log(p50Interpolado)) / sigma;
  
  const percentil = 100 * (0.5 * (1 + erf(zScore / Math.sqrt(2))));
  
  return Math.max(1, Math.min(99, Math.round(percentil)));
};

export const RestricaoCrescimento = () => {
  const [sexoFetal, setSexoFetal] = useState<'masculino' | 'feminino' | ''>('');
  const [igSemanas, setIgSemanas] = useState('');
  const [igDias, setIgDias] = useState('');
  const [pesoFetal, setPesoFetal] = useState('');
  const [percentil, setPercentil] = useState<number | null>(null);
  
  const [ipAU, setIpAU] = useState('');
  const [fluxoAU, setFluxoAU] = useState('');
  const [ipACM, setIpACM] = useState('');
  const [ipUtADir, setIpUtADir] = useState('');
  const [ipUtAEsq, setIpUtAEsq] = useState('');
  const [ipDV, setIpDV] = useState('');
  const [ondaADV, setOndaADV] = useState('');
  
  const [resultado, setResultado] = useState<{
    estagio: string;
    classificacao: string;
    conduta: string;
    seguimento: string;
    interromper: string;
    cor: string;
  } | null>(null);

  const mostrarDoppler = percentil !== null && percentil < 10;
  const mostrarDV = fluxoAU === 'diast_zero' || fluxoAU === 'diast_reversa';

  useEffect(() => {
    const pesoNum = parseInt(pesoFetal);
    const semanas = parseInt(igSemanas);
    const dias = parseInt(igDias) || 0;
    if (pesoNum && semanas >= 20 && semanas <= 42 && sexoFetal) {
      const p = calcularPercentilExato(pesoNum, semanas, dias, sexoFetal);
      setPercentil(p);
    } else {
      setPercentil(null);
    }
  }, [pesoFetal, igSemanas, igDias, sexoFetal]);

  const classificar = () => {
    if (percentil === null) return;

    const ipAUNum = parseFloat(ipAU) || 0;
    const ipACMNum = parseFloat(ipACM) || 0;
    const ipDVNum = parseFloat(ipDV) || 0;
    const semanasNum = parseInt(igSemanas) || 0;
    const diasNum = parseInt(igDias) || 0;
    
    const isPequeno = percentil < 10;
    const isMuitoPequeno = percentil < 3;
    
    const percAU = calcularPercentilDopplerAU(ipAUNum, semanasNum, diasNum);
    const percACM = calcularPercentilDopplerACM(ipACMNum, semanasNum, diasNum);
    const rcpVal = ipAUNum > 0 && ipACMNum > 0 ? ipACMNum / ipAUNum : 0;
    const percRCP = calcularPercentilRCP(rcpVal, semanasNum, diasNum);
    const percUtA = ipUtAMedia ? calcularPercentilDopplerUtA(ipUtAMedia, semanasNum, diasNum) : -1;
    const percDV = calcularPercentilDopplerDV(ipDVNum, semanasNum, diasNum);
    
    const auIP_P95 = percAU > 95;
    const acmIP_P5 = percACM > 0 && percACM < 5;
    const rcpP5 = percRCP > 0 && percRCP < 5;
    const utaIP_P95 = percUtA > 95;
    const dvIP_P95 = percDV > 95;
    
    const auDiastAusente = fluxoAU === 'diast_zero';
    const auDiastReversa = fluxoAU === 'diast_reversa';
    const ondaAAusente = ondaADV === 'onda_a_ausente';
    const ondaAReversa = ondaADV === 'onda_a_reversa';

    let estagio = '';
    let classificacao = '';
    let conduta = '';
    let seguimento = '';
    let interromper = '';
    let cor = '';

    if (ondaAReversa) {
      estagio = 'FGR Estágio IV';
      classificacao = 'Onda A reversa no ducto venoso ou CTG patológico';
      conduta = 'Cesariana. Corticoide se tempo permitir. Sulfato de Mg < 34 sem.';
      seguimento = 'CTG 12-48h';
      interromper = '≥ 26 semanas';
      cor = 'darkred';
    } else if (auDiastReversa || dvIP_P95 || ondaAAusente) {
      estagio = 'FGR Estágio III';
      classificacao = auDiastReversa 
        ? 'Diástole reversa na AU (>50% ciclos, ambas artérias)' 
        : dvIP_P95 
          ? 'DV IP > P95 ou onda A ausente'
          : 'Onda A ausente no DV';
      conduta = 'Internação. Corticoide ≥26 sem. Sulfato de Mg < 34 sem. Cesariana.';
      seguimento = 'Doppler 24-48h, CTG 2x/dia';
      interromper = '≥ 30 semanas';
      cor = 'red';
    } else if (auDiastAusente || auIP_P95) {
      estagio = 'FGR Estágio II';
      classificacao = auDiastAusente 
        ? 'Diástole ausente na AU (>50% ciclos, ambas artérias)' 
        : 'AU IP > P95';
      conduta = 'Internação. Corticoide ≥33 sem. Cesariana.';
      seguimento = 'Doppler 2-4 dias, CTG diário';
      interromper = '≥ 34 semanas';
      cor = 'orange';
    } else if (isMuitoPequeno || acmIP_P5 || rcpP5 || utaIP_P95) {
      estagio = 'FGR Estágio I';
      classificacao = isMuitoPequeno 
        ? 'EFW < P3' 
        : acmIP_P5 
          ? 'ACM IP < P5' 
          : rcpP5 
            ? 'RCP < P5' 
            : 'UtA média IP > P95';
      conduta = 'Vigilância ambulatorial. Parto vaginal não contraindicado.';
      seguimento = 'Doppler 1-2 semanas';
      interromper = '≥ 37 semanas';
      cor = 'yellow';
    } else if (isPequeno) {
      estagio = 'PIG';
      classificacao = 'EFW ≥ P3 e < P10 com Doppler normal';
      conduta = 'Vigilância. Parto vaginal conforme indicação obstétrica.';
      seguimento = 'Doppler 2-3 semanas';
      interromper = '≥ 40 semanas';
      cor = 'blue';
    } else {
      estagio = 'AIG';
      classificacao = 'Crescimento adequado para idade gestacional';
      conduta = 'Seguimento habitual de pré-natal';
      seguimento = 'Conforme rotina';
      interromper = 'Termo';
      cor = 'green';
    }

    setResultado({ estagio, classificacao, conduta, seguimento, interromper, cor });
  };

  const limpar = () => {
    setSexoFetal('');
    setIgSemanas('');
    setIgDias('');
    setPesoFetal('');
    setPercentil(null);
    setIpAU('');
    setFluxoAU('');
    setIpACM('');
    setIpUtADir('');
    setIpUtAEsq('');
    setIpDV('');
    setOndaADV('');
    setResultado(null);
  };
  
  const ipUtAMedia = ipUtADir && ipUtAEsq && parseFloat(ipUtADir) > 0 && parseFloat(ipUtAEsq) > 0 
    ? (parseFloat(ipUtADir) + parseFloat(ipUtAEsq)) / 2 
    : null;
  
  const semanas = parseInt(igSemanas) || 0;
  const dias = parseInt(igDias) || 0;
  
  const percentilAU = ipAU ? calcularPercentilDopplerAU(parseFloat(ipAU), semanas, dias) : null;
  const percentilACM = ipACM ? calcularPercentilDopplerACM(parseFloat(ipACM), semanas, dias) : null;
  const percentilUtA = ipUtAMedia ? calcularPercentilDopplerUtA(ipUtAMedia, semanas, dias) : null;
  const percentilDV = ipDV ? calcularPercentilDopplerDV(parseFloat(ipDV), semanas, dias) : null;
  
  const rcp = ipAU && ipACM && parseFloat(ipAU) > 0 && parseFloat(ipACM) > 0 
    ? parseFloat(ipACM) / parseFloat(ipAU) 
    : null;
  const percentilRCP = rcp ? calcularPercentilRCP(rcp, semanas, dias) : null;

  const getCorClass = (cor: string) => {
    const cores: { [key: string]: { bg: string; border: string; text: string; badge: string } } = {
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-500' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-500' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-500' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-500' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-500' },
      darkred: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900', badge: 'bg-red-700' },
      gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', badge: 'bg-gray-400' }
    };
    return cores[cor] || cores.gray;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] pb-24">
      <BackHeader title="Medicina Fetal" />
      
      <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Restrição de Crescimento</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="material-symbols-outlined text-blue-500 text-sm">verified</span>
            <p className="text-sm text-blue-600">Mikolajczyk/Barcelona - Adaptado por sexo</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">child_care</span>
            </div>
            <h3 className="font-semibold text-gray-800">Crescimento Fetal</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Sexo Fetal</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSexoFetal('masculino')}
                  className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    sexoFetal === 'masculino'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">male</span>
                  Masculino
                </button>
                <button
                  onClick={() => setSexoFetal('feminino')}
                  className={`py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    sexoFetal === 'feminino'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">female</span>
                  Feminino
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">Idade Gestacional</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={igSemanas}
                    onChange={(e) => setIgSemanas(e.target.value)}
                    placeholder="0"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50"
                    min="20"
                    max="42"
                  />
                  <span className="text-sm text-gray-500 w-16">semanas</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={igDias}
                    onChange={(e) => setIgDias(e.target.value)}
                    placeholder="0"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50"
                    min="0"
                    max="6"
                  />
                  <span className="text-sm text-gray-500 w-16">dias</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">Peso Fetal Estimado (EFW)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pesoFetal}
                  onChange={(e) => setPesoFetal(e.target.value)}
                  placeholder="0"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50"
                />
                <span className="text-sm text-gray-500 w-8">g</span>
              </div>
            </div>

            <div className={`rounded-xl p-4 flex items-center justify-between ${
              percentil !== null && percentil < 10 
                ? 'bg-red-50 border border-red-200' 
                : percentil !== null && percentil < 3
                  ? 'bg-red-100 border border-red-300'
                  : 'bg-gray-50'
            }`}>
              <div>
                <p className="text-xs text-gray-500">Percentil Calculado</p>
                <p className="text-xs text-gray-400">Barcelona {sexoFetal === 'masculino' ? '(♂)' : sexoFetal === 'feminino' ? '(♀)' : ''}</p>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-bold ${
                  percentil !== null && percentil < 3 
                    ? 'text-red-700' 
                    : percentil !== null && percentil < 10 
                      ? 'text-red-600' 
                      : percentil !== null && percentil > 90 
                        ? 'text-yellow-600' 
                        : 'text-blue-600'
                }`}>
                  {percentil !== null ? `P${percentil}` : '--'}
                </span>
                {percentil !== null && percentil < 10 && (
                  <p className="text-xs text-red-600 font-medium">Abaixo do P10</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {mostrarDoppler && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">show_chart</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Avaliação Doppler</h3>
                <p className="text-xs text-gray-400">Necessária para percentil &lt; 10</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Artéria Umbilical (AU)</label>
                  {percentilAU !== null && percentilAU > 0 && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${percentilAU > 95 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      P{percentilAU}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">IP</label>
                    <input
                      type="number"
                      step="0.01"
                      value={ipAU}
                      onChange={(e) => setIpAU(e.target.value)}
                      placeholder="Ex: 1.20"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Fluxo Diastólico</label>
                    <select
                      value={fluxoAU}
                      onChange={(e) => setFluxoAU(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Presente (Normal)</option>
                      <option value="diast_zero">Diástole Zero</option>
                      <option value="diast_reversa">Diástole Reversa</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Artéria Cerebral Média (ACM)</label>
                  {percentilACM !== null && percentilACM > 0 && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${percentilACM < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      P{percentilACM}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">IP</label>
                  <input
                    type="number"
                    step="0.01"
                    value={ipACM}
                    onChange={(e) => setIpACM(e.target.value)}
                    placeholder="Ex: 1.50"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  />
                </div>
              </div>

              {rcp && (
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">RCP (ACM/AU)</p>
                    {percentilRCP !== null && percentilRCP > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${percentilRCP < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        P{percentilRCP}
                      </span>
                    )}
                  </div>
                  <p className={`text-lg font-bold ${rcp < 1 ? 'text-red-600' : 'text-green-600'}`}>
                    {rcp.toFixed(2)}
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      {rcp < 1 ? '(Alterado)' : '(Normal)'}
                    </span>
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Artérias Uterinas</label>
                  {percentilUtA !== null && percentilUtA > 0 && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${percentilUtA > 95 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      P{percentilUtA}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">IP Direita</label>
                    <input
                      type="number"
                      step="0.01"
                      value={ipUtADir}
                      onChange={(e) => setIpUtADir(e.target.value)}
                      placeholder="0.80"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">IP Esquerda</label>
                    <input
                      type="number"
                      step="0.01"
                      value={ipUtAEsq}
                      onChange={(e) => setIpUtAEsq(e.target.value)}
                      placeholder="0.80"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
                    />
                  </div>
                </div>
                {ipUtAMedia && (
                  <div className="bg-white rounded-lg p-2 text-center">
                    <span className="text-xs text-gray-400">IP Médio: </span>
                    <span className="text-sm font-bold text-gray-700">{ipUtAMedia.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {mostrarDV && (
                <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-red-700">Ducto Venoso (DV)</label>
                    {percentilDV !== null && percentilDV > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${percentilDV > 95 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        P{percentilDV}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-red-600 mb-2">Avaliar devido alteração do fluxo na AU</p>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">IP</label>
                      <input
                        type="number"
                        step="0.01"
                        value={ipDV}
                        onChange={(e) => setIpDV(e.target.value)}
                        placeholder="Ex: 0.70"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Onda A</label>
                      <select
                        value={ondaADV}
                        onChange={(e) => setOndaADV(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Presente (Normal)</option>
                        <option value="onda_a_ausente">Onda A Ausente</option>
                        <option value="onda_a_reversa">Onda A Reversa</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={classificar}
          disabled={percentil === null}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined">analytics</span>
          Classificar
        </button>

        {resultado && (
          <div className={`rounded-2xl p-4 border ${getCorClass(resultado.cor).bg} ${getCorClass(resultado.cor).border}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full text-white ${getCorClass(resultado.cor).badge}`}>
                {resultado.estagio}
              </span>
              <span className="text-xs text-gray-500">Barcelona Protocol</span>
            </div>
            
            <p className={`text-sm font-medium mb-4 ${getCorClass(resultado.cor).text}`}>
              {resultado.classificacao}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Conduta</p>
                <p className="text-xs font-medium text-gray-700">{resultado.conduta}</p>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Seguimento</p>
                <p className="text-xs font-medium text-gray-700">{resultado.seguimento}</p>
              </div>
            </div>

            <div className="mt-3 bg-white/60 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Momento da Interrupção</p>
              <p className="text-sm font-semibold text-gray-800">{resultado.interromper}</p>
            </div>
          </div>
        )}

        <button
          onClick={limpar}
          className="w-full py-3 px-6 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Limpar Dados
        </button>
      </main>
    </div>
  );
};
