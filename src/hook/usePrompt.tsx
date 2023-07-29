//#region Dependency
import { eventArg, promptProps } from "../global/data/Interface";
import { Role } from "../global/data/Enum";
import { usePromptsStore } from "../store/store";
//#endregion

export default function usePrompt() {
  const { prompts, setPrompts } = usePromptsStore();

  const pushPrompt = (_prompts: Array<promptProps>) => {
    setPrompts([...prompts, ..._prompts]);
    console.log("Push prompt");
    console.log(prompts);
  };

  const promptAdjusting = (arg: eventArg) => {
    let _prompt = arg?.content || "";
    const imporperLiteral = "對唔住";
    if (_prompt.includes(imporperLiteral)) {
      prompts.pop();
      console.log("Imporper prompt deleted.");
      console.log(prompts);
      return null;
    } else {
      _prompt = _prompt.replace(/的/g, "嘅");
      const prompt: promptProps = {
        role: Role.Assistant,
        content: _prompt,
      };
      return prompt;
    }
  };

  return { prompts, promptAdjusting, pushPrompt };
}
