import { MessageProps } from "../Data/Interface";
import { Event } from "./Event";

export class OnUserSubmitStart extends Event<MessageProps> {
  /* Singleton Pattern */
  private static instance: OnUserSubmitStart;
  public static getInstance(): OnUserSubmitStart {
    if (!OnUserSubmitStart.instance) {
      OnUserSubmitStart.instance = new OnUserSubmitStart(() => {
        console.log("Submit Start Callback.");
        console.log("Submit End Emit.");
        OnUserSubmitEnd.getInstance().trigger();
      });
    }
    return OnUserSubmitStart.instance;
  }
}

export class OnUserSubmitEnd extends Event<void> {
  /* Singleton Pattern */
  private static instance: OnUserSubmitEnd;
  public static getInstance(): OnUserSubmitEnd {
    if (!OnUserSubmitEnd.instance) {
      OnUserSubmitEnd.instance = new OnUserSubmitEnd(() => {
        console.log("Submit End Callback.");
        console.log("OpenAI Start Emit.");
        OnOpenAIStart.getInstance().trigger();
      });
    }
    return OnUserSubmitEnd.instance;
  }
}

export class OnOpenAIStart extends Event<void> {
  /* Singleton Pattern */
  private static instance: OnOpenAIStart;
  public static getInstance(): OnOpenAIStart {
    if (!OnOpenAIStart.instance) {
      OnOpenAIStart.instance = new OnOpenAIStart(() => {
        console.log("OpenAI Start Callback.");
        console.log("Vits Start Emit.");
        OnVitsStart.getInstance().trigger();
      });
    }
    return OnOpenAIStart.instance;
  }
}

export class OnVitsStart extends Event<void> {
  /* Singleton Pattern */
  private static instance: OnVitsStart;
  public static getInstance(): OnVitsStart {
    if (!OnVitsStart.instance) {
      OnVitsStart.instance = new OnVitsStart(() => {
        console.log("Vits Start Callback.");
        console.log("APIs End Emit.");
        OnAPIsEnd.getInstance().trigger();
      });
    }
    return OnVitsStart.instance;
  }
}

export class OnAPIsEnd extends Event<void> {
  /* Singleton Pattern */
  private static instance: OnAPIsEnd;
  public static getInstance(): OnAPIsEnd {
    if (!OnAPIsEnd.instance) {
      OnAPIsEnd.instance = new OnAPIsEnd(() => {
        console.log("APIs End Callback.");
      });
    }
    return OnAPIsEnd.instance;
  }
}
