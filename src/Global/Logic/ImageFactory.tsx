import { ImageDictionary } from "../Data/ImageDictionary";

interface ImageFactoryProps {
  imgContent: string;
}

/* Return the image component by searching the image dictionary */
function ImageFactory(props: ImageFactoryProps) {
  const imgDict = ImageDictionary;
  let src = null;
  let alt = "null";

  imgDict.map((item) => {
    if (item.key === props.imgContent) {
      src = item.value.src;
      alt = item.value.alt;
      return;
    }
  });

  return src !== null ? <img src={src} alt={alt} /> : <></>;
}

export default ImageFactory;
