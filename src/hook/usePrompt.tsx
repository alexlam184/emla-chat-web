//#region Dependency
import { eventArg, promptProps } from "../global/data/Interface";
import { Role } from "../global/data/Enum";
import { usePromptsStore } from "../store/store";
//#endregion

export default function usePrompt() {
  const { prompts, setPrompts } = usePromptsStore();

  const pushPrompt = async (prompt: promptProps) => {
    const _prompt = prompt ? prompt : {};
    await setPrompts([
      ...prompts,
      { role: _prompt.role, content: _prompt.content },
    ]);
    console.log("Push prompt");
    console.log(prompts);
  };

  const promptAdjusting = async (arg?: eventArg) => {
    let _prompt = arg?.content || "";
    const imporperLiteral = "對唔住";
    if (_prompt.includes(imporperLiteral)) {
      prompts.pop();
      console.log("Imporper prompt deleted.");
      console.log(prompts);
    } else {
      _prompt = _prompt.replace(/的/g, "嘅");
      const prompt: promptProps = {
        role: Role.Assistant,
        content: _prompt,
      };
      await pushPrompt(prompt);
    }
  };

  return { prompts, promptAdjusting, pushPrompt };
}
