//#region Dependency
import { messageProps, promptProps } from "../global/data/Interface";
import { Role } from "../global/data/Enum";
import { usePromptsStore } from "../store/store";
import useCommon from "./useCommon";
//#endregion

export default function usePrompt() {
  const { prompts, setPrompts } = usePromptsStore();
  const { outputAdjust } = useCommon();

  const pushPrompt = (_prompts: Array<messageProps>) => {
    const tuned_prompts: Array<promptProps> = _prompts.map((prompt) => {
      return {
        role: prompt.role,
        content: prompt.content,
      };
    });
    setPrompts([...prompts, ...tuned_prompts]);
    console.log("Push prompt");
    console.log(prompts);
  };

  const promptAdjusting = (msg: messageProps) => {
    msg = outputAdjust(msg);
    if (!msg.content) return null;

    const imporperLiteral = "對唔住";
    const errorLiteral = "Error:";
    if (msg.content.includes(imporperLiteral)) {
      prompts.pop();
      console.log("Imporper prompt deleted.");
      console.log(prompts);
      return null;
    } else if (msg.content.includes(errorLiteral)) {
      prompts.pop();
      console.log("Error message deleted.");
      console.log(prompts);
      return null;
    } else {
      const prompt: promptProps = {
        role: Role.Assistant,
        content: msg.content,
      };
      return prompt;
    }
  };

  return { prompts, promptAdjusting, pushPrompt };
}
