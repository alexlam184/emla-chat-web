import { OnOpenAIStart } from "../Events/EventHandler";
import { Configuration, OpenAIApi } from "openai";
import { PromptManager } from "./PromptManager";
import { MessageManager } from "./MessageManager";
import { Role, Model } from "../Data/Enum";

export class OpenAIManager {
  /*Model Properties*/
  private OPENAI_APIKEY = "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";
  private model = Model.gpt3_turbo_16k;
  private max_tokens = 2000;
  private stop = "<<END>>";
  private temperature = 0.0;
  private frequency_penalty = 1.0;
  private presence_penalty = 1.3;

  /*Prompt Properties*/
  private userPrefix = "請使用廣東話同穿插emoji。請遵守<<i:>>規則。";
  private userProfix = "(100字)";
  private assistantPrefix = "";
  private assistantProfix = "<<END>>";

  /* Singleton Pattern */
  private static instance: OpenAIManager;
  public static getInstance(): OpenAIManager {
    if (!OpenAIManager.instance) {
      OpenAIManager.instance = new OpenAIManager();
    }
    return OpenAIManager.instance;
  }

  constructor() {
    this.APICalling = this.APICalling.bind(this);
    const openAIEvent = OnOpenAIStart.getInstance();
    openAIEvent.subscribe(this.APICalling);
  }

  private async APICalling() {
    console.log("API CALLING...");
    const configuration = new Configuration({
      apiKey: this.OPENAI_APIKEY,
    });
    const openai = new OpenAIApi(configuration);

    const promptManager = PromptManager.getInstance();
    let prompts: any = [];
    promptManager.getPrompt().map((prompt) => {
      prompt.role === Role.User
        ? (prompt.content = this.userPrefix + prompt.content + this.userProfix)
        : (prompt.content =
            this.assistantPrefix + prompt.content + this.assistantProfix);
      prompts = [...prompts, prompt];
    });

    const GPTModule = async (prompts: any) => {
      const response = await openai.createChatCompletion({
        model: this.model,
        messages: prompts,
        max_tokens: this.max_tokens,
        stop: this.stop,
        temperature: this.temperature,
        frequency_penalty: this.frequency_penalty,
        presence_penalty: this.presence_penalty,
      });
      return response.data.choices[0].message?.content;
    };

    const output = (await GPTModule(prompts)) as string;
    const msgManager = MessageManager.getInstance();
    msgManager.pushMessage({
      time: Date.now(),
      role: Role.Assistant,
      content: output,
      liked: false,
    });
    promptManager.promptAdjusting(output);
  }
}
