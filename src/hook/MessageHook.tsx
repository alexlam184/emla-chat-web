import ImageFactory from "../Global/Logic/ImageFactory";
import { messageProps } from "../Global/Data/Interface";
import { events } from "../Global/Data/Enum";
import { useSubscribe } from "./EventHooks";

let messages: Array<messageProps> = [];

let messageSub = false;

export const useMessage = () => {
  const setMessages = (_messages: Array<messageProps>) => {
    messages = _messages;
  };

  const pushMessage = async (msg?: messageProps) => {
    msg && setMessages([...messages, msg]);
    console.log("Push messages. ");
    console.log(messages);
  };

  !messageSub
    ? (useSubscribe(pushMessage, events.OnUserSubmitStart), (messageSub = true))
    : "";

  /* Turn the raw assistant content into readable message */
  const prompt2message = (prompt: string) => {
    const imgLiteral = /<<i:(.*?)>>/;
    const parts: string[] = prompt.split(imgLiteral);
    const lineBreaking = (text: string) => {
      return text?.replace(/\n/g, "<br />") || text;
    };
    return (
      /* Replace Image Tag <<i:key>> into Image Component */
      <>
        <span
          dangerouslySetInnerHTML={{ __html: lineBreaking(parts[0] as string) }}
        />
        <ImageFactory imgContent={parts[1]} />
        <span
          dangerouslySetInnerHTML={{ __html: lineBreaking(parts[2] as string) }}
        />
      </>
    );
  };

  const setMessage = (time: number, _msg: messageProps) => {
    messages.map((msg) => {
      if (msg.time === time) {
        msg = _msg;
        return;
      }
    });
  };

  const messageAdjusting = (msg: messageProps) => {
    msg.content = msg.content.replace(/的/g, "嘅");
    pushMessage(msg);
  };

  return {
    messages,
    setMessages,
    prompt2message,
    setMessage,
    messageAdjusting,
  };
};
