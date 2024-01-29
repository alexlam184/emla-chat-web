import React from "react";
import { SuggestPromptsType } from "../../global/data/Interface";
import { useInputMessageStore } from "../../store/store";

const ButtonGroup = ({ category, prompts, onButtonClick }) => {
  return (
    <div>
      <h3 className="text-2xl text-white">{category}</h3>
      {prompts.map((prompt, index) => (
        <button
          className="rounded-3xl  p-2 bg-white border-indigo-600 border-2 text-indigo-600 text-center hover:bg-indigo-300 hover:text-white"
          key={index}
          onClick={() => onButtonClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

const SuggestPrompts = ({
  suggestPrompts,
}: {
  suggestPrompts: SuggestPromptsType;
}) => {
  const { message, setMessage } = useInputMessageStore();
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
