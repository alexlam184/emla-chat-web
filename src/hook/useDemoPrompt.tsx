import { demo_prompts } from "../global/data/DemoPrompts";
import { messageSettings } from "../global/data/Prompts";

export const useDemoPrompt = (text: string) => {
  let demo_value = "";
  demo_prompts.map((demo) => {
    if (
      messageSettings.userPrefix + demo.key + messageSettings.userProfix ===
      text
    ) {
      demo_value = demo.value;
      return;
    }
  });
  return demo_value;
};
