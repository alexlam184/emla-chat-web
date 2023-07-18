import ImageFactory from "./ImageFactory";
import { MessageProps } from "../Data/Interface";
import { OnUserSubmitStart } from "../Events/EventHandler";
import { Role } from "../Data/Enum";

export class MessageManager {
  private messages: Array<MessageProps> = [
    {
      time: Date.now(),
      role: Role.Assistant,
      content:
        "Hi hi~ 🤗 我係工程系Vtuber Elma 👩‍💻 ,同時係Semtron課程嘅導師🎓。作為電子工程系出身嘅Vtuber, Elma希望可以同大家分享各種工程上得意嘅知識同Maker’s文化! Yea~ 👍",
      liked: false,
    },
  ];

  public getMessage() {
    return this.messages;
  }

  /* Singleton Pattern */
  private static instance: MessageManager;
  public static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager();
    }
    return MessageManager.instance;
  }

  constructor() {
    /* Bind PushMessage to the instance of MessageManager */
    this.pushMessage = this.pushMessage.bind(this);
    const submitEvent = OnUserSubmitStart.getInstance();
    submitEvent.subscribe(this.pushMessage);
  }

  public pushMessage(msg: MessageProps) {
    this.messages.push(msg);
    console.log("Push messages. ");
    console.log(this.messages);
  }

  /* Turn the raw assistant content into readable message */
  public prompt2message(prompt: string) {
    const imgLiteral = /<<i:(.*?)>>/;
    const parts = prompt.split(imgLiteral);
    return (
      /* Replace Image Tag <<i:key>> into Image Component */
      <>
        {parts[0]}
        <ImageFactory imgContent={parts[1]} />
        {parts[2]}
      </>
    );
  }
}
