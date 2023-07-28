//#region Dependency
import { useEffect, useRef } from "react";
import Message from "./Message";
import LoadingMessage from "./LoadingMessage";
import useMessage from "../../hook/useMessage";
//#endregion

interface MessagesAreaProps {
  loading: boolean;
  speaking: boolean;
}

function MessagesArea(props: MessagesAreaProps) {
  const { messages } = useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesEndRef}
      className="w-full h-full px-3 py-5 m-5 overflow-y-auto overflow-x-hidden scroll-smooth border-4 rounded-md border-indigo-500"
    >
      {messages.map((msg) => (
        <Message key={msg.time} {...msg} />
      ))}
      {props.loading ? (
        <LoadingMessage loadingMsg="Elma is thinking。。。" />
      ) : (
        ""
      )}
      {props.speaking ? (
        <LoadingMessage loadingMsg="Sound Recording。。。" />
      ) : (
        ""
      )}
    </div>
  );
}

export default MessagesArea;
