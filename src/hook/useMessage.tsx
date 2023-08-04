//#region Dependency
import { messageProps } from "../global/data/Interface";
import { useMessagesStore } from "../store/store";
import getCommonFunc from "../global/logic/getCommonFunc";
//#endregion

export default function useMessage() {
  const { messages, setMessages } = useMessagesStore();
  const { outputAdjust } = getCommonFunc();
  const pushMessage = (msgs: Array<messageProps>) => {
    const _msgs: Array<messageProps> = msgs.map((msg) => {
      return {
        time: msg.time,
        role: msg.role,
        content: msg.content,
        liked: msg.liked,
      };
    });
    setMessages([...messages, ..._msgs]);
    console.log("Push messages. ");
    console.log(messages);
  };

  const setMessage = (time: number, _msg: messageProps) => {
    setMessages(
      messages.map((msg) => {
        return msg.time === time ? _msg : msg;
      })
    );
  };

  const messageAdjusting = (msg: messageProps) => {
    msg = outputAdjust(msg);
    return msg;
  };

  return {
    messages,
    setMessages,
    setMessage,
    messageAdjusting,
    pushMessage,
  };
}
