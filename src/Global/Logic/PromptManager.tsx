import { MessageProps, PromptProps } from "../Data/Interface";
import { OnUserSubmitStart } from "../Events/EventHandler";
import { Role } from "../Data/Enum";
import { systemContent, few_shot_prompts } from "../Data/Prompts";

export class PromptManager {
  private prompts: Array<PromptProps> = [
    {
      role: Role.System,
      content: systemContent,
    },
    ...few_shot_prompts,
  ];

  public getPrompt() {
    return this.prompts;
  }

  /* Singleton Pattern */
  private static instance: PromptManager;
  public static getInstance(): PromptManager {
    if (!PromptManager.instance) {
      PromptManager.instance = new PromptManager();
    }
    return PromptManager.instance;
  }

  constructor() {
    this.pushPrompt = this.pushPrompt.bind(this);
    const submitEvent = OnUserSubmitStart.getInstance();
    submitEvent.subscribe(this.pushPrompt);
  }

  public promptAdjusting(prompt: string) {
    const imporperLiteral = "對唔住";
    if (prompt.includes(imporperLiteral)) {
      this.prompts.pop();
    } else {
      const msg: MessageProps = {
        role: Role.Assistant,
        content: prompt,
        time: 0,
        liked: false,
      };
      this.pushPrompt(msg);
    }
  }

  private pushPrompt(msg: MessageProps) {
    const _prompt = { role: msg.role, content: msg.content };
    this.prompts.push(_prompt);
    console.log("Push prompt");
    console.log(this.prompts);
  }
}
