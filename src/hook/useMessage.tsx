//#region Dependency
import ImageFactory from "../global/logic/ImageFactory";
import { messageProps } from "../global/data/Interface";
import { useMessagesStore } from "../store/store";
//#endregion

export default function useMessage() {
  const { messages, setMessages } = useMessagesStore();
  const pushMessage = (msg: messageProps) => {
    console.log("New msg to be updated:");
    console.log([...messages, msg]);
    setMessages([...messages, msg]);
    console.log("Push messages. ");
    console.log(messages);
  };

  /* Turn the raw assistant content into readable message */
  const prompt2message = (prompt: string) => {
    const parts = prompt.split(/<<(.*?)>>/);
    prompt = parts[0] + parts[2];
    const lineBreaking = (text: string) => {
      return text?.replace(/\n/g, "<br />") || text;
    };
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: lineBreaking(prompt) }} />
        <ImageFactory msg={prompt} />
      </>
    );
  };

  const setMessage = (time: number, _msg: messageProps) => {
    setMessages(
      messages.map((msg) => {
        return msg.time === time ? _msg : msg;
      })
    );
  };

  const messageAdjusting = async (msg: messageProps) => {
    msg.content = msg.content && msg.content.replace(/的/g, "嘅");
    await pushMessage(msg);
  };

  return {
    messages,
    setMessages,
    prompt2message,
    setMessage,
    messageAdjusting,
    pushMessage,
  };
}
