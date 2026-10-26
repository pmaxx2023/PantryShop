export const MODEL_ID = 'HuggingFaceTB/SmolVLM-256M-Instruct';
export const MODEL_RUNTIME = '@huggingface/transformers@3.8.1';
export const RECOGNITION_DISCLAIMER = 'Ingredient suggestions are model output. They can be wrong. Nothing is added to your kitchen until you confirm it. PShop does not guess freshness, hidden food, or dates, and it does not present recognition text as fact.';

export function parseRecognitionLines(text) {
  if (typeof text !== 'string' || !text.trim()) return [];
  const names = text.split(/[\n;,]+/).map(line => line.replace(/^\s*[-*\d.)]+\s*/, '').trim()).filter(line => line.length > 1 && line.length < 90 && !/^(the image|here are|i can|this image)/i.test(line));
  const items = [];
  for (const name of names) {
    if (items.some(existing => existing.toLowerCase() === name.toLowerCase())) continue;
    items.push(name);
  }
  return items.slice(0, 40);
}
