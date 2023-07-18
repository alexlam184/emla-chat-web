import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { MessageProps } from "../../Global/Data/Interface";
import {
  OnAPIsEnd,
  OnUserSubmitEnd,
  OnUserSubmitStart,
} from "../../Global/Events/EventHandler";
import { MessageManager } from "../../Global/Logic/MessageManager";
import LoadingMessage from "./LoadingMessage";

function MessagesArea() {
  const msgManager = MessageManager.getInstance();
  const [messages, setMessages] = useState<Array<MessageProps>>(
    msgManager.getMessage()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  OnUserSubmitStart.getInstance().subscribe(() => {
    console.log("Show loading message.");
    setLoading(true);
  });
  OnUserSubmitEnd.getInstance().subscribe(() => {
    console.log("Update messages.");
    setMessages([...msgManager.getMessage()]);
  });
  OnAPIsEnd.getInstance().subscribe(() => {
    console.log("Update messages.");
    setMessages([...msgManager.getMessage()]);
    console.log("Remove loading message.");
    setLoading(false);
  });

  useEffect(() => {
    setMessages([...msgManager.getMessage()]);
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
        <Message
          key={msg.time}
          time={msg.time}
          role={msg.role}
          content={msg.content}
          liked={msg.liked}
        />
      ))}
      {loading ? <LoadingMessage /> : ""}
    </div>
  );
}

export default MessagesArea;
