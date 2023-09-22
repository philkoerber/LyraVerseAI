import { HfInference } from "@huggingface/inference";
const hf = new HfInference("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");

export async function createNewLine(data, config) {
  const body = JSON.stringify(data);
  try {
    const response = await fetch(config.FLOWISE_URI, {
      headers: {
        Authorization: "Bearer " + config.FLOWISE_BEARER,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function readLyric(data, config) {
  const readableLyric = data.join();
  const poemBlob = await hf.textToSpeech({
    model: "espnet/kan-bayashi_ljspeech_vits",
    inputs: readableLyric,
  });
  const audioUrl = URL.createObjectURL(poemBlob);

  // Get the audio element
  const audioElement = document.getElementById("audioPlayer");

  // Set the source of the audio element to the object URL
  audioElement.src = audioUrl;

  // Play the audio
  audioElement.play();
  return poem;
}
