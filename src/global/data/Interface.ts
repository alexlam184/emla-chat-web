export interface promptProps {
  role?: string;
  content?: string;
}

export interface messageProps extends promptProps {
  time?: number;
  liked?: boolean;
}

export interface SuggestPromptsType {
  lighting: string[];
  environment: string[];
  colorScheme: string[];
  view: string[];
  photography: string[];
  painting: string[];
  illustration: string[];
  art: string[];
  realism: string[];
}
