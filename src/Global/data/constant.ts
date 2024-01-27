export const locales = {
  hk: { title: "繁體中文" },
  en: { title: "English" },
};

export const bots = [
  {
    id: 0,
    name: "chatgpt",
    label: "chatGPT 文字對答",
  },
  {
    id: 1,
    name: "image-generator",
    label: "Image Generator 圖像生成",
  },
];

export const suggestPrompt = {
  lighting: ["soft lighting", "ambient lights", "ring light", "neon light"],
  environment: ["indoor", "outdoor", "underwater", "in space"],
  colorScheme: ["vibrant", "dark", "pastel"],
  view: ["front", "overhead", "side"],
};
