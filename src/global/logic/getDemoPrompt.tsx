import { useTranslation } from "react-i18next";
import { demo_prompts } from "../data/DemoPrompts";
import { messageSettings } from "../data/Prompts";

export const getDemoPrompt = (text: string) => {

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
