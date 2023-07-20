export interface eventArg extends messageProps {}

export interface promptProps {
  role: string;
  content: string;
}

export interface messageProps extends promptProps {
  time: number;
  liked: boolean;
}
