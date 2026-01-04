import { useState, useRef } from 'react';
import { BackHeader } from '../components/BackHeader';
import { supabase } from '../lib/supabase';

interface CTGResult {
  guideline: string;
  confidence: number;
  parameters: {
    baseline_bpm: number;
    variability: string;
    accelerations: boolean;
    decelerations: string;
    contractions_per_10min: number | null;
  };
  classification: {
    figo: 'normal' | 'suspeito' | 'patologico';
    rationale: string[];
  };
  recommendation: {
    urgency: 'rotina' | 'avaliar_rapido' | 'urgente';
    actions: string[];
  };
  limitations: string[];
}

export const Cardiotocografia = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<CTGResult | null>(null);
  const [copiado, setCopiado] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setArquivo(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResultado(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const [erro, setErro] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const analisarCTG = async () => {
    if (!arquivo) return;
    
    setAnalisando(true);
    setErro(null);
    
    try {
      const imageBase64 = await fileToBase64(arquivo);
      
      const { data, error } = await supabase.functions.invoke('ctg-analyze', {
        body: { imageBase64 }
      });
      
      if (error) {
        throw new Error(error.message || 'Erro ao analisar CTG');
      }
      
      if (data.status === 'error') {
        throw new Error(data.message || 'Erro na análise');
      }
      
      setResultado({
        guideline: data.guideline,
        confidence: data.confidence,
        parameters: data.parameters,
        classification: data.classification,
        recommendation: data.recommendation,
        limitations: data.limitations || []
      });
    } catch (err: any) {
      console.error('Erro CTG:', err);
      setErro(err.message || 'Erro ao processar imagem. Tente novamente.');
    } finally {
      setAnalisando(false);
    }
  };

  const copiarLaudo = () => {
    if (!resultado) return;
    
    const laudo = `LAUDO CARDIOTOCOGRAFIA - Análise Automatizada

PARÂMETROS:
- Linha de Base: ${resultado.parameters.baseline_bpm} bpm
- Variabilidade: ${getVariabilidadeLabel(resultado.parameters.variability)}
- Acelerações: ${resultado.parameters.accelerations ? 'Presentes' : 'Ausentes'}
- Desacelerações: ${resultado.parameters.decelerations.charAt(0).toUpperCase() + resultado.parameters.decelerations.slice(1)}
${resultado.parameters.contractions_per_10min ? `- Contrações: ${resultado.parameters.contractions_per_10min}/10min` : ''}

CLASSIFICAÇÃO FIGO: ${resultado.classification.figo.toUpperCase()}
${resultado.classification.rationale.map(r => `• ${r}`).join('\n')}

CONDUTA SUGERIDA (${resultado.recommendation.urgency.replace('_', ' ').toUpperCase()}):
${resultado.recommendation.actions.map(a => `• ${a}`).join('\n')}

---
Ferramenta de apoio à decisão clínica. Não substitui avaliação médica.
Ref: Critérios FIGO 2015`;
    
    navigator.clipboard.writeText(laudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const getClassificacaoStyle = (classificacao: string) => {
    switch (classificacao) {
      case 'normal': return { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-500', border: 'border-green-200' };
      case 'suspeito': return { bg: 'bg-yellow-100', text: 'text-yellow-800', badge: 'bg-yellow-500', border: 'border-yellow-200' };
      case 'patologico': return { bg: 'bg-red-100', text: 'text-red-800', badge: 'bg-red-500', border: 'border-red-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', badge: 'bg-gray-500', border: 'border-gray-200' };
    }
  };

  const getUrgenciaStyle = (urgencia: string) => {
    switch (urgencia) {
      case 'rotina': return { bg: 'bg-green-50', text: 'text-green-700', icon: 'check_circle' };
      case 'avaliar_rapido': return { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: 'schedule' };
      case 'urgente': return { bg: 'bg-red-50', text: 'text-red-700', icon: 'warning' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', icon: 'info' };
    }
  };

  const getVariabilidadeLabel = (v: string) => {
    switch (v) {
      case 'ausente': return 'Ausente';
      case 'minima': return 'Mínima';
      case 'moderada': return 'Moderada';
      case 'aumentada': return 'Aumentada';
      default: return v;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
      <BackHeader title="Cardiotocografia" />
      
      <main className="flex-1 px-4 pt-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-lg">info</span>
            <div className="text-xs text-amber-700 dark:text-amber-300">
              <p className="font-semibold mb-1">Avisos importantes:</p>
              <ul className="space-y-0.5">
                <li>• Ferramenta de apoio à decisão clínica</li>
                <li>• Não substitui avaliação médica</li>
                <li>• Análise baseada em critérios FIGO 2015</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload do Traçado CTG</h3>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-white dark:bg-gray-800 border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="CTG Preview" className="max-h-40 rounded-lg mb-2" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-blue-500 text-3xl">cloud_upload</span>
              </div>
            )}
            <p className="text-sm text-gray-600 text-center">
              {arquivo ? arquivo.name : 'Toque para fazer upload ou arraste a imagem'}
            </p>
            <p className="text-xs text-gray-400 mt-1">Formatos: JPEG, PNG</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-500 text-lg">error</span>
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          </div>
        )}

        {arquivo && (
          <button
            onClick={analisarCTG}
            disabled={analisando}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
          >
            {analisando ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analisando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">analytics</span>
                Analisar CTG
              </>
            )}
          </button>
        )}

        {resultado && (
          <>
            <div className={`rounded-2xl p-4 border-2 ${getClassificacaoStyle(resultado.classification.figo).bg} ${getClassificacaoStyle(resultado.classification.figo).border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined ${getClassificacaoStyle(resultado.classification.figo).text}`}>
                    {resultado.classification.figo === 'normal' ? 'check_circle' : resultado.classification.figo === 'suspeito' ? 'warning' : 'error'}
                  </span>
                  <h4 className="font-bold text-gray-800">Classificação FIGO</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getClassificacaoStyle(resultado.classification.figo).badge}`}>
                  {resultado.classification.figo.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-1">
                {resultado.classification.rationale.map((r, i) => (
                  <p key={i} className="text-sm text-gray-700">• {r}</p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Parâmetros Extraídos</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Linha de Base</p>
                  <p className="text-xl font-bold text-gray-800">{resultado.parameters.baseline_bpm} <span className="text-sm font-normal">bpm</span></p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Variabilidade</p>
                  <p className={`text-lg font-bold ${
                    resultado.parameters.variability === 'moderada' ? 'text-green-600' :
                    resultado.parameters.variability === 'minima' ? 'text-yellow-600' : 
                    resultado.parameters.variability === 'ausente' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {getVariabilidadeLabel(resultado.parameters.variability)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Acelerações</p>
                  <p className={`text-sm font-semibold ${resultado.parameters.accelerations ? 'text-green-600' : 'text-yellow-600'}`}>
                    {resultado.parameters.accelerations ? 'Presentes' : 'Ausentes'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Desacelerações</p>
                  <p className={`text-sm font-semibold ${
                    resultado.parameters.decelerations === 'nenhuma' ? 'text-green-600' : 
                    resultado.parameters.decelerations === 'precoces' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {resultado.parameters.decelerations.charAt(0).toUpperCase() + resultado.parameters.decelerations.slice(1)}
                  </p>
                </div>
              </div>
              
              {resultado.parameters.contractions_per_10min && (
                <div className="mt-3 bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Contrações Uterinas</p>
                  <p className="text-sm font-semibold text-gray-800">{resultado.parameters.contractions_per_10min} / 10 min</p>
                </div>
              )}
            </div>

            <div className={`rounded-2xl p-4 ${getUrgenciaStyle(resultado.recommendation.urgency).bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined ${getUrgenciaStyle(resultado.recommendation.urgency).text}`}>
                  {getUrgenciaStyle(resultado.recommendation.urgency).icon}
                </span>
                <h4 className="font-semibold text-gray-800">Conduta Sugerida</h4>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${getUrgenciaStyle(resultado.recommendation.urgency).text} bg-white/50`}>
                  {resultado.recommendation.urgency.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <ul className="space-y-2">
                {resultado.recommendation.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-gray-400 text-sm mt-0.5">arrow_right</span>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={copiarLaudo}
              className="w-full py-3 px-4 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                {copiado ? 'check' : 'content_copy'}
              </span>
              {copiado ? 'Laudo Copiado!' : 'Copiar Laudo'}
            </button>

            <p className="text-center text-xs text-gray-400">
              Ref: Critérios FIGO 2015
            </p>
          </>
        )}

        {!arquivo && !resultado && (
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-500 text-xl">help</span>
              <div>
                <h4 className="text-sm font-semibold text-blue-800 mb-1">Como usar</h4>
                <p className="text-xs text-blue-700">
                  Faça upload de uma imagem do traçado cardiotocográfico (foto ou scan). 
                  O sistema analisará o padrão e fornecerá classificação FIGO com sugestões de conduta.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
