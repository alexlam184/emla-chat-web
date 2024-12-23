//#region Dependency
import { useEffect, useRef } from "react";
import { Model, Role } from "../../global/data/Enum";
import icon_mute from "../../assets/images/icon_mute.png";
import icon_unmute from "../../assets/images/icon_unmute.png";
import icon_clean from "../../assets/images/icon_clean.png";
import icon_send from "../../assets/images/icon_send.png";
import {
  useInputMessageStore,
  useGeneralInfoModalStore,
  useMessagesStore,
  usePromptsStore,
} from "../../store/store";
import { few_shot_prompts } from "../../global/data/Prompts";
import { useTranslation } from "react-i18next";
//#endregion

interface InputFieldProps {
  model?: Model;
  handleUserSubmit: (text?: string, model?: Model) => Promise<void>;
  stopInput: boolean;
  handleSTTStart: () => void;
  handleSTTEnd: () => void;
  speaking: boolean;
  recognizedSpeech?: string;
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
  const { i18n } = useTranslation();

  useEffect(() => {
    if (props.speaking) {
      setMessage(message + props.recognizedSpeech);
    }
  });

  const handleSend = () => {
    props.handleUserSubmit(undefined, props.model);
    setMessage("");
  };

  const { setGeneralInfoModal } = useGeneralInfoModalStore();
  const { setMessages } = useMessagesStore();
  const { setPrompts } = usePromptsStore();
  const handleClear = () => {
    console.log("Locale=", i18n.resolvedLanguage);

    setMessages([]);

    let system_Content = "No system content";
    if (import.meta.env.VITE_SYSTEM_CONTENT) {
      system_Content = import.meta.env.VITE_SYSTEM_CONTENT;
    } else {
      setGeneralInfoModal({
        isModalOpen: true,
        type: "ERROR",
        title: "import env variable fail",
        content: "SYSTEM_CONTENT not found.Please info admin",
      });
    }

    setPrompts([
      {
        role: Role.System,
        content: system_Content,
        // content: i18n.resolvedLanguage === "en" ? import.meta.env.VITE_SYSTEM_CONTENT_ENG :import.meta.env.VITE_SYSTEM_CONTENT,
      },
      ...few_shot_prompts,
    ]);
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-row w-full h-full justify-around items-center space-x-3">
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
          placeholder={t("Message elma")}
          className="w-full p-3 rounded-3xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={props.speaking}
        />
      </form>
      {/* STTButton */}
      {/* {props.speaking ? (
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
      )} */}
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
