//#region Dependency
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import emojiStrip from "emoji-strip";
import { useState } from "react";
//#endregion

const setVoiceText = (text: string | undefined) => {
  if (text) {
    text = emojiStrip(text);
    let parts = text.split("<<").join("").split(">>");
    text = parts[1];
    return text;
  } else {
    return "回應出錯！";
  }
};

//#region Vits
/* const url = "http://127.0.0.1:23456/voice/vits?text=";
const voice_id = 9;
const lang = "gd";
const length = 1.5;

const vitsCalling = async () => {
  console.log("Vits CALLING...");
  const text = voice_text;
  const api =
    url + text + "&id=" + voice_id + "&length=" + length + "&lang=" + lang;
  const audio = new Audio(URL.createObjectURL(await (await fetch(api)).blob()));
  audio.autoplay = true;
}; */
//#endregion

//#region speech Config
const speechConfig = sdk.SpeechConfig.fromSubscription(
  "ff4c272469de4256a6f759f71abc3be6",
  "eastasia"
);
speechConfig.speechSynthesisLanguage = "zh-HK"; // set the language to Cantonese
speechConfig.speechSynthesisVoiceName = "zh-HK-HiuMaanNeural"; // set the Cantonese voice
speechConfig.speechSynthesisOutputFormat =
  sdk.SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3;
speechConfig.speechRecognitionLanguage = "zh-HK"; // set the language to Cantonese
//#endregion

//#region TTS
const createVoiceXML = (
  language: string,
  voice_name: string,
  content: string,
  rate: number,
  volume: number,
  pitch: number
) => {
  const xmlString = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}"> \r\n \
  <voice name="${voice_name}"> \r\n \
  <prosody rate="${rate > 0 ? "+" : ""}${rate}%" volume="${
    volume >= 0 ? "+" : ""
  }${volume}%" pitch="${pitch > 0 ? "+" : ""}${pitch}%"> \r\n \
  ${content} \r\n \
  </prosody> \r\n \
  </voice> \r\n \
  </speak>`;
  return xmlString;
};

//#endregion

export const useSpeechAI = (handleSTTEnd: () => void) => {
  const [recognizedSpeech, setRecognizedSpeech] = useState("");
  const TTSCalling = async (text: string | undefined) => {
    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
    const ssml = createVoiceXML(
      speechConfig.speechSynthesisLanguage,
      speechConfig.speechSynthesisVoiceName,
      setVoiceText(text),
      20.0,
      0.0,
      10.0
    );
    speechSynthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.errorDetails) {
          console.error(result.errorDetails);
        } else {
          console.log(JSON.stringify(result));
        }

        speechSynthesizer.close();
      },
      (error) => {
        console.log(error);
        speechSynthesizer.close();
      }
    );
  };

  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig);
  const STTStart = async () => {
    speechRecognizer = new sdk.SpeechRecognizer(speechConfig);
    speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        setRecognizedSpeech(e.result.text);
      } else if (e.result.reason == sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);
      if (e.reason == sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }
      STTEnd();
    };
    speechRecognizer.sessionStopped = (s, e) => {
      console.log("\n    Session stopped event.");
      STTEnd();
    };
    await speechRecognizer.startContinuousRecognitionAsync();
  };
  const STTEnd = async () => {
    handleSTTEnd();
    await speechRecognizer.stopContinuousRecognitionAsync();
  };
  return {
    TTSCalling,
    STTStart,
    STTEnd,
    recognizedSpeech,
  };
};
