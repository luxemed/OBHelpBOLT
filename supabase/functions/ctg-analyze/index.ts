// Supabase Edge Function - Análise de CTG com IA Multimodal
// Modelo: GPT-4o-mini (mais barato com suporte a imagem)
// Saída: JSON estruturado conforme critérios FIGO 2015

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Prompt clínico para análise CTG
const CTG_SYSTEM_PROMPT = `Você é um especialista em medicina fetal analisando um traçado de cardiotocografia (CTG).

INSTRUÇÕES:
1. Analise EXCLUSIVAMENTE a imagem do traçado CTG fornecida
2. Extraia os parâmetros conforme critérios FIGO 2015
3. Seja conservador - se não conseguir identificar um parâmetro, indique nas limitações
4. NÃO invente valores que não estão visíveis na imagem
5. Esta é uma ferramenta de APOIO - não forneça diagnóstico definitivo

PARÂMETROS A EXTRAIR:
- Linha de base (baseline_bpm): frequência cardíaca fetal basal em bpm (normal: 110-160)
- Variabilidade: "ausente" (<5bpm), "minima" (≤5bpm), "moderada" (5-25bpm), "aumentada" (>25bpm)
- Acelerações: true (≥15bpm por ≥15seg) ou false
- Desacelerações: "nenhuma", "precoces", "variaveis", "tardias", "prolongadas"
- Contrações por 10 minutos (se visível)

CLASSIFICAÇÃO FIGO:
- "normal": Linha base 110-160, variabilidade moderada, acelerações presentes, sem desacelerações repetitivas
- "suspeito": Um parâmetro anormal (exceto desacelerações tardias/prolongadas recorrentes)
- "patologico": Variabilidade ausente + desacelerações tardias/prolongadas, ou linha base <100/>180

RESPONDA APENAS COM JSON VÁLIDO no formato especificado, sem texto adicional.`;

const CTG_OUTPUT_FORMAT = `{
  "status": "ok",
  "guideline": "FIGO_2015",
  "confidence": 0.0,
  "parameters": {
    "baseline_bpm": 0,
    "variability": "ausente|minima|moderada|aumentada",
    "accelerations": true,
    "decelerations": "nenhuma|variaveis|tardias|prolongadas|precoces",
    "contractions_per_10min": null
  },
  "classification": {
    "figo": "normal|suspeito|patologico",
    "rationale": ["justificativa 1", "justificativa 2"]
  },
  "recommendation": {
    "urgency": "rotina|avaliar_rapido|urgente",
    "actions": ["ação sugerida 1", "ação sugerida 2"]
  },
  "limitations": ["limitação 1"]
}`;

// Função para redimensionar imagem usando Canvas API
async function resizeImage(base64Data: string, maxWidth = 1024, maxHeight = 1024): Promise<string> {
  // Para Deno, usamos uma abordagem mais simples - retornamos a imagem original
  // O GPT-4o-mini aceita imagens em low detail que são processadas automaticamente
  // Se precisar de resize real, usar ImageMagick WASM conforme documentação Supabase
  
  // Verifica se já é pequena o suficiente baseado no tamanho do base64
  const sizeInBytes = (base64Data.length * 3) / 4;
  const maxSize = 4 * 1024 * 1024; // 4MB limite para baixo custo
  
  if (sizeInBytes > maxSize) {
    throw new Error("Imagem muito grande. Por favor, use uma imagem menor que 4MB.");
  }
  
  return base64Data;
}

// Função para validar formato da imagem
function validateImageFormat(base64: string): { valid: boolean; mimeType: string } {
  if (base64.startsWith("data:image/jpeg") || base64.startsWith("data:image/jpg")) {
    return { valid: true, mimeType: "image/jpeg" };
  }
  if (base64.startsWith("data:image/png")) {
    return { valid: true, mimeType: "image/png" };
  }
  if (base64.startsWith("data:image/webp")) {
    return { valid: true, mimeType: "image/webp" };
  }
  // Se não tem prefixo, assume JPEG
  if (!base64.startsWith("data:")) {
    return { valid: true, mimeType: "image/jpeg" };
  }
  return { valid: false, mimeType: "" };
}

// Função para chamar a API OpenAI
async function analyzeWithOpenAI(imageBase64: string): Promise<object> {
  const validation = validateImageFormat(imageBase64);
  if (!validation.valid) {
    throw new Error("Formato de imagem não suportado. Use JPEG, PNG ou WebP.");
  }

  // Garante que a imagem tem o prefixo correto
  let imageUrl = imageBase64;
  if (!imageBase64.startsWith("data:")) {
    imageUrl = `data:${validation.mimeType};base64,${imageBase64}`;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: CTG_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise este traçado de cardiotocografia e retorne APENAS um JSON válido no seguinte formato:\n${CTG_OUTPUT_FORMAT}`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "low", // Usa "low" para menor custo ($0.001425 por imagem)
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.1, // Baixa temperatura para respostas mais consistentes
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("OpenAI API Error:", error);
    throw new Error(`Erro na API OpenAI: ${error.error?.message || "Erro desconhecido"}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Resposta vazia da API");
  }

  try {
    return JSON.parse(content);
  } catch {
    // Tenta extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Resposta inválida da IA - não foi possível extrair JSON");
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Valida API key
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "API key não configurada no servidor",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "Campo 'imageBase64' é obrigatório",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Valida tamanho (máximo 8MB para a imagem original)
    const rawBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const sizeInBytes = (rawBase64.length * 3) / 4;
    const maxSize = 8 * 1024 * 1024;

    if (sizeInBytes > maxSize) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "Imagem muito grande. Máximo permitido: 8MB",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Processa a imagem (resize se necessário)
    const processedImage = await resizeImage(imageBase64);

    // Analisa com OpenAI
    const resultado = await analyzeWithOpenAI(processedImage);

    // Retorna resultado
    return new Response(
      JSON.stringify(resultado),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error processing CTG:", error);
    
    return new Response(
      JSON.stringify({
        status: "error",
        error: error.message || "Erro interno ao processar análise",
        guideline: "FIGO_2015",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
