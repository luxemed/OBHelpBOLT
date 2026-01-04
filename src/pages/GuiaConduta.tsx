import { useState } from 'react';
import { BackHeader } from '../components/BackHeader';

interface Protocolo {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  fonte: string;
  cor: string;
  icone: string;
  conteudo: {
    condicao: string;
    interromper: string;
    referencia: string;
  }[];
  referencias: string[];
}

const protocolos: Protocolo[] = [
  {
    id: 'hipertensao',
    titulo: 'Pré-eclâmpsia e Hipertensão',
    descricao: 'Protocolo de rastreamento, profilaxia com AAS e cálcio, diagnóstico e manejo.',
    categoria: 'Cardiovascular',
    fonte: 'Febrasgo',
    cor: 'red',
    icone: 'cardiology',
    conteudo: [
      { condicao: 'HASC sem uso de drogas', interromper: '39 semanas', referencia: 'ACOG 2019' },
      { condicao: 'HASC controlada com baixa dose de hipotensor', interromper: '39 semanas', referencia: 'ACOG 2019' },
      { condicao: 'HASC controlada com alta dose/associação', interromper: '37 semanas', referencia: 'ACOG 2019' },
      { condicao: 'HASC severa de difícil controle', interromper: '34 a 36+6 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Hipertensão Gestacional', interromper: '37 semanas', referencia: 'ACOG 2020' },
      { condicao: 'PE sem critérios de gravidade', interromper: '37 semanas', referencia: 'ACOG 2020' },
      { condicao: 'PE superposta sem gravidade', interromper: '37 semanas', referencia: 'ACOG 2020' },
      { condicao: 'PE grave', interromper: '34 semanas', referencia: 'ACOG 2020' },
      { condicao: 'PE superposta com gravidade', interromper: '34 semanas', referencia: 'ACOG 2020' },
      { condicao: 'Síndrome HELLP', interromper: 'Após estabilização', referencia: 'ACOG 2020' },
      { condicao: 'Eclâmpsia', interromper: 'Após estabilização', referencia: 'ACOG 2020' },
    ],
    referencias: [
      'ACOG Practice Bulletin No. 203: Chronic Hypertension in Pregnancy. Obstet Gynecol. 2019',
      'ACOG Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020'
    ]
  },
  {
    id: 'diabetes',
    titulo: 'Diabetes Gestacional',
    descricao: 'Critérios diagnósticos, controle glicêmico e manejo farmacológico.',
    categoria: 'Endocrinologia',
    fonte: 'FIGO / SBD',
    cor: 'blue',
    icone: 'bloodtype',
    conteudo: [
      { condicao: 'DM prévio compensado', interromper: '37-38+6 semanas', referencia: 'RCOG 2015' },
      { condicao: 'DM prévio com complicação vascular', interromper: '< 37 semanas', referencia: 'RCOG 2015' },
      { condicao: 'DM prévio descompensado', interromper: '< 37 semanas', referencia: 'RCOG 2015' },
      { condicao: 'DMG A1 (controle com dieta)', interromper: '39 a 40+6 semanas', referencia: 'ACOG 2018' },
      { condicao: 'DMG A2 (controle com medicação)', interromper: '39 semanas', referencia: 'ACOG 2018' },
      { condicao: 'DMG descompensada', interromper: '37 a 38+6 semanas', referencia: 'ACOG 2018' },
      { condicao: 'DMG sem controle mesmo internada', interromper: '34 a 36+6 semanas', referencia: 'ACOG 2018' },
    ],
    referencias: [
      'ACOG Practice Bulletin No. 190: Gestational Diabetes Mellitus. Obstet Gynecol. 2018',
      'Diabetes in pregnancy: management from preconception to the postnatal period. NICE guideline. 2015'
    ]
  },
  {
    id: 'tpp',
    titulo: 'Trabalho de Parto Prematuro',
    descricao: 'Tocólise, corticoterapia para maturação pulmonar e neuroproteção.',
    categoria: 'Obstetrícia',
    fonte: 'ACOG',
    cor: 'purple',
    icone: 'pregnant_woman',
    conteudo: [
      { condicao: 'RPMO', interromper: '34 semanas (individualizar)', referencia: 'ACOG 2020' },
      { condicao: 'Corioamnionite', interromper: 'Na ocasião do diagnóstico', referencia: 'UPTODATE 2020' },
    ],
    referencias: [
      'ACOG Committee Opinion No. 764: Medically Indicated Late-Preterm and Early-Term Deliveries. Obstet Gynecol. 2019'
    ]
  },
  {
    id: 'ciur',
    titulo: 'Restrição de Crescimento (CIUR)',
    descricao: 'Classificação precoce e tardia, estadiamento Doppler e momento do parto.',
    categoria: 'Medicina Fetal',
    fonte: 'ISUOG',
    cor: 'orange',
    icone: 'child_care',
    conteudo: [
      { condicao: 'Estágio I', interromper: '37 semanas', referencia: 'ISUOG 2020' },
      { condicao: 'Estágio II', interromper: '34 semanas', referencia: 'ISUOG 2020' },
      { condicao: 'Estágio III', interromper: '30-32 semanas', referencia: 'Gratacos 2014 / ISUOG 2020' },
      { condicao: 'Estágio IV', interromper: '26 semanas', referencia: 'Gratacos 2014' },
      { condicao: 'Estágio IV (cCTG STV < 2,6ms)', interromper: '26 a 28+6 semanas', referencia: 'ISUOG 2020' },
      { condicao: 'Estágio IV (cCTG STV < 3,0ms)', interromper: '29 a 31+6 semanas', referencia: 'ISUOG 2020' },
      { condicao: 'Macrossomia isolada', interromper: 'Não antes de 39 semanas', referencia: 'ACOG 2020' },
    ],
    referencias: [
      'ISUOG Practice Guidelines: diagnosis and management of small-for-gestational-age fetus and fetal growth restriction. Ultrasound Obstet Gynecol 2020',
      'Update on the Diagnosis and Classification of Fetal Growth Restriction and Proposal of a Stage-Based Management Protocol. Figueras F, Gratacós E. Fetal Diagn Ther. 2014'
    ]
  },
  {
    id: 'gemelar',
    titulo: 'Gestação Gemelar',
    descricao: 'Manejo de gestações mono e dicoriônicas, STFF e CIUR seletivo.',
    categoria: 'Medicina Fetal',
    fonte: 'SMFM',
    cor: 'pink',
    icone: 'family_restroom',
    conteudo: [
      { condicao: 'Di/Di não complicada', interromper: '38 semanas', referencia: 'ACOG 2016 / SMFM 2016' },
      { condicao: 'Mono/Di não complicada', interromper: '36 a 37 semanas', referencia: 'UPTODATE 2021' },
      { condicao: 'Mono/Mono', interromper: '32 a 34 semanas', referencia: 'SMFM 2016 / ACOG 2016' },
      { condicao: 'Di/Di com CIUR seletivo', interromper: '36 a 37+6 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Di/Di com doença concomitante', interromper: 'Individualizar', referencia: 'ACOG 2019' },
      { condicao: 'Mono/Di com CIUR seletivo', interromper: '32 a 34+6 semanas', referencia: 'ACOG 2019' },
    ],
    referencias: [
      'Practice Bulletin No. 169: Multifetal Gestations. Committee on Practice Bulletins—Obstetrics, SMFM. Obstet Gynecol. 2016'
    ]
  },
  {
    id: 'liquido',
    titulo: 'Desordens do Líquido Amniótico',
    descricao: 'Oligoâmnio, polidrâmnio e rotura prematura de membranas.',
    categoria: 'Obstetrícia',
    fonte: 'ACOG',
    cor: 'cyan',
    icone: 'water_drop',
    conteudo: [
      { condicao: 'Oligoâmnio idiopático', interromper: '36 a 37+6 semanas', referencia: 'ACOG 2019 / UPTODATE 2020' },
      { condicao: 'Polidrâmnio leve a moderado idiopático', interromper: '39 a 40 semanas', referencia: 'UPTODATE 2020' },
      { condicao: 'Polidrâmnio idiopático severo', interromper: '37 semanas', referencia: 'UPTODATE 2020' },
      { condicao: 'Polidrâmnio severo com sintomas', interromper: '34 a 37 semanas', referencia: 'UPTODATE 2020' },
    ],
    referencias: [
      'Oligohydramnios: etiology, diagnosis and management. UPTODATE 2020',
      'Polyhydramnios: Etiology, diagnosis, and management. UPTODATE 2020'
    ]
  },
  {
    id: 'hepaticas',
    titulo: 'Desordens Hepáticas',
    descricao: 'Colestase intrahepática e esteatose hepática aguda da gravidez.',
    categoria: 'Hepatologia',
    fonte: 'RCOG',
    cor: 'yellow',
    icone: 'science',
    conteudo: [
      { condicao: 'Colestase intrahepática (bem tolerada)', interromper: '36 a 37 semanas', referencia: 'ACOG 2019 / RCOG 2011' },
      { condicao: 'Colestase (não tolerada/histórico óbito)', interromper: '36 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Esteatose gravídica aguda', interromper: 'Após estabilização/imediata', referencia: 'UPTODATE 2021' },
    ],
    referencias: [
      'Obstetric Cholestasis. Green–top Guideline No. 43. RCOG. 2011'
    ]
  },
  {
    id: 'placenta',
    titulo: 'Desordens Placentárias',
    descricao: 'Placenta prévia, acretismo placentário e vasa prévia.',
    categoria: 'Obstetrícia',
    fonte: 'SMFM',
    cor: 'red',
    icone: 'emergency',
    conteudo: [
      { condicao: 'Vasa prévia', interromper: '34 a 37 semanas', referencia: 'ACOG 2019 / SMFM 2015' },
      { condicao: 'Acretismo placentário', interromper: '34 a 35+6 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Placenta prévia total', interromper: '36 a 37+6 semanas', referencia: 'ACOG 2019' },
    ],
    referencias: [
      'Diagnosis and management of vasa previa. SMFM Publications Committee. Am J Obstet Gynecol. 2015',
      'RCOG Green-top Guideline No. 27b Vasa Praevia. 2018'
    ]
  },
  {
    id: 'isoimunizacao',
    titulo: 'Isoimunização RH',
    descricao: 'Acompanhamento com Doppler de ACM e transfusão intrauterina.',
    categoria: 'Hematologia',
    fonte: 'SMFM',
    cor: 'indigo',
    icone: 'vaccines',
    conteudo: [
      { condicao: 'MCA-PSV < 1.5 MoMs para IG', interromper: '37 a 38+6 semanas', referencia: 'SMFM 2015 / ACOG 2019' },
      { condicao: 'MCA-PSV > 1.5 MoMs para IG', interromper: '> 35 semanas', referencia: 'UPTODATE 2021' },
      { condicao: 'Se transfusão intraútero', interromper: 'Individualizado', referencia: 'ACOG 2019' },
    ],
    referencias: [
      'SMFM Clinical Guideline #8: the fetus at risk for anemia. Am J Obstet Gynecol. 2015',
      'RhD alloimmunization in pregnancy: management. Moise Jr KJ. UPTODATE. 2020'
    ]
  },
  {
    id: 'hiv',
    titulo: 'HIV na Gestação',
    descricao: 'Manejo de TARV e via de parto conforme carga viral.',
    categoria: 'Infectologia',
    fonte: 'MS Brasil',
    cor: 'green',
    icone: 'medical_information',
    conteudo: [
      { condicao: 'TARV c/ CV indetectável', interromper: 'Termo', referencia: 'MS 2020' },
      { condicao: 'Após 34 sem: CV < 1000 cópias', interromper: 'Termo', referencia: 'MS 2020' },
      { condicao: 'Após 34 sem: CV > 1000 cópias', interromper: '38 semanas', referencia: 'MS 2020' },
      { condicao: 'CV desconhecida', interromper: '38 semanas', referencia: 'MS 2020' },
    ],
    referencias: [
      'Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST. Ministério da Saúde. 2019'
    ]
  },
  {
    id: 'cicatriz',
    titulo: 'Cicatriz Uterina Prévia',
    descricao: 'Cesárea iterativa, miomectomia e risco de rotura uterina.',
    categoria: 'Obstetrícia',
    fonte: 'ACOG',
    cor: 'gray',
    icone: 'content_cut',
    conteudo: [
      { condicao: 'Cesárea anterior (segmentar transversa)', interromper: 'Sem razão antes de 39 sem', referencia: 'ACOG 2019' },
      { condicao: 'Iterativa (≥2 cesáreas)', interromper: '38-39 semanas', referencia: 'SMFM / BJOG 2019' },
      { condicao: 'Cesárea segmentar vertical prévia', interromper: '39 semanas', referencia: 'UPTODATE 2020' },
      { condicao: 'Cesárea clássica (corporal) prévia', interromper: '36 a 37 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Antecedente de miomectomia', interromper: '37 a 38+6 semanas', referencia: 'ACOG 2019' },
      { condicao: 'Antecedente de rotura uterina', interromper: '36 a 37 semanas', referencia: 'ACOG 2019 / UPTODATE 2020' },
    ],
    referencias: [
      'ACOG Practice Bulletin No. 205: Vaginal Birth After Cesarean Delivery. Obstet Gynecol. 2019',
      'Uterine rupture: After previous cesarean delivery. UPTODATE 2020'
    ]
  },
];

