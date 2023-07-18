import { useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { OnAPIsEnd, OnUserSubmitStart } from "../../Global/Events/EventHandler";
import { Role } from "../../Global/Data/Enum";
import { MessageProps } from "../../Global/Data/Interface";

/* Input field of user's messages */
function InputField() {
  const [sending, setSending] = useState<boolean>(false);
  OnAPIsEnd.getInstance().subscribe(() => {
    console.log("Activate Sending.");
    setSending(false);
  });
  const [message, setMessage] = useState("");
  const submitEvent = OnUserSubmitStart.getInstance();
  const handleSend = () => {
    if (sending) return;
    setSending(true);
    const msg: MessageProps = {
      time: Date.now(),
      role: Role.User,
      content: message,
      liked: false,
    };
    console.log("User Submit Emit.");
    submitEvent.trigger(msg);
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
          name="User Content"
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
