import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { useMessage } from "../../hook/MessageHook";
import LoadingMessage from "./LoadingMessage";
import { useSubscribe, useUnsubscribe } from "../../hook/EventHooks";
import { events } from "../../Global/Data/Enum";

function MessagesArea() {
  const { messages } = useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index_show = useSubscribe(() => {
      console.log("Show loading message.");
      setLoading(true);
    }, events.OnUserSubmitStart);
    const index_remove = useSubscribe(() => {
      console.log("Remove loading message.");
      setLoading(false);
    }, events.OnAPIsEnd);
    return () => {
      useUnsubscribe(index_show, events.OnUserSubmitStart);
      useUnsubscribe(index_remove, events.OnAPIsEnd);
    };
  }, []);

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
      {loading ? <LoadingMessage /> : ""}
    </div>
  );
}

export default MessagesArea;
