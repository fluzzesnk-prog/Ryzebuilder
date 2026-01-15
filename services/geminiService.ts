
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Voe como o arquiteto líder da Stripe/Apple. Gere apenas HTML+Tailwind puro.
REQ_DESIGN:
- Estética: "Linear.app style", clean, high-contrast, dark/light mode savvy.
- UI: Bento Grids, glassmorphism (backdrop-blur-md, white/10 border), shadows profundas.
- Animações: Tailwind 'animate-in fade-in slide-in-from-bottom-4 duration-700'.
- Spacing: py-24 a py-32 para seções. Nunca aperte o conteúdo.
REQ_TECH:
- Ícones: Lucide (CDN: https://unpkg.com/lucide@latest). SEMPRE rode <script>lucide.createIcons();</script> no fim.
- Fontes: Google Fonts 'Inter' ou 'Plus Jakarta Sans'.
- Imagens: Unsplash URLs profissionais (resolução 1200x800+).
REQ_COPY:
- Elite: Copy em PT-BR focada em conversão (Headline -> Sub -> Benefícios -> CTA).
- Sem placeholders: Invente nomes e dados profissionais coerentes com o nicho.
OUTPUT:
- APENAS CÓDIGO BRUTO. SEM CONVERSA. SEM MARKDOWN.
- Comece com <!DOCTYPE html> se for site completo ou <div se for componente.
`;

export const generateWebsite = async (
  description: string, 
  currentHtml?: string, 
  customApiKey?: string,
  retries = 3, 
  delay = 10000 
): Promise<string> => {
  const activeKey = customApiKey || process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: activeKey });
  
  // Padronizado para Flash para garantir escala e velocidade no tier gratuito
  const modelToUse = 'gemini-3-flash-preview';

  const prompt = currentHtml 
    ? `RYZE_REFINE: Atualize este código. REQ: "${description}". CODE: ${currentHtml}. Mantenha a estrutura, mude apenas o solicitado.`
    : `RYZE_CREATE: Crie do zero um(a) ${description}. Deve ser visualmente impactante e pronto para conversão.`;

  try {
    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Mais baixo para ser mais assertivo no código
        topP: 0.8,
      },
    });

    let text = response.text || '';
    const codeBlockRegex = /```html\s?([\s\S]*?)```/i;
    const match = text.match(codeBlockRegex);
    
    let cleanedCode = match && match[1] ? match[1].trim() : text.trim();
    cleanedCode = cleanedCode.replace(/^```html/i, '').replace(/```$/i, '').trim();

    if (!cleanedCode.startsWith('<')) {
      const firstTag = cleanedCode.indexOf('<');
      if (firstTag !== -1) cleanedCode = cleanedCode.substring(firstTag);
    }
    
    return cleanedCode;
    
  } catch (error: any) {
    console.error("Ryze Engine Error:", error);
    const msg = error.message || "";
    const isQuota = msg.includes("429") || msg.includes("QUOTA");

    if (isQuota && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateWebsite(description, currentHtml, customApiKey, retries - 1, delay + 5000);
    }
    
    throw new Error(isQuota ? "Motor em alta demanda. Tente novamente em alguns segundos." : "Erro na geração. Refine sua descrição e tente novamente.");
  }
};
