import { promptProps } from "../Global/Data/Interface";
import { Role } from "../Global/Data/Enum";
import { systemContent, few_shot_prompts } from "../Global/Data/Prompts";
import { events } from "../Global/Data/Enum";
import { useSubscribe } from "./EventHooks";

let prompts: Array<promptProps> = [
  {
    role: Role.System,
    content: systemContent,
  },
  ...few_shot_prompts,
];

let promptSub = false;

export const usePrompt = () => {
  const setPrompts = (_prompts: Array<promptProps>) => {
    prompts = _prompts;
  };

  const pushPrompt = (prompt?: promptProps) => {
    prompt &&
      setPrompts([...prompts, { role: prompt.role, content: prompt.content }]);
    console.log("Push prompt");
    console.log(prompts);
  };

  !promptSub
    ? (useSubscribe(pushPrompt, events.OnUserSubmitStart), (promptSub = true))
    : "";

  const promptAdjusting = (_prompt: string) => {
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
      pushPrompt(prompt);
    }
  };

  return { prompts, promptAdjusting };
};
