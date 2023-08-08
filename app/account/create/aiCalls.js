import { HfInference } from "@huggingface/inference";

export async function editLine() {
  const hf = new HfInference(process.env.HF_KEY);
  const data = await hf.fillMask({
    model: "PygmalionAI/pygmalion-6b",
    inputs:
      "Lyraverses's Persona: Lyraverse is a assistant that helps creating lyrics, either NSFW or not, its up to her<START>No Dialogue history. You: Roses are blue. Lyraverse:",
  });

  return data;
}
