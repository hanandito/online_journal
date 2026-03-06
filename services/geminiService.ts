import { GoogleGenerativeAI } from "@google/generative-ai";

// Agar TypeScript tidak bingung dengan import.meta.env di Vite
interface ImportMeta {
  readonly env: {
    readonly VITE_GEMINI_API_KEY: string;
  };
}

// 1. Ambil API Key menggunakan standar Vite
const apiKey = (import.meta as unknown as ImportMeta).env.VITE_GEMINI_API_KEY;

// 2. Inisialisasi dengan pengecekan agar tidak error saat API Key kosong
const ai = new GoogleGenerativeAI(apiKey || "");

export async function generateReflection(content: string, mood: string) {
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    const prompt = `Jurnal pengguna hari ini: "${content}". 
                Mood pengguna: ${mood}. 
                Berikan refleksi singkat, empati, dan satu saran kecil atau pertanyaan reflektif untuk besok dalam Bahasa Indonesia yang hangat.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Reflection Error:", error);
    return "Maaf, AI sedang beristirahat sejenak. Tetap semangat!";
  }
}

export async function getInsights(entries: string) {
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `Analisis kumpulan jurnal berikut dan berikan ringkasan tren emosi serta saran pertumbuhan diri dalam format JSON: ${entries}. 
    Format JSON harus memiliki key: summary (string), dominantMood (string), dan growthTips (array of strings).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return null;
  }
}