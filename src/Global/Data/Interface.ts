import { Role } from "./Enum";

export interface PromptProps {
  role: string;
  content: string;
}

export interface MessageProps {
  time: number;
  role: Role;
  content: string;
  liked: boolean;
}
