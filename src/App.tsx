//#region Dependency
import InputField from "./components/ChatBox/InputField";
import MessagesArea from "./components/ChatBox/MessagesArea";
import Live2DField from "./components/Live2DField";
import Elma_bg from "./assets/images/bg.png";
import Upperfield from "./components/ChatBox/Upperfield";
import { useState } from "react";
import useMessage from "./hook/useMessage";
import { messageProps, promptProps } from "./global/data/Interface";
import usePrompt from "./hook/usePrompt";
import { useOpenAI } from "./global/logic/OpenAIManager";
import { useSpeechAI } from "./global/logic/SpeechAIManager";
import { useInputMessageStore, useMutedStore } from "./store/store";
import { Role } from "./global/data/Enum";
import title from "./assets/images/title.png";
import MuteSwitch from "./components/MuteSwitch";
import { useRef } from "react";
import LanguageSwitch from "./components/LanguageSwitch";

//#endregion

function App() {
  //Live2D Model
  const [audioData, setAudioData] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [emotion, setEmotion] = useState("normal");

  //Boolean Flags
  const stopInput = useRef(false);
  const [speaking, setSpeaking] = useState(false);
  const { muted } = useMutedStore();

  //AI Hooks
  const { openAICalling } = useOpenAI();
  const { TTSCalling, STTStart, STTEnd, recognizedSpeech } = useSpeechAI(() => {
    setSpeaking(false);
  });

  //Messages & Prompts Management
  const { message } = useInputMessageStore();
  const { pushMessage, messageAdjusting } = useMessage();
  const { prompts, pushPrompt, promptAdjusting } = usePrompt();

  const handleUserSubmit = async (text?:string) => {

    //default no variable text input, 
    //variable text have higher priority to send message

    stopInput.current = true;
    console.log(stopInput.current);
    //Save User Input
    // const input: messageProps = {
    //   time: Date.now(),
    //   role: Role.User,
    //   content: message,
    //   liked: false,
    // };

    const input: messageProps = (text?{
      time: Date.now(),
      role: Role.User,
      content: text,
      liked: false,
    }:{
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    })

    pushMessage([input]);
    pushPrompt([input]);

    //Get OpenAI response
    const output = await openAICalling([
      ...prompts,
      { role: input.role, content: text ?? input.content } as promptProps,
    ]);

    //Get audioData from TTS
    if (!muted) {
      const _audioData = await TTSCalling(output.content);
      if (_audioData.byteLength > 0) setAudioData(_audioData);
    }

    //#region Save AI's Output
    pushMessage([input, messageAdjusting(output)]);
    const prompt_arg = promptAdjusting(output);
    prompt_arg && pushPrompt([input, prompt_arg]);
    //#endregion

    //Obtain Emotion
    const parts = output.content
      ? output.content.split(/<<e:(.*?)>>/)
      : "normal";
    setEmotion(parts[1]);

    stopInput.current = false;
  };

  const handleSTTStart = () => {
    setSpeaking(true);
    STTStart();
  };
  const handleSTTEnd = () => {
    STTEnd();
  };
  return (
    <>
      {/* Background  */}
      <div className="absolute h-screen -z-50 overflow-hidden bg-blue-300">
        <img
          src={Elma_bg}
          alt="elma_model"
          className="h-screen w-screen overflow-hidden"
        />
      </div>
      {/* Content*/}
      <div className="flex h-screen overflow-hidden">
        {/*Live2D Model Container*/}
        <div
          id="elmaContainer"
          className="flex flex-col sm:w-[45%] sm:visible invisible items-start"
        >
          <div className="scale-75 absolute ">
            <img src={title} alt="title" className="scale-75 -z-30"></img>
            <div className="flex flex-row">
            <div className="flex flex-col w-full items-center">
              <MuteSwitch />
              <LanguageSwitch handleUserSubmit={handleUserSubmit} />
            </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-full items-start">
            <Live2DField emotion={emotion} audioData={audioData} />
          </div>
        </div>
        {/*Chat Box*/}
        <div className="flex flex-col w-full sm:w-[55%] p-1 items-center justify-center z-10">
          <Upperfield />
          <MessagesArea loading={stopInput.current} speaking={speaking} />
          <InputField
            handleUserSubmit={handleUserSubmit}
            stopInput={stopInput.current}
            handleSTTStart={handleSTTStart}
            handleSTTEnd={handleSTTEnd}
            speaking={speaking}
            recognizedSpeech={recognizedSpeech}
          />
        </div>
      </div>
    </>
  );
}

export default App;
