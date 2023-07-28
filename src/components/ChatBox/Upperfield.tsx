import { useMutedStore } from "../../store/store";
import {
  PiSpeakerSimpleHighBold,
  PiSpeakerSimpleSlashBold,
} from "react-icons/pi";

export default function Upperfield() {
  const { muted, setMuted } = useMutedStore();
  return (
    <div className="flex flex-row space-x-2 items-center justify-center">
      <div className="flex flex-row h-full w-auto items-center justify-center">
        <label
          className={`relative block h-[25px] w-[50px] rounded-full  ${
            muted ? " bg-purple-400" : "bg-blue-600"
          }`}
        >
          <input
            type="checkbox"
            onChange={() => {
              setMuted(!muted);
            }}
            className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
          />
          <span
            className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full shadow-switcher duration-75 ease-linear bg-cyan-400 ${
              muted
                ? "!left-[23px] !-translate-x-full"
                : "!right-[3px] !translate-x-full"
            }`}
          >
            {muted ? <PiSpeakerSimpleSlashBold /> : <PiSpeakerSimpleHighBold />}
          </span>
        </label>
      </div>
      <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        Elma Chat Room
      </span>
    </div>
  );
}
