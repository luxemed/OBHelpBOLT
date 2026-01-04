# Supabase Edge Function: CTG Analyze

Analisa traçados de cardiotocografia (CTG) usando IA multimodal (GPT-4o-mini).

## Configuração

### 1. Instalar Supabase CLI
```bash
npm install -g supabase
```

### 2. Login no Supabase
```bash
supabase login
```

### 3. Configurar Secrets
```bash
# Adicionar chave da OpenAI
supabase secrets set OPENAI_API_KEY=sk-sua-chave-aqui
```

### 4. Deploy da Função
```bash
supabase functions deploy ctg-analyze --no-verify-jwt
```

## Uso

### Endpoint
```
POST https://<projeto>.supabase.co/functions/v1/ctg-analyze
```

### Request
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

### Response (FIGO 2015)
```json
{
  "status": "ok",
  "guideline": "FIGO_2015",
  "confidence": 0.85,
  "parameters": {
    "baseline_bpm": 145,
    "variability": "moderada",
    "accelerations": true,
    "decelerations": "nenhuma",
    "contractions_per_10min": 3
  },
  "classification": {
    "figo": "normal",
    "rationale": [
      "Linha de base normal (145 bpm)",
      "Variabilidade moderada presente",
      "Acelerações reativas presentes"
    ]
  },
  "recommendation": {
    "urgency": "rotina",
    "actions": [
      "Manter vigilância habitual",
      "Repetir CTG conforme protocolo"
    ]
  },
  "limitations": []
}
```

## Custos

- Modelo: GPT-4o-mini
- Custo por análise: ~$0.002 (low detail)
- Limite de imagem: 8MB

## Classificação FIGO

| Classificação | Critérios |
|---------------|-----------|
| Normal | Linha base 110-160, variabilidade moderada, acelerações +, sem desacelerações |
| Suspeito | Um parâmetro anormal |
| Patológico | Variabilidade ausente + desacelerações tardias/prolongadas |
