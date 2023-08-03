import { ImageDictionary } from "../data/ImageDictionary";

interface ImageFactoryProp {
  msg: string;
}

/* Return the image component by searching the image dictionary */
function ImageFactory(props: ImageFactoryProp) {
  const imgDict = ImageDictionary;
  let src = null;
  let alt = "null";

  imgDict.map((item) => {
    let boolFlag = false;
    item.negative_key.map((nkey) => {
      if (props.msg.toLowerCase().includes(nkey)) {
        boolFlag = true;
        return;
      }
    });
    if (!boolFlag) {
      item.key.map((key) => {
        if (props.msg.toLowerCase().includes(key)) {
          src = item.value.src;
          alt = item.value.src;
          boolFlag = true;
          return;
        }
      });
      if (boolFlag) return;
    }
  });

  return src !== null ? <img src={src} alt={alt} /> : <></>;
}

export default ImageFactory;
