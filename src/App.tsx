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
import {
  useImageOutputMessageStore,
  useInputMessageStore,
  useMutedStore,
} from "./store/store";
import { Model, Role } from "./global/data/Enum";
import title from "./assets/images/title.png";
import MuteSwitch from "./components/MuteSwitch";
import { useRef } from "react";
import LanguageSwitch from "./components/LanguageSwitch";
import TabsSwitch from "./components/common/TabsSwitch";
import Tab from "./components/common/Tab";
import SuggestPrompts from "./components/ImageGenerator/SuggestPrompts";
import { suggestPrompts } from "./global/data/constant";
import OpenAI from "openai";
import { Base64 } from "js-base64";
import LoadingMessage from "./components/ChatBox/LoadingMessage";
import SpecialPrompts from "./components/ImageGenerator/SpecialPrompts";

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
  const { imageMessage, setImageMessage } = useImageOutputMessageStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [targetImagePrompt, setTargetImagePrompt] = useState<string>("");

  const openai = new OpenAI({
    apiKey: Base64.decode(import.meta.env.VITE_OPENAI_API_KEY),
    dangerouslyAllowBrowser: true,
  });

  const handleUserSubmit = async (text?: string, model?: Model) => {
    //default no variable text input,
    //variable text have higher priority to send message

    stopInput.current = true;
    setLoading(true);
    console.log(stopInput.current);
    try {
      if (model && model === Model.dalle_3) {
        console.log("call DALL-E...");
        const targetPrompt = text ? text : message;
        console.log("Target Prompt=", targetPrompt);
        setTargetImagePrompt(targetPrompt);

        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: targetPrompt,
          n: 1,
          size: "1024x1024",
        });
        const image_url = response.data[0].url ?? "no response";
        console.log("alex url=", image_url);
        setImageMessage(image_url);
      } else {
        console.log("call chatGPT...");
        const input: messageProps = text
          ? {
              time: Date.now(),
              role: Role.User,
              content: text,
              liked: false,
            }
          : {
              time: Date.now(),
              role: Role.User,
              content: message,
              liked: false,
            };

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
      }
    } catch (e) {
      console.error("[ERROR] Openai api call failed \n", e);
    }
    stopInput.current = false;
    setLoading(false);
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
          className="flex flex-col sm:w-[40%] sm:visible invisible items-start"
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

        <div className="flex flex-col w-full sm:w-[60%] p-1 items-center justify-center z-10">
          <TabsSwitch>
            {/*Chat Box*/}
            <Tab name="chatbot">
              <div className="w-full h-full grid grid-cols-1  grid-rows-6 gap-4">
                <Upperfield />
                <div className="row-span-5">
                  <MessagesArea
                    loading={stopInput.current}
                    speaking={speaking}
                  />
                </div>
                <div className="row-start-8">
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
            </Tab>
            {/*Image Generate Box*/}
            <Tab name="imageGenerator">
              <div className="w-full h-full grid grid-cols-1  grid-rows-6 gap-4">
                <Upperfield />
                <div className="row-start-2">
                  <InputField
                    model={Model.dalle_3}
                    handleUserSubmit={handleUserSubmit}
                    stopInput={stopInput.current}
                    handleSTTStart={handleSTTStart}
                    handleSTTEnd={handleSTTEnd}
                    speaking={speaking}
                    recognizedSpeech={recognizedSpeech}
                  />
                </div>

                <div className="row-span-4 grid grid-cols-2  rounded-lg mx-4 mb-4">
                  <div className="relative w-full h-full">
                    {loading && (
                      <div className="absolute w-full h-full bg-whiteTransparent flex justify-center items-center">
                        <LoadingMessage loadingMsg="Elma is thinking。。。" />
                      </div>
                    )}
                    <div className="text-white">
                      <div>
                        <span>Prompt:</span>
                      </div>
                      <textarea
                        className="text-black w-full"
                        value={targetImagePrompt}
                      ></textarea>
                    </div>
                    <img
                      className="aspect-square bg-gray-700"
                      src={imageMessage}
                    ></img>
                  </div>
                  <div className="border-indigo-600 border-4 overflow-y-auto">
                    <SpecialPrompts />
                    <SuggestPrompts suggestPrompts={suggestPrompts} />
                  </div>
                </div>
              </div>
            </Tab>
          </TabsSwitch>
        </div>
      </div>
    </>
  );
}

export default App;
