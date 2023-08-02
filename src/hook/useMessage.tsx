//#region Dependency
import ImageFactory from "../global/logic/ImageFactory";
import { messageProps } from "../global/data/Interface";
import { useMessagesStore } from "../store/store";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { AiFillCopy, AiOutlineCopy } from "react-icons/ai";
import useCommon from "./useCommon";
//#endregion

export default function useMessage() {
  const { messages, setMessages } = useMessagesStore();
  const { outputAdjust } = useCommon();
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

  /* Turn the raw assistant content into readable message */
  const prompt2message = (prompt: string) => {
    const adjusting = (text: string) => {
      text = text.replace(/<<(.*?)>>/g, "");
      text = text.replace(/undefined/g, "");
      const segments = text
        .split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g)
        .filter(Boolean);
      return segments;
    };
    const segments = adjusting(prompt);
    const [copied, setCopied] = useState(false);
    return (
      <>
        {segments.map((segment, index) => {
          if (segment.startsWith("```")) {
            const code = segment.slice(3, -3);
            const language = segment.slice(3, segment.indexOf("\n"));
            const slice = language !== "" ? code.split(language) : ["", code];
            const handleClick = () => {
              navigator.clipboard.writeText(slice[1]);
              setCopied(true);
            };
            return (
              <div className="w-full h-auto" key={index}>
                <div className="w-full h-auto flex flex-col bg-[#2b2b2b] rounded-lg ">
                  <div className="flex flex-row text-white text-lg items-center justify-between">
                    <span className=" pt-2 pl-4 text-sm">{language}</span>
                    <button
                      className="p-2 m-2 bg-slate-500 rounded-md hover:bg-slate-400 flex flex-row items-center justify-center"
                      onClick={handleClick}
                    >
                      {copied ? <AiFillCopy /> : <AiOutlineCopy />}
                      <span className="text-sm">
                        {copied ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <SyntaxHighlighter
                    key={index}
                    lineProps={{
                      style: {
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      },
                    }}
                    language={language}
                    style={darcula}
                    showLineNumbers={true}
                    wrapLines={true}
                  >
                    {slice[1]}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          } else {
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html: adjusting(segment.replace(/\n/g, "<br />")),
                }}
              />
            );
          }
        })}
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

  const messageAdjusting = (msg: messageProps) => {
    msg = outputAdjust(msg);
    return msg;
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
