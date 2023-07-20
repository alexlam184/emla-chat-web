import { Configuration, OpenAIApi } from "openai";
import { usePrompt } from "../../hook/PromptHook";
import { useMessage } from "../../hook/MessageHook";
import { Role, Model, events } from "../Data/Enum";
import { useSubscribe, useUnsubscribe } from "../../hook/EventHooks";
import { useEffect } from "react";

const getOutput = async (
  openai: OpenAIApi,
  model: any,
  meessages: any,
  max_tokens: any,
  stop: string,
  temperature: any,
  frequency_penalty: any,
  presence_penalty: any
) => {
  const GPTModule = async (prompts: any) => {
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
  return output;
};

function OpenAIManager() {
  /*Model Properties*/
  const OPENAI_APIKEY = "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";
  const model = Model.gpt3_turbo_16k;
  const max_tokens = 200;
  const stop = "<<END>>";
  const temperature = 1.0;
  const frequency_penalty = 1.0;
  const presence_penalty = 1.3;

  /*Prompt Properties*/
  const userPrefix =
    "請使用英文同每句穿插emoji。當牽涉到專業知識，你必須使用日常生活比喻協助解釋，其他情況你唔應該使用比喻。";
  const userProfix = "（50字）";
  const assistantPrefix = "";
  const assistantProfix = "<<END>>";

  const APICalling = async () => {
    console.log("API CALLING...");
    const configuration = new Configuration({
      apiKey: OPENAI_APIKEY,
    });
    const openai = new OpenAIApi(configuration);

    const { prompts, promptAdjusting } = usePrompt();
    let prompts_api: any = [];
    prompts.map((prompt) => {
      prompt.role === Role.User
        ? (prompt.content = userPrefix + prompt.content + userProfix)
        : (prompt.content = assistantPrefix + prompt.content + assistantProfix);
      prompts_api = [...prompts, prompt];
    });

    const output = await getOutput(
      openai,
      model,
      prompts_api,
      max_tokens,
      stop,
      temperature,
      frequency_penalty,
      presence_penalty
    );
    const { messageAdjusting } = useMessage();
    messageAdjusting({
      time: Date.now(),
      role: Role.Assistant,
      content: output,
      liked: false,
    });
    promptAdjusting(output);
  };
  useEffect(() => {
    const index = useSubscribe(APICalling, events.OnOpenAIStart);
    return () => {
      useUnsubscribe(index, events.OnOpenAIStart);
    };
  }, []);

  return <></>;
}

export default OpenAIManager;
