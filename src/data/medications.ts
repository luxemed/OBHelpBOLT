import { Medication, MedicationDetailsDB, MedicationDetails } from '../types/medication';

export const ALL_MEDICATIONS: Medication[] = [
  { name: "Metildopa", desc: "Anti-hipertensivo de ação central. Primeira escolha na gestação.", risk: "B", type: "Cardiovascular", icon: "pill" },
  { name: "Nifedipino", desc: "Bloqueador de canal de cálcio. Tocolítico e anti-hipertensivo.", risk: "C", type: "Cardiovascular", icon: "pill" },
  { name: "Hidralazina", desc: "Vasodilatador periférico. Usado em emergências hipertensivas.", risk: "C", type: "Cardiovascular", icon: "pill" },
  { name: "Labetalol", desc: "Betabloqueador. Usado em emergências e manutenção.", risk: "C", type: "Cardiovascular", icon: "favorite" },
  { name: "Captopril", desc: "Inibidor da ECA. Contraindicado (fetopatia).", risk: "D", type: "Anti-hipertensivo", icon: "dangerous" },
  { name: "Enalapril", desc: "Inibidor da ECA. Contraindicado (fetopatia).", risk: "D", type: "Anti-hipertensivo", icon: "dangerous" },
  { name: "Losartana", desc: "BRA. Contraindicado (fetopatia/oligodrâmnio).", risk: "D", type: "Anti-hipertensivo", icon: "dangerous" },
  { name: "Furosemida", desc: "Diurético de alça. Uso restrito (edema agudo).", risk: "C", type: "Diurético", icon: "water_drop" },

  { name: "Paracetamol", desc: "Analgésico e antipirético de escolha.", risk: "B", type: "Analgésico", icon: "medication" },
  { name: "Dipirona", desc: "Analgésico. Evitar uso crônico ou em altas doses.", risk: "C", type: "Analgésico", icon: "medication" },
  { name: "Ácido Acetilsalicílico (AAS)", desc: "Baixa dose: prevenção PE. Alta dose: evitar 3º tri.", risk: "C/D", type: "Antiagregante", icon: "pill" },
  { name: "Ibuprofeno", desc: "AINE. Contraindicado após 30 semanas (fechamento ducto).", risk: "B/D", type: "Anti-inflamatório", icon: "warning_amber" },
  { name: "Diclofenaco", desc: "AINE. Contraindicado 3º trimestre.", risk: "C/D", type: "Anti-inflamatório", icon: "warning_amber" },
  { name: "Indometacina", desc: "AINE. Usado como tocolítico (<32 sem). Fechamento ducto.", risk: "B/D", type: "Tocolítico", icon: "warning_amber" },
  { name: "Naproxeno", desc: "AINE. Contraindicado após 30 semanas.", risk: "B/D", type: "Anti-inflamatório", icon: "warning_amber" },
  { name: "Celecoxibe", desc: "Inibidor COX-2. Evitar 3º trimestre.", risk: "C/D", type: "Anti-inflamatório", icon: "warning_amber" },
  { name: "Cetoprofeno", desc: "AINE. Contraindicado após 30 semanas.", risk: "B/D", type: "Anti-inflamatório", icon: "warning_amber" },
  { name: "Tramadol", desc: "Opioide fraco. Uso se benefício > risco.", risk: "C", type: "Analgésico", icon: "pill" },
  { name: "Codeína", desc: "Opioide. Risco de dependência neonatal.", risk: "C", type: "Analgésico", icon: "pill" },
  { name: "Morfina", desc: "Opioide forte. Depressão respiratória neonatal.", risk: "C", type: "Analgésico", icon: "pill" },

  { name: "Cefalexina", desc: "Cefalosporina 1ªG. Seguro para ITU.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Amoxicilina", desc: "Penicilina. Seguro.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Nitrofurantoína", desc: "ITU. Evitar a termo (hemólise fetal).", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Azitromicina", desc: "Macrolídeo. Tratamento de Chlamydia.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Clindamicina", desc: "Lincosamida. Alternativa em alergia a penicilina.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Penicilina G Benzatina", desc: "Benzetacil. Escolha para Sífilis.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Penicilina G Cristalina", desc: "Intravenoso. Estreptococo do grupo B.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Ampicilina", desc: "Aminopenicilina. Ruptura de membranas.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Ceftriaxona", desc: "Cefalosporina 3ªG. Pielonefrite.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Gentamicina", desc: "Aminoglicosídeo. Risco de ototoxicidade fetal.", risk: "D", type: "Antibiótico", icon: "hearing_disabled" },
  { name: "Doxiciclina", desc: "Tetraciclina. Contraindicado (dentes/ossos).", risk: "D", type: "Antibiótico", icon: "dangerous" },
  { name: "Metronidazol", desc: "Vaginose bacteriana. Evitar altas doses 1º tri.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Ciprofloxacino", desc: "Quinolona. Evitar (lesão cartilagem).", risk: "C", type: "Antibiótico", icon: "warning_amber" },
  { name: "Sulfametoxazol + Trimetoprima", desc: "Bactrim. Evitar 1º tri (folato) e termo (icterícia).", risk: "D", type: "Antibiótico", icon: "warning_amber" },
  { name: "Vancomicina", desc: "Glicopeptídeo. Infecções resistentes.", risk: "C", type: "Antibiótico", icon: "bug_report" },
  { name: "Meropenem", desc: "Carbapenêmico. Infecções graves.", risk: "B", type: "Antibiótico", icon: "bug_report" },
  { name: "Fosfomicina", desc: "Dose única para ITU.", risk: "B", type: "Antibiótico", icon: "bug_report" },

  { name: "Dimenidrinato", desc: "Antiemético seguro.", risk: "B", type: "Antiemético", icon: "pill" },
  { name: "Metoclopramida", desc: "Antiemético. Risco de efeitos extrapiramidais.", risk: "B", type: "Antiemético", icon: "pill" },
  { name: "Ondansetrona", desc: "Antiemético. Uso cauteloso no 1º trimestre.", risk: "B", type: "Antiemético", icon: "pill" },
  { name: "Omeprazol", desc: "IBP. Considerado seguro.", risk: "C", type: "Gastrointestinal", icon: "pill" },
  { name: "Ranitidina", desc: "Antagonista H2. Retirado de alguns mercados.", risk: "B", type: "Gastrointestinal", icon: "pill" },
  { name: "Buscopan (Escopolamina)", desc: "Antiespasmódico.", risk: "C", type: "Antiespasmódico", icon: "pill" },

  { name: "Loratadina", desc: "Antihistamínico 2ªG. Preferível.", risk: "B", type: "Antialérgico", icon: "air" },
  { name: "Desloratadina", desc: "Antihistamínico.", risk: "C", type: "Antialérgico", icon: "air" },
  { name: "Fexofenadina", desc: "Antihistamínico.", risk: "C", type: "Antialérgico", icon: "air" },
  { name: "Dexclorfeniramina", desc: "Antihistamínico 1ªG (Polaramine).", risk: "B", type: "Antialérgico", icon: "air" },
  { name: "Prednisona", desc: "Corticoide. Metabolizada na placenta.", risk: "C", type: "Corticoide", icon: "pill" },
  { name: "Dexametasona", desc: "Corticoide. Cruza placenta (maturação pulmonar).", risk: "C", type: "Corticoide", icon: "pill" },
  { name: "Betametasona", desc: "Corticoide. Maturação pulmonar fetal.", risk: "C", type: "Corticoide", icon: "pill" },
  { name: "Ambroxol", desc: "Mucolítico.", risk: "C", type: "Respiratório", icon: "water_drop" },

  { name: "Fluoxetina", desc: "ISRS. Risco baixo, avaliar benefício.", risk: "C", type: "Psiquiatria", icon: "psychology" },
  { name: "Sertralina", desc: "ISRS. Considerada segura, inclusive lactação.", risk: "C", type: "Psiquiatria", icon: "psychology" },
  { name: "Paroxetina", desc: "ISRS. Risco de malformação cardíaca.", risk: "D", type: "Psiquiatria", icon: "warning_amber" },
  { name: "Amitriptilina", desc: "Tricíclico.", risk: "C", type: "Psiquiatria", icon: "psychology" },
  { name: "Diazepam", desc: "Benzodiazepínico. Risco de 'floppy infant'.", risk: "D", type: "Psiquiatria", icon: "bedtime" },
  { name: "Clonazepam", desc: "Benzodiazepínico. Evitar uso crônico.", risk: "D", type: "Psiquiatria", icon: "bedtime" },
  { name: "Alprazolam", desc: "Benzodiazepínico.", risk: "D", type: "Psiquiatria", icon: "bedtime" },
  { name: "Carbamazepina", desc: "Anticonvulsivante. Risco de defeitos tubo neural.", risk: "D", type: "Neurologia", icon: "warning_amber" },
  { name: "Ácido Valproico", desc: "Anticonvulsivante. Alto risco teratogênico.", risk: "X", type: "Neurologia", icon: "dangerous" },
  { name: "Fenobarbital", desc: "Anticonvulsivante. Risco hemorrágico neonatal.", risk: "D", type: "Neurologia", icon: "warning_amber" },
  { name: "Topiramato", desc: "Anticonvulsivante. Fenda palatina.", risk: "D", type: "Neurologia", icon: "warning_amber" },

  { name: "Levotiroxina", desc: "Hormônio tireoidiano. Ajustar dose.", risk: "A", type: "Endócrino", icon: "bloodtype" },
  { name: "Insulina", desc: "Padrão ouro para diabetes.", risk: "B", type: "Endócrino", icon: "bloodtype" },
  { name: "Metformina", desc: "Hipoglicemiante oral. Cruza placenta.", risk: "B", type: "Endócrino", icon: "bloodtype" },
  { name: "Varfarina", desc: "Anticoagulante. Embriopatia varfarínica.", risk: "X", type: "Anticoagulante", icon: "dangerous" },
  { name: "Enoxaparina", desc: "HBPM. Não cruza placenta. Escolha.", risk: "B", type: "Anticoagulante", icon: "bloodtype" },
  { name: "Heparina Sódica", desc: "Não cruza placenta.", risk: "C", type: "Anticoagulante", icon: "bloodtype" },
  { name: "Rivaroxabana", desc: "DOAC. Evitar na gestação (dados limitados).", risk: "C", type: "Anticoagulante", icon: "dangerous" },
  { name: "Apixabana", desc: "DOAC. Evitar na gestação.", risk: "C", type: "Anticoagulante", icon: "dangerous" },
  { name: "Metotrexato", desc: "Antagonista folato. Aborto/Malformações.", risk: "X", type: "Antineoplásico", icon: "dangerous" },
  { name: "Ciclofosfamida", desc: "Alquilante. Teratogênico no 1º tri.", risk: "D", type: "Antineoplásico", icon: "dangerous" },
  { name: "Tamoxifeno", desc: "Modulador estrogênio. Risco fetal.", risk: "D", type: "Antineoplásico", icon: "dangerous" },
  { name: "Azatioprina", desc: "Imunossupressor. Avaliar risco/benefício.", risk: "D", type: "Imunossupressor", icon: "warning_amber" },
  { name: "Hidroxicloroquina", desc: "Antimalárico. Seguro para Lupus/Artrite.", risk: "C", type: "Reumatológico", icon: "pill" },
  { name: "Ácido Fólico", desc: "Prevenção DTN.", risk: "A", type: "Suplemento", icon: "nutrition" },
  { name: "Sulfato Ferroso", desc: "Tratamento anemia.", risk: "A", type: "Suplemento", icon: "nutrition" },
  { name: "Misoprostol", desc: "Indução/Aborto. Teratogênico (Moebius).", risk: "X", type: "Ocitócico", icon: "dangerous" },
  { name: "Atosibana", desc: "Antagonista ocitocina. Tocolítico seguro.", risk: "A", type: "Tocolítico", icon: "pregnant_woman" },
  { name: "Terbutalina", desc: "Beta-agonista. Tocolise de urgência.", risk: "B/C", type: "Tocolítico", icon: "pregnant_woman" },
  { name: "Aciclovir", desc: "Antiviral. Seguro para Herpes.", risk: "B", type: "Antiviral", icon: "bug_report" },
  { name: "Fluconazol", desc: "Antifúngico. Dose única segura; altas doses risco.", risk: "C", type: "Antifúngico", icon: "bug_report" }
];

export const MEDICATION_DETAILS_DB: MedicationDetailsDB = {
  "Metildopa": {
    indication: "Hipertensão Arterial Crônica ou Gestacional. Droga de 1ª linha para tratamento da hipertensão leve a moderada.",
    posology: {
      start: "250 mg via oral, 2 a 3 vezes ao dia.",
      maintenance: "500 mg a 2 g/dia, divididos em 2 a 4 tomadas.",
      max: "3 g/dia.",
      adjustments: "Ajuste conforme resposta pressórica a cada 2 dias."
    },
    maternal: "Sonolência (comum, transitória), boca seca, cefaleia, hipotensão postural. Raros: anemia hemolítica, toxicidade hepática.",
    fetal: "Não há relatos de associação com malformações congênitas ou efeitos adversos fetais significativos. Seguro.",
    contra: [
      "Hepatopatia ativa (hepatite, cirrose)",
      "Hipersensibilidade aos componentes",
      "Depressão (precaução)"
    ],
    evidence: [
      "FDA – Pregnancy Labeling Rule (Antiga Categ. B)",
      "ACOG Practice Bulletin No. 203 (2019)",
      "FEBRASGO – Manual de Hipertensão (2019)"
    ]
  },
  "Nifedipino": {
    indication: "Hipertensão Grave (rápida ação - Retard) ou Tocolise (inibir trabalho de parto prematuro).",
    posology: {
      start: "Hipertensão: 10-20 mg VO (comprimido retard) a cada 20-30 min.",
      maintenance: "Tocolise: Dose de ataque 20mg, seguida de manutenção.",
      max: "120 mg/dia.",
      adjustments: "Não utilizar via sublingual (risco de hipotensão severa)."
    },
    maternal: "Cefaleia, flushing (rubor facial), taquicardia, edema de membros inferiores, hipotensão.",
    fetal: "Não associado a teratogenicidade. Pode causar hipofluxo uteroplacentário se hipotensão materna severa.",
    contra: [
      "Hipersensibilidade",
      "Estenose aórtica grave",
      "Uso concomitante com sulfato de magnésio (cautela - bloqueio neuromuscular)"
    ],
    evidence: [
      "ACOG Practice Bulletin No. 171 (2016)",
      "RCOG Green-top Guideline (2011)"
    ]
  },
  "Paracetamol": {
    indication: "Analgesia leve a moderada e antipirético. Droga de escolha na gestação.",
    posology: {
      start: "500 a 750 mg via oral.",
      maintenance: "A cada 4 a 6 horas, se necessário.",
      max: "4 g/dia (4000 mg).",
      adjustments: "Evitar uso crônico sem supervisão."
    },
    maternal: "Raramente reações alérgicas. Hepatotoxicidade em overdose.",
    fetal: "Seguro em doses terapêuticas. Estudos recentes sugerem cautela com uso prolongado (risco neurológico/TDAH em debate, mas inconclusivo).",
    contra: [
      "Hipersensibilidade",
      "Insuficiência hepática grave"
    ],
    evidence: [
      "FDA – Pregnancy Labeling Rule",
      "ACOG Response to Consensus Statement (2021)"
    ]
  },
  "Cefalexina": {
    indication: "Infecções do Trato Urinário (ITU), infecções de pele e tecidos moles.",
    posology: {
      start: "500 mg via oral.",
      maintenance: "A cada 6 horas por 7 a 10 dias (ITU baixa).",
      max: "4 g/dia.",
      adjustments: "Ajustar em insuficiência renal grave."
    },
    maternal: "Náusea, vômito, diarreia, candidíase vaginal. Reação alérgica cruzada com penicilina (baixa prob.).",
    fetal: "Não há evidência de teratogenicidade. Cruza a placenta.",
    contra: [
      "Hipersensibilidade a cefalosporinas",
      "História de anafilaxia a penicilinas"
    ],
    evidence: [
      "FDA Category B",
      "CDC Treatment Guidelines"
    ]
  }
};

export const GENERIC_DETAILS: MedicationDetails = {
  indication: "Consulte as diretrizes específicas para esta medicação.",
  posology: {
    start: "Individualizada.",
    maintenance: "Conforme critério médico.",
    max: "Ver bula.",
    adjustments: "-"
  },
  maternal: "Verificar perfil de segurança completo.",
  fetal: "Avaliar risco/benefício caso a caso.",
  contra: ["Hipersensibilidade"],
  evidence: ["Consulte farmacopeia local"]
};
