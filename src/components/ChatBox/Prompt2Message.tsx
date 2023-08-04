import { useState } from "react";
import { AiFillCopy, AiOutlineCopy } from "react-icons/ai";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ImageFactory from "../../global/logic/ImageFactory";

interface Prompt2MessageProps {
  prompt: string;
}

export default function Prompt2Message(props: Prompt2MessageProps) {
  const adjusting = (text: string) => {
    text = text.replace(/<<(.*?)>>/g, "");
    text = text.replace(/undefined/g, "");
    const segments = text
      .split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g)
      .filter(Boolean);
    return segments;
  };
  const segments = adjusting(props.prompt);
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
      <ImageFactory msg={props.prompt} />
    </>
  );
}
