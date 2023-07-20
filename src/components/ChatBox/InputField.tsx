import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { events, Role } from "../../Global/Data/Enum";
import { messageProps } from "../../Global/Data/Interface";
import {
  useSubscribe,
  useTrigger,
  useUnsubscribe,
} from "../../hook/EventHooks";

/* Input field of user's messages */
function InputField() {
  const [sending, setSending] = useState<boolean>(false);
  useEffect(() => {
    const index = useSubscribe(() => {
      console.log("Activate Sending.");
      setSending(false);
    }, events.OnAPIsEnd);
    return () => {
      useUnsubscribe(index, events.OnAPIsEnd);
    };
  }, []);

  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (sending) return;
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
      <div className="h-full rounded-full bg-slate-200">
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default InputField;
