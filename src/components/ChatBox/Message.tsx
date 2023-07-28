//#region Dependency
import { Role } from "../../global/data/Enum";
import { messageProps } from "../../global/data/Interface";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import useMessage from "../../hook/useMessage";
//#endregion

/* Behavior of a single message */
function Message(msg: messageProps) {
  const [liked, setLiked] = useState(msg.liked);
  const { prompt2message, setMessage } = useMessage();
  const handleLike = () => {
    const _msg: messageProps = {
      time: msg.time,
      role: msg.role,
      content: msg.content,
      liked: !liked,
    };
    msg?.time && setMessage(msg.time, _msg);
    setLiked(!liked);
  };

  return (
    <div
      className={`flex felx-row w-full h-auto m-1 ${
        msg.role === Role.User ? "justify-end" : "justify-start"
      }`}
    >
      {/* The text will autometically starts a new line when reaches the 70% border.*/}
      {/*Modufy w-[] to adjust the portion of the border*/}
      <div
        className={`w-[70%] flex ${
          msg.role === Role.User ? "justify-end" : "justify-start"
        }`}
      >
        {/* Message bubble */}
        <div
          className={`h-auto inline-block rounded-lg py-2 px-3 my-2 ${
            msg.role === Role.User
              ? "bg-gradient-to-bl from-cyan-600 to-cyan-500 text-white"
              : "bg-gradient-to-br from-purple-500 to-purple-400 text-black"
          }`}
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          <div className="text-md sm:text-lg">
            {msg.role === Role.Assistant
              ? msg.content && prompt2message(msg.content)
              : msg.content}
          </div>
        </div>
        {/* Thumb Button */}
        {msg.role === Role.Assistant ? (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleLike}
              className="rounded-full w-auto p-2 hover:scale-125 active:scale-95"
            >
              {liked ? (
                <AiFillLike className=" scale-150" />
              ) : (
                <AiOutlineLike className=" scale-150" />
              )}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Message;
