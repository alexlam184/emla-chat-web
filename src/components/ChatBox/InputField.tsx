//#region Dependency
import { useEffect } from "react";
import { Role } from "../../global/data/Enum";
import { eventArg } from "../../global/data/Interface";
import { AiOutlineClear, AiOutlineSend } from "react-icons/ai";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import {
  useMessageStore,
  useMessagesStore,
  usePromptsStore,
} from "../../store/store";
import { systemContent, few_shot_prompts } from "../../global/data/Prompts";
//#endregion

interface InputFieldProps {
  handleUserSubmit: (arg: eventArg) => void;
  stopInput: boolean;
  handleSTTStart: () => void;
  handleSTTEnd: () => void;
  speaking: boolean;
  recognizedSpeech: string;
}

/* Input field of user's messages */
function InputField(props: InputFieldProps) {
  const { message, setMessage } = useMessageStore();

  useEffect(() => {
    if (props.speaking) {
      setMessage(message + props.recognizedSpeech);
    }
  }, [props.recognizedSpeech]);

  const handleSend = () => {
    const arg: eventArg = {
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    };
    props.handleUserSubmit(arg);
    setMessage("");
  };

  const { setMessages } = useMessagesStore();
  const { setPrompts } = usePromptsStore();
  const handleClear = () => {
    setMessages([]);
    setPrompts([
      {
        role: Role.System,
        content: systemContent,
      },
      ...few_shot_prompts,
    ]);
  };

  return (
    <div className="flex flex-row w-full h-auto justify-around items-center p-1 space-x-3">
      {/* CleanButton */}
      <button
        onClick={handleClear}
        disabled={props.stopInput}
        className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 hover:scale-110 active:bg-slate-100 active:scale-95"
      >
        <AiOutlineClear className="scale-150" />
      </button>
      {/* Input Area */}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="輸入對話。。。"
          className="w-full p-2 rounded-3xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={props.stopInput || props.speaking}
        />
      </form>
      {/* STTButton */}
      <button
        onClick={!props.speaking ? props.handleSTTStart : props.handleSTTEnd}
        disabled={props.stopInput}
        className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 hover:scale-110 active:bg-slate-100 active:scale-95"
      >
        {props.speaking ? (
          <BiMicrophone className="scale-150" />
        ) : (
          <BiMicrophoneOff className="scale-150" />
        )}
      </button>
      {/* SendButton */}
      <button
        onClick={handleSend}
        disabled={props.stopInput || props.speaking || message === ""}
        className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 hover:scale-110 active:bg-slate-100 active:scale-95"
      >
        <AiOutlineSend className="scale-150" />
      </button>
    </div>
  );
}

export default InputField;
