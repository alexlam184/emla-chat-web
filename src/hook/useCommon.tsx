import { messageProps } from "../global/data/Interface";
import { tify } from "chinese-conv";

export default function useCommon() {
  const inputAdjust = (text: messageProps) => {
    if (text.content) {
    }
    return text;
  };
  const outputAdjust = (text: messageProps) => {
    text.content = tify(text.content);
    if (text.content) {
      text.content = text.content.replace(/』s/g, "'s");
      text.content = text.content.replace(/很/g, "好");
      text.content = text.content.replace(/的/g, "嘅");
      text.content = text.content.replace(/們/g, "哋");
      text.content = text.content.replace(/不行/g, "唔得");
      text.content = text.content.replace(/這/g, "呢");
      text.content = text.content.replace(/找/g, "揾");
      text.content = text.content.replace(/些/g, "啲");
      //text.content = text.content.replace(/想/g, "諗");
      //text.content = text.content.replace(/他/g, "佢");
      //text.content = text.content.replace(/她/g, "佢");
      //text.content = text.content.replace(/它/g, "佢");
      //text.content = text.content.replace(/們/g, "地");
      text.content = text.content.replace(/尋找/g, "揾");
      text.content = text.content.replace(/如何/g, "點樣");
      text.content = text.content.replace(/幫忙/g, "幫手");
      text.content = text.content.replace(/盡管/g, "即管");
      text.content = text.content.replace(/儘管/g, "即管");
      text.content = text.content.replace(/為甚麼/g, "點解");
      text.content = text.content.replace(/甚麼/g, "咩");
      text.content = text.content.replace(/什麼/g, "咩");
      text.content = text.content.replace(/和/g, "同");
      text.content = text.content.replace(/好想/g, "好似");
      text.content = text.content.replace(/不同/g, "唔同");
      text.content = text.content.replace(/才能/g, "先能");
      text.content = text.content.replace(/還有/g, "仲有");
    }
    return text;
  };
  return { outputAdjust, inputAdjust };
}
