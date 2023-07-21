import { Configuration, OpenAIApi } from "openai";
import { usePrompt } from "../../hook/PromptHook";
import { useMessage } from "../../hook/MessageHook";
import { Role, events } from "../Data/Enum";
import { useSubscribe, useUnsubscribe } from "../../hook/EventHooks";
import { useEffect } from "react";
import { messageSettings } from "../Data/Prompts";
import { useVits } from "./VitsManager";

const OPENAI_APIKEY = "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";

const configuration = new Configuration({
  apiKey: OPENAI_APIKEY,
});

const openai = new OpenAIApi(configuration);

const getOutput = async (
  model: any,
  meessages: any,
  max_tokens: any,
  stop: string,
  temperature: any,
  frequency_penalty: any,
  presence_penalty: any
) => {
  /*   const GPTModule = async (prompts: any) => {
    const response = await openai.createChatCompletion({
      model: model,
      messages: prompts,
      max_tokens: max_tokens,
      stop: stop,
      temperature: temperature,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty,
    });
    return response.data.choices[0].message?.content;
  };
  const output = (await GPTModule(meessages)) as string;

  return output; */
  return "哈嘍！我個名系艾瑪！";
};

function OpenAIManager() {
  const openAICalling = async () => {
    console.log("openAI CALLING...");

    const { prompts, promptAdjusting } = usePrompt();
    let prompts_api: any = [];
    prompts.map((prompt) => {
      prompt.role === Role.User
        ? (prompt.content =
            messageSettings.userPrefix +
            prompt.content +
            messageSettings.userProfix)
        : (prompt.content =
            messageSettings.assistantPrefix +
            prompt.content +
            messageSettings.assistantProfix);
      prompts_api = [...prompts, prompt];
    });

    const output = await getOutput(
      messageSettings.model,
      prompts_api,
      messageSettings.max_tokens,
      messageSettings.stop,
      messageSettings.temperature,
      messageSettings.frequency_penalty,
      messageSettings.presence_penalty
    );
    const { messageAdjusting } = useMessage();
    messageAdjusting({
      time: Date.now(),
      role: Role.Assistant,
      content: output,
      liked: false,
    });
    promptAdjusting(output);
    const { setVoiceText } = useVits();
    setVoiceText(output);
  };

  useEffect(() => {
    const index = useSubscribe(openAICalling, events.OnOpenAIStart);
    return () => {
      useUnsubscribe(index, events.OnOpenAIStart);
    };
  }, []);

  return <></>;
}

export default OpenAIManager;
