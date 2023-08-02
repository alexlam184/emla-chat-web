//#region Dependency
import { Role } from "../data/Enum";
import { messageSettings } from "../data/Prompts";
import { messageProps, promptProps } from "../data/Interface";
import { Base64 } from "js-base64";
import axios from "axios";
//#endregion

const openaiApi = axios.create({
  headers: {
    Authorization:
      "Bearer " + Base64.decode(import.meta.env.VITE_OPENAI_API_KEY),
    "Content-Type": "application/json",
  },
});

/* const configuration = new Configuration({
  apiKey: Base64.decode(import.meta.env.VITE_OPENAI_API_KEY),
}); */

//const openai = new OpenAIApi(configuration);

const getOutput = async (
  model: any,
  meessages: any,
  max_tokens: any,
  stop: string,
  temperature: any,
  frequency_penalty: any,
  presence_penalty: any
) => {
  //return await "<<e:happy>> Hi hi~ 🤗 我係工程系Vtuber Elma 👩‍💻 ,同時係Semtron課程嘅導師🎓。作為電子工程系出身嘅Vtuber, Elma希望可以同大家分享各種工程上得意嘅知識同Maker’s文化! Yea！ 👍!";
  const GPTModule = async (prompts: any) => {
    /*  try {
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
    } */
    const params: any = {
      model: model,
      messages: prompts,
      max_tokens: max_tokens,
      stop: stop,
      temperature: temperature,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty,
    };
    let output = "回應出錯";
    await openaiApi
      .post("https://api.openai.com/v1/chat/completions", params)
      .then((response) => {
        output = response.data.choices[0].message?.content;
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        output = "" + error;
      });
    return output;
  };
  const output = (await GPTModule(meessages)) as string;

  return await output;
};

export const useOpenAI = () => {
  const openAICalling = async (prompts: Array<promptProps>) => {
    console.log("openAI CALLING...");
    const prompts_api: any = prompts.map((prompt: promptProps) => {
      return {
        role: prompt.role,
        content:
          prompt.role === Role.User
            ? messageSettings.userPrefix +
              prompt.content +
              messageSettings.userProfix
            : messageSettings.assistantPrefix +
              prompt.content +
              messageSettings.assistantProfix,
      };
    });
    /* prompts_api[i].content =
        prompts_api[i].role === Role.User
        ? messageSettings.userPrefix +
          prompts_api[i].content +
          messageSettings.userProfix
        : messageSettings.assistantPrefix +
          prompts_api[i].content +
          messageSettings.assistantProfix;
 */
    const output = await getOutput(
      messageSettings.model,
      prompts_api,
      messageSettings.max_tokens,
      messageSettings.stop,
      messageSettings.temperature,
      messageSettings.frequency_penalty,
      messageSettings.presence_penalty
    );
    const _arg: messageProps = {
      time: Date.now(),
      role: Role.Assistant,
      content: output,
      liked: false,
    };

    return await _arg;
  };

  return { openAICalling };
};
