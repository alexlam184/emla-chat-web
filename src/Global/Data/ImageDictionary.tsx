import MicrobitImg from "../../assets/images/ImageProducts/microbit.png";
import SemtronImg from "../../assets/images/ImageProducts/semtron_logo.png";

/* Store Images in terms of Dictionary (Generic) */
export const ImageDictionary = [
  {
    key: ["microbit", "micro:bit"],
    negative_key: [],
    value: {
      src: MicrobitImg,
      alt: "microbit",
    },
  },
  {
    key: ["semtron"],
    negative_key: ["semtron導師", "semtron課程"],
    value: {
      src: SemtronImg,
      alt: "semtron",
    },
  },
];
