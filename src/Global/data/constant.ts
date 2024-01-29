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

export const suggestPrompts = {
  lighting: [
    "soft light",
    "hard light",
    "dramatic lighting",
    "ambient lights",
    "ring light",
    "neon light",
    "morning",
    "sunset",
  ],
  environment: ["indoor", "outdoor", "underwater", "in space"],
  colorScheme: ["vibrant", "dark", "pastel"],
  view: ["front", "overhead", "side"],
  photography: [
    "using Nikon camera",
    "using Fujifilm camera",
    "using Canon camera",
  ],
  painting: ["oil painting", "watercolor", "impressionism"],
  illustration: ["pencil drawing", "Charcoal sketch", "cartoon", "poster"],
  art: [
    "old film still",
    "lo-fi",
    "nostalgic",
    "Sculpture",
    "Collage",
    "Street art",
    "Textile art",
    "Installation art",
    "Ceramic art",
    "Lithography",
  ],
  realism: ["4K", "8K"],
};

export const suggestSpecialPrompts = {
  fourPanelComicStrip: "four panel comic strip,[1]...[2]...[3]...[4]...",
};
