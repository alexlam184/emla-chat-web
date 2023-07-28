import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { messageProps, promptProps } from "../global/data/Interface";
import { Role } from "../global/data/Enum";
import { systemContent, few_shot_prompts } from "../global/data/Prompts";

interface MutedState {
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

export const useMutedStore = create<MutedState>()(
  devtools(
    persist(
      (set) => ({
        muted: false,
        setMuted: (muted) => set({ muted }),
      }),
      {
        name: "muted-storage",
      }
    )
  )
);

interface MessageState {
  message: string;
  setMessage: (message: string) => void;
}
export const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        setMessage: (message) => set({ message }),
      }),
      {
        name: "message-storage",
      }
    )
  )
);

interface MessagesState {
  messages: Array<messageProps>;
  setMessages: (messages: Array<messageProps>) => void;
}
export const useMessagesStore = create<MessagesState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        setMessages: (messages) => set({ messages }),
      }),
      {
        name: "messages-storage",
      }
    )
  )
);

interface PromptsState {
  prompts: Array<promptProps>;
  setPrompts: (prompts: Array<promptProps>) => void;
}
export const usePromptsStore = create<PromptsState>()(
  devtools(
    persist(
      (set) => ({
        prompts: [
          {
            role: Role.System,
            content: systemContent,
          },
          ...few_shot_prompts,
        ],
        setPrompts: (prompts) => set({ prompts }),
      }),
      {
        name: "prompts-storage",
      }
    )
  )
);
