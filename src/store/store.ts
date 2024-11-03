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

interface GeneralInfoModalState {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  type: "ERROR" | "INFO" | "ALERT";
  setType: (type: "ERROR" | "INFO" | "ALERT") => void;
  setGeneralInfoModal: (state: {
    isModalOpen: boolean;
    type: "ERROR" | "INFO" | "ALERT";
    title: string;
    content: string;
  }) => void;
}

export const useGeneralInfoModalStore = create<GeneralInfoModalState>()(
  devtools(
    persist(
      (set) => ({
        isModalOpen: false,
        setIsModalOpen: (state) => set({ isModalOpen: state }),
        title: "Testing dialog",
        setTitle: (state) => set({ title: state }),
        content: "This is testing dialog",
        setContent: (state) => set({ content: state }),
        type: "INFO",
        setType: (state) => set({ type: state }),
        setGeneralInfoModal: (state) =>
          set({
            isModalOpen: state.isModalOpen,
            type: state.type,
            title: state.title,
            content: state.content,
          }),
      }),
      {
        name: "model-storage",
      }
    )
  )
);
