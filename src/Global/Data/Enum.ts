/* Roles Enumeration */
export enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export enum Model {
  gpt3_turbo = "gpt-3.5-turbo",
  gpt3_turbo_16k = "gpt-3.5-turbo-16k",
  davinci_003 = "text-davinci-003",
  gpt4 = "gpt-4",
  gpt4_32k = "gpt-4-32k",
}

export enum events {
  OnUserSubmitStart,
  OnUserSubmitEnd,
  OnOpenAIStart,
  OnVitsStart,
  OnAPIsEnd,
}
