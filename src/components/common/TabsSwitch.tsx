import { useState } from "react";
import { Children } from "react";
import { RadioButton } from "./RadioButton";
import { useModelStore } from "../../store/store";
import { Model } from "../../global/data/Enum";

const TabsSwitch = ({ children }) => {
  //bot tab page
  const [selectedBot, setSelectedBot] = useState<number>(0); // 0=> chatGPT ,1 =>image generator DALL-E
  const { setModel } = useModelStore();

  const handleOptionChange = (optionId: number) => {
    setSelectedBot(optionId);

    if (optionId === 0) {
      setModel(Model.gpt3_turbo_16k);
    } else if (optionId === 1) {
      setModel(Model.dalle_3);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row  w-full h-full ">
      <ul aria-label="Tab switch" className="flex flex-row sm:flex-col">
        {Children.map(children, (child, index) => (
          <li>
            <RadioButton
              type="radio"
              key={index}
              id={index}
              name="radioGroup"
              label={child.props.name}
              checked={selectedBot === index}
              onChange={() => handleOptionChange(index)}
            />
          </li>
        ))}
      </ul>

      <div aria-label="Tabs" className="w-full h-full">
        {/* Tab nav */}
        {Children.map(children, (child, index) => (
          <div
            className={`w-full h-full ${
              selectedBot === index ? "flex" : "hidden"
            }`}
          >
            {child}
          </div>
        ))}

        <div className="outlet">{/* content will be shown here */}</div>
      </div>
    </div>
  );
};
export default TabsSwitch;