const getCorClasses = (cor: string) => {
  const cores: Record<string, { bg: string; icon: string; badge: string }> = {
    red: { bg: 'bg-red-50', icon: 'text-red-500 bg-red-100', badge: 'bg-red-100 text-red-700' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-500 bg-blue-100', badge: 'bg-blue-100 text-blue-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-500 bg-purple-100', badge: 'bg-purple-100 text-purple-700' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-500 bg-orange-100', badge: 'bg-orange-100 text-orange-700' },
    pink: { bg: 'bg-pink-50', icon: 'text-pink-500 bg-pink-100', badge: 'bg-pink-100 text-pink-700' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-500 bg-cyan-100', badge: 'bg-cyan-100 text-cyan-700' },
    yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600 bg-yellow-100', badge: 'bg-yellow-100 text-yellow-700' },
    green: { bg: 'bg-green-50', icon: 'text-green-500 bg-green-100', badge: 'bg-green-100 text-green-700' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-500 bg-indigo-100', badge: 'bg-indigo-100 text-indigo-700' },
    gray: { bg: 'bg-gray-50', icon: 'text-gray-500 bg-gray-100', badge: 'bg-gray-100 text-gray-700' },
  };
  return cores[cor] || cores.blue;
};

export const GuiaConduta = () => {
  const [busca, setBusca] = useState('');
  const [protocoloAberto, setProtocoloAberto] = useState<Protocolo | null>(null);

  const protocolosFiltrados = protocolos.filter(p => 
    p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    p.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  if (protocoloAberto) {
    const cores = getCorClasses(protocoloAberto.cor);
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
          <button onClick={() => setProtocoloAberto(null)} className="p-1">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex-1">{protocoloAberto.titulo}</h1>
        </div>
        
        <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
          <div className={`${cores.bg} rounded-2xl p-4`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl ${cores.icon} flex items-center justify-center`}>
                <span className="material-symbols-outlined">{protocoloAberto.icone}</span>
              </div>
              <div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cores.badge}`}>
                  {protocoloAberto.fonte}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{protocoloAberto.descricao}</p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Momento da Interrupção</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {protocoloAberto.conteudo.map((item, idx) => (
                <div key={idx} className="px-4 py-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.condicao}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.referencia}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      {item.interromper}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Referências</h3>
            <ul className="space-y-2">
              {protocoloAberto.referencias.map((ref, idx) => (
                <li key={idx} className="text-xs text-gray-500 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
      <BackHeader title="Guia de Conduta" />
      
      <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">Condutas clínicas baseadas em diretrizes</p>
        
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Buscar por condição ou diretriz..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm dark:text-white"
          />
        </div>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Protocolos</h3>

        <div className="flex flex-col gap-3">
          {protocolosFiltrados.map(protocolo => {
            const cores = getCorClasses(protocolo.cor);
            return (
              <div
                key={protocolo.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setProtocoloAberto(protocolo)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl ${cores.icon} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{protocolo.icone}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cores.badge}`}>
                    {protocolo.fonte}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{protocolo.titulo}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{protocolo.descricao}</p>
                <button className="text-sm text-blue-500 font-medium flex items-center gap-1">
                  Acessar guia
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>

        {protocolosFiltrados.length === 0 && (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">search_off</span>
            <p className="text-gray-500 dark:text-gray-400">Nenhum protocolo encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
};
