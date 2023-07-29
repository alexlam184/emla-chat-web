//#region Dependency
import InputField from "./components/ChatBox/InputField";
import MessagesArea from "./components/ChatBox/MessagesArea";
import Live2DModel from "./components/Live2DModel";
import Elma_bg from "./assets/images/bg.png";
import Upperfield from "./components/ChatBox/Upperfield";
import { useState } from "react";
import useMessage from "./hook/useMessage";
import { eventArg } from "./global/data/Interface";
import usePrompt from "./hook/usePrompt";
import { useOpenAI } from "./global/logic/OpenAIManager";
import { useSpeechAI } from "./global/logic/SpeechAIManager";
import { useMessageStore, useMutedStore } from "./store/store";
import { Role } from "./global/data/Enum";
//#endregion

function App() {
  const [stopInput, setStopInput] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [emotion, setEmotion] = useState("normal");
  const { pushMessage, messageAdjusting } = useMessage();
  const { prompts, pushPrompt, promptAdjusting } = usePrompt();
  const { openAICalling } = useOpenAI();
  const { TTSCalling, STTStart, STTEnd, recognizedSpeech } = useSpeechAI(() => {
    setSpeaking(false);
  });
  const { muted } = useMutedStore();
  const { message } = useMessageStore();

  const handleUserSubmit = async () => {
    const arg: eventArg = {
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    };
    setStopInput(true);
    pushMessage([arg]);
    pushPrompt([arg]);
    const _arg = await openAICalling(prompts);
    const msg_arg = messageAdjusting(_arg);
    const prompt_arg = promptAdjusting(_arg);
    pushMessage([arg, msg_arg]);
    prompt_arg && pushPrompt([arg, prompt_arg]);
    !muted ? await TTSCalling(_arg.content) : "";
    const parts = _arg.content ? _arg.content.split(/<<e:(.*?)>>/) : "normal";
    setEmotion(parts[1]);
    setStopInput(false);
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
      <div className="h-5/6 ">
        <div className=" bg-gradient-to-b md:bg-gradient-to-br from-blue-300 to-blue-50 to-60% h-screen w-full absolute -z-10" />
        {/* Content*/}
        <div className="flex h-screen overflow-hidden">
          {/*Live2D Model Container*/}
          <div className="absolute h-screen z-[-1] overflow-hidden bg-blue-300">
            <img
              src={Elma_bg}
              alt="elma_model"
              className="h-screen w-screen transform -scale-x-100 overflow-hidden"
            />
          </div>
          <div className="w-0 sm:w-1/2 sm:visible invisible">
            <Live2DModel emotion={emotion} />
          </div>
          {/*Chat Box*/}
          <div className="flex flex-col w-full sm:w-1/2 p-8 items-center justify-center">
            <Upperfield />
            <MessagesArea loading={stopInput} speaking={speaking} />
            <InputField
              handleUserSubmit={handleUserSubmit}
              stopInput={stopInput}
              handleSTTStart={handleSTTStart}
              handleSTTEnd={handleSTTEnd}
              speaking={speaking}
              recognizedSpeech={recognizedSpeech}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
