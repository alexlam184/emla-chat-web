import { useState, useEffect } from "react";
import { events, Role } from "../../Global/Data/Enum";
import { messageProps } from "../../Global/Data/Interface";
import {
  useSubscribe,
  useTrigger,
  useUnsubscribe,
} from "../../hook/EventHooks";
import { AiOutlineSend } from "react-icons/ai";

/* Input field of user's messages */
function InputField() {
  const [sending, setSending] = useState<boolean>(false);
  useEffect(() => {
    const index = useSubscribe(async () => {
      console.log("Activate Sending.");
      setSending(false);
    }, events.OnAPIsEnd);
    return () => {
      useUnsubscribe(index, events.OnAPIsEnd);
    };
  }, []);

  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (sending || message === "") return;
    setSending(true);
    const msg: messageProps = {
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    };
    console.log("User Submit Emit.");
    useTrigger(events.OnUserSubmitStart, msg);
    setMessage("");
  };
  return (
    <div className="flex flex-row w-full h-auto justify-around items-center p-1 space-x-3">
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
        />
      </form>
      {/* SendButton */}
      <button
        onClick={handleSend}
        className="p-3 rounded-full bg-slate-200 hover:bg-slate-300 active:bg-slate-100 active:scale-95"
      >
        <AiOutlineSend className="scale-150" />
      </button>
    </div>
  );
}

export default InputField;
