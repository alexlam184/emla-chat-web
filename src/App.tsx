import OpenAIManager from "./Global/Logic/OpenAIManager";
import InputField from "./components/ChatBox/InputField";
import MessagesArea from "./components/ChatBox/MessagesArea";
import Live2DModel from "./components/Live2DModel";
import { usePrompt } from "./hook/PromptHook";
import Elma_bg from "./assets/images/bg.png";
import VitsManager from "./Global/Logic/VitsManager";

function App() {
  usePrompt();
  return (
    <>
      {/* Initialize the Managers  */}
      <OpenAIManager />
      <VitsManager />

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
            <Live2DModel />
          </div>
          {/*Chat Box*/}
          <div className="flex flex-col w-full sm:w-1/2 p-8 items-center justify-center">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Elma 聊天室
            </span>
            <MessagesArea />
            <InputField />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
