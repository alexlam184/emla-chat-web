//#region Dependency
import { useEffect } from "react";
import { Role } from "../../global/data/Enum";
import icon_mute from "../../assets/images/icon_mute.png";
import icon_unmute from "../../assets/images/icon_unmute.png";
import icon_clean from "../../assets/images/icon_clean.png";
import icon_send from "../../assets/images/icon_send.png";
import {
  useInputMessageStore,
  useMessagesStore,
  usePromptsStore,
} from "../../store/store";
import { few_shot_prompts } from "../../global/data/Prompts";
import { useTranslation } from 'react-i18next';
//#endregion

interface InputFieldProps {
  handleUserSubmit: (text?: string) => Promise<void>;
  stopInput: boolean;
  handleSTTStart: () => void;
  handleSTTEnd: () => void;
  speaking: boolean;
  recognizedSpeech: string;
}

interface IconButtonProps {
  onClick: () => void;
  disabled: boolean;
  src: string;
  alt: string;
}

function IconButton(props: IconButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="w-auto h-auto scale-[65%] hover:scale-[75%] active:scale-[55%]"
    >
      {/* <AiOutlineClear className="scale-150" /> */}
      <img src={props.src} alt={props.alt} className="" />
    </button>
  );
}

/* Input field of user's messages */
function InputField(props: InputFieldProps) {
  const { message, setMessage } = useInputMessageStore();
  const {  i18n } = useTranslation();

  useEffect(() => {
    if (props.speaking) {
      setMessage(message + props.recognizedSpeech);
    }
  });

  const handleSend = () => {
    props.handleUserSubmit();
    setMessage("");
  };

  const { setMessages } = useMessagesStore();
  const { setPrompts } = usePromptsStore();
  const handleClear = () => {

    console.log("alex locale=",i18n.resolvedLanguage);

    
    setMessages([]);
    setPrompts([
      {
        role: Role.System,
        content: import.meta.env.VITE_SYSTEM_CONTENT,
        // content: i18n.resolvedLanguage === "en" ? import.meta.env.VITE_SYSTEM_CONTENT_ENG :import.meta.env.VITE_SYSTEM_CONTENT,
      },
      ...few_shot_prompts,
    ]);
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-row w-full h-auto justify-around items-center space-x-3">
      {/* CleanButton */}
      <IconButton
        onClick={handleClear}
        disabled={props.stopInput}
        src={icon_clean}
        alt="icon_clean"
      />
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
          placeholder={t('Message Elma')}
          className="w-full p-2 rounded-3xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={props.speaking}
        />
      </form>
      {/* STTButton */}
      {props.speaking ? (
        <IconButton
          onClick={props.handleSTTEnd}
          disabled={props.stopInput}
          src={icon_unmute}
          alt="icon_unmute"
        />
      ) : (
        <IconButton
          onClick={props.handleSTTStart}
          disabled={props.stopInput}
          src={icon_mute}
          alt="icon_mute"
        />
      )}
      {/* SendButton */}
      <IconButton
        onClick={handleSend}
        disabled={props.stopInput || props.speaking || message === ""}
        src={icon_send}
        alt="icon_send"
      />
    </div>
  );
}

export default InputField;
