import { useInputMessageStore } from "../../store/store";

const ButtonGroup = ({ category, prompts, onButtonClick }) => {
  return (
    <div>
      <h3 className="text-2xl text-white font-bold my-4">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
      {prompts.map((prompt, index) => (
        <button
          className="rounded-lg p-2 m-2 bg-indigo-500 border-indigo-500 border-2 font-bold text-white text-center hover:bg-indigo-300 hover:text-white"
          key={index}
          onClick={() => onButtonClick(prompt)}
        >
          {prompt.charAt(0).toUpperCase() + prompt.slice(1)}
        </button>
      ))}
    </div>
  );
};

const SuggestPrompts = () => {
  const { message, setMessage } = useInputMessageStore();

  const suggestPrompts = {
    lighting: [
      "soft light",
      "hard light",
      "dramatic lighting",
      "ambient lights",
      "ring light",
      "neon light",
      "morning",
      "sunset",
    ],
    environment: ["indoor", "outdoor", "underwater", "in space"],
    colorScheme: ["vibrant", "dark", "pastel"],
    view: ["front", "overhead", "side"],
    photography: [
      "using Nikon camera",
      "using Fujifilm camera",
      "using Canon camera",
    ],
    painting: ["oil painting", "watercolor", "impressionism"],
    illustration: ["pencil drawing", "Charcoal sketch", "cartoon", "poster"],
    art: [
      "old film still",
      "lo-fi",
      "nostalgic",
      "Sculpture",
      "Collage",
      "Street art",
      "Textile art",
      "Installation art",
      "Ceramic art",
      "Lithography",
    ],
    realism: ["4K", "8K"],
  };

  const handleButtonClick = (prompt) => {
    console.log(`Button clicked: ${prompt}`);
    //check the last character of a string to see if it is a comma (,)
    if (message.charAt(message.length - 1) === ",") {
      setMessage(message + prompt + ",");
    } else {
      setMessage(message + "," + prompt + ",");
    }
  };

  return (
    <div className="w-full h-full">
      {Object.entries(suggestPrompts).map(([category, prompts]) => (
        <ButtonGroup
          key={category}
          category={category}
          prompts={prompts}
          onButtonClick={handleButtonClick}
        />
      ))}
    </div>
  );
};

export default SuggestPrompts;
