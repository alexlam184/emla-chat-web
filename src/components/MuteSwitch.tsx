import { useMutedStore } from "../store/store";
import sound_on from "../assets/images/sound_on.png";
import sound_off from "../assets/images/sound_off.png";

export default function MuteSwitch() {
  const { muted, setMuted } = useMutedStore();
  return (
    <div className="flex flex-row h-full w-auto items-center justify-center">
      <label
        className={`relative block h-[25px] w-[50px] rounded-full bg-black border border-white`}
      >
        <input
          type="checkbox"
          onChange={() => {
            setMuted(!muted);
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full shadow-switcher duration-75 ease-linear ${
            muted
              ? "!left-[23px] !-translate-x-full"
              : "!right-[3px] !translate-x-full"
          }`}
        >
          {muted ? (
            <img src={sound_off} alt="sound_off"></img>
          ) : (
            <img src={sound_on} alt="sound_on"></img>
          )}
        </span>
      </label>
    </div>
  );
}
