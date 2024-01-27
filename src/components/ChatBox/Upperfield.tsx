import title_chatroom from "../../assets/images/title_chatroom.png";
export default function Upperfield() {
  return (
    <div className="w-auto h-[100px] flex flex-row space-x-2 items-end justify-center">
      {/*       <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        Elma Chat Room
      </span> */}
      <img
        src={title_chatroom}
        alt="title_chatroom"
        className=" scale-100"
      ></img>
    </div>
  );
}
