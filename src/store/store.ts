import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { messageProps, promptProps } from "../global/data/Interface";
import { Model, Role } from "../global/data/Enum";
import { few_shot_prompts } from "../global/data/Prompts";

interface MutedState {
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

export const useMutedStore = create<MutedState>()(
  devtools(
    persist(
      (set) => ({
        muted: false,
        setMuted: (state) => set({ muted: state }),
      }),
      {
        name: "muted-storage",
      }
    )
  )
);

interface ModelState {
  model: Model.gpt3_turbo_16k | Model.dalle_3;
  setModel: (model: Model.gpt3_turbo_16k | Model.dalle_3) => void;
}

export const useModelStore = create<ModelState>()(
  devtools(
    persist(
      (set) => ({
        model: Model.gpt3_turbo_16k,
        setModel: (state) => set({ model: state }),
      }),
      {
        name: "model-storage",
      }
    )
  )
);

interface InputMesssageState {
  message: string;
  setMessage: (message: string) => void;
}
export const useInputMessageStore = create<InputMesssageState>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        setMessage: (state) => set({ message: state }),
      }),
      {
        name: "input-message-storage",
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
        setMessages: (state) => {
          set({ messages: state });
        },
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
            content: import.meta.env.VITE_SYSTEM_CONTENT,
          },
          ...few_shot_prompts,
        ],
        setPrompts: (state) => {
          set({ prompts: state });
        },
      }),
      {
        name: "prompts-storage",
      }
    )
  )
);

interface ImageOutputMesssageState {
  imageMessage: string;
  setImageMessage: (imageMessage: string) => void;
}
export const useImageOutputMessageStore = create<ImageOutputMesssageState>()(
  devtools(
    persist(
      (set) => ({
        imageMessage: "",
        setImageMessage: (state) => set({ imageMessage: state }),
      }),
      {
        name: "image-message-storage",
      }
    )
  )
);
