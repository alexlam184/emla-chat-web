import { messageProps } from "../global/data/Interface";

export default function useCommon() {
  const inputAdjust = (text: messageProps) => {
    if (text.content) {
    }
    return text;
  };
  const outputAdjust = (text: messageProps) => {
    if (text.content) {
      text.content = text.content.replace(/很/g, "好");
      text.content = text.content.replace(/的/g, "嘅");
      text.content = text.content.replace(/們/g, "哋");
      text.content = text.content.replace(/不/g, "唔");
      text.content = text.content.replace(/這/g, "呢");
      text.content = text.content.replace(/想/g, "諗");
      text.content = text.content.replace(/找/g, "揾");
      text.content = text.content.replace(/些/g, "啲");
      //text.content = text.content.replace(/想/g, "諗");
      text.content = text.content.replace(/他/g, "佢");
      text.content = text.content.replace(/她/g, "佢");
      text.content = text.content.replace(/它/g, "佢");
      text.content = text.content.replace(/們/g, "地");
      text.content = text.content.replace(/尋找/g, "揾");
      text.content = text.content.replace(/如何/g, "點樣");
      text.content = text.content.replace(/幫忙/g, "幫手");
      text.content = text.content.replace(/盡管/g, "即管");
      text.content = text.content.replace(/儘管/g, "即管");
      text.content = text.content.replace(/甚麼/g, "咩");
      text.content = text.content.replace(/什麼/g, "咩");
    }
    return text;
  };
  return { outputAdjust, inputAdjust };
}
