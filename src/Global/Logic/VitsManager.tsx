import { useEffect } from "react";
import { useSubscribe, useUnsubscribe } from "../../hook/EventHooks";
import { events } from "../Data/Enum";

let voice_text = "";

const url = "http://127.0.0.1:23456/voice/vits?text=";
const voice_id = 9;
const lang = "gd";
const length = 1.5;

export const useVits = () => {
  const setVoiceText = (text: string) => {
    voice_text = text;
  };
  return { setVoiceText };
};

function VitsManager() {
  const vitsCalling = async () => {
    console.log("Vits CALLING...");
    const text = voice_text;
    const api =
      url + text + "&id=" + voice_id + "&length=" + length + "&lang=" + lang;
    const audio = new Audio(
      URL.createObjectURL(await (await fetch(api)).blob())
    );
    audio.autoplay = true;
  };
  useEffect(() => {
    const index = useSubscribe(vitsCalling, events.OnVitsStart);
    return () => {
      useUnsubscribe(index, events.OnVitsStart);
    };
  }, []);
  return <></>;
}
export default VitsManager;
