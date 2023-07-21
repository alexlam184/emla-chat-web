import { Role } from "../../Global/Data/Enum";
import { useMessage } from "../../hook/MessageHook";
import { messageProps } from "../../Global/Data/Interface";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

/* Behavior of a single message */
function Message(msg: messageProps) {
  const { prompt2message, setMessage } = useMessage();
  const handleLike = () => {
    const _msg: messageProps = {
      time: msg.time,
      role: msg.role,
      content: msg.content,
      liked: !msg.liked,
    };
    setMessage(msg.time, _msg);
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
            {prompt2message(msg.content)}
          </div>
        </div>
        {/* Thumb Button */}
        {msg.role === Role.Assistant ? (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleLike}
              className="rounded-full w-auto p-2 hover:bg-slate-300"
            >
              {msg.liked ? (
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
