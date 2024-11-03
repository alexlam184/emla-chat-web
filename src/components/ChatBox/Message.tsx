//#region Dependency
import { Role } from "../../global/data/Enum";
import { messageProps } from "../../global/data/Interface";
import like_outline from "../../assets/images/like_outline.png";
import like_fill from "../../assets/images/like_fill.png";
import { useState } from "react";
import useMessage from "../../hook/useMessage";
import Prompt2Message from "./Prompt2Message";
//#endregion

/* Behavior of a single message */
function Message(msg: messageProps) {
  const [liked, setLiked] = useState(msg.liked);
  const { setMessage } = useMessage();
  const handleLike = () => {
    const _msg: messageProps = {
      time: msg.time,
      role: msg.role,
      content: msg.content,
      liked: !liked,
    };
    msg.time && setMessage(msg.time, _msg);
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
          className={`h-auto inline-block rounded-lg py-2 px-3 ${
            msg.role === Role.User
              ? "bg-gradient-to-bl from-cyan-500 to-cyan-400 text-black "
              : "bg-gradient-to-br from-purple-500 to-purple-400 text-black "
          }`}
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          <div className="text-md font-semibold">
            {msg.role === Role.Assistant
              ? msg.content && <Prompt2Message prompt={msg.content} />
              : msg.content}
          </div>
        </div>
        {/* Thumb Button */}
        {msg.role === Role.Assistant ? (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleLike}
              className="rounded-full w-[50px] p-2 hover:scale-125 active:scale-95"
            >
              {liked ? (
                <img src={like_fill} alt="like_fill"></img>
              ) : (
                <img src={like_outline} alt="like_fill"></img>
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
