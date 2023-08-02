//#region Dependency
import InputField from "./components/ChatBox/InputField";
import MessagesArea from "./components/ChatBox/MessagesArea";
import Live2DField from "./components/Live2DModel";
import Elma_bg from "./assets/images/bg.png";
import Upperfield from "./components/ChatBox/Upperfield";
import { useState } from "react";
import useMessage from "./hook/useMessage";
import { messageProps, promptProps } from "./global/data/Interface";
import usePrompt from "./hook/usePrompt";
import { useOpenAI } from "./global/logic/OpenAIManager";
import { useSpeechAI } from "./global/logic/SpeechAIManager";
import { useMessageStore, useMutedStore } from "./store/store";
import { Role } from "./global/data/Enum";
import title from "./assets/images/title.png";
//#endregion

function App() {
  //Live2D Model
  const [audioData, setAudioData] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [emotion, setEmotion] = useState("normal");

  //Boolean Flags
  const [stopInput, setStopInput] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { muted } = useMutedStore();

  //AI Hooks
  const { openAICalling } = useOpenAI();
  const { TTSCalling, STTStart, STTEnd, recognizedSpeech } = useSpeechAI(() => {
    setSpeaking(false);
  });

  //Messages & Prompts Management
  const { message } = useMessageStore();
  const { pushMessage, messageAdjusting } = useMessage();
  const { prompts, pushPrompt, promptAdjusting } = usePrompt();

  const handleUserSubmit = async () => {
    setStopInput(true);

    //#region Save User's Input
    const input: messageProps = {
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    };
    pushMessage([input]);
    pushPrompt([input]);
    //#endregion

    //Get OpenAI response
    const output = await openAICalling([
      ...prompts,
      { role: input.role, content: input.content } as promptProps,
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
        <div className=" h-screen w-full absolute" />
        {/* Content*/}
        <div className="flex h-screen overflow-hidden">
          {/*Live2D Model Container*/}
          <div className="absolute h-screen -z-50 overflow-hidden bg-blue-300">
            <img
              src={Elma_bg}
              alt="elma_model"
              className="h-screen w-screen overflow-hidden"
            />
          </div>
          <div className="w-0 sm:w-[45%] sm:visible invisible">
            <img
              src={title}
              alt="title"
              className="absolute scale-75 transform translate-x-[-40px] translate-y-[30px] -z-30"
            ></img>
            <Live2DField emotion={emotion} audioData={audioData} />
          </div>
          {/*Chat Box*/}
          <div className="flex flex-col w-full sm:w-[55%] p-1 items-center justify-center z-10">
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
