//#region Dependency
import { Configuration, OpenAIApi } from "openai";
import { Role } from "../data/Enum";
import { messageSettings } from "../data/Prompts";
import { eventArg, promptProps } from "../data/Interface";
//#endregion

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
  /* return await "<<e:happy>>Hi hi~ 🤗 我係工程系Vtuber Elma 👩‍💻 ,同時係Semtron課程嘅導師🎓。作為電子工程系出身嘅Vtuber, Elma希望可以同大家分享各種工程上得意嘅知識同Maker’s文化! Yea！ 👍!"; */
  const GPTModule = async (prompts: any) => {
    try {
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
    } catch (error) {
      console.error("An error occurred:", error);
      return "" + error;
    }
  };
  const output = (await GPTModule(meessages)) as string;

  return await output;
};

export const useOpenAI = () => {
  const openAICalling = async (prompts: Array<promptProps>) => {
    console.log("openAI CALLING...");
    let prompts_api: any = prompts;
    const i = prompts_api.length - 1;
    prompts_api[i].content =
      prompts_api[i].role === Role.User
        ? messageSettings.userPrefix +
          prompts_api[i].content +
          messageSettings.userProfix
        : messageSettings.assistantPrefix +
          prompts_api[i].content +
          messageSettings.assistantProfix;

    const output = await getOutput(
      messageSettings.model,
      prompts_api,
      messageSettings.max_tokens,
      messageSettings.stop,
      messageSettings.temperature,
      messageSettings.frequency_penalty,
      messageSettings.presence_penalty
    );
    const _arg: eventArg = {
      time: Date.now(),
      role: Role.Assistant,
      content: output,
      liked: false,
    };

    return await _arg;
  };

  return { openAICalling };
};
