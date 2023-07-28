//#region Dependency
import ElmaModel from "../assets/images/Elma_Model.png";
//#endregion

interface Live2DModelProps {
  emotion: string;
}

/* Component which stores and control the behaviors of the live2D's model */
function Live2DModel(props: Live2DModelProps) {
  return (
    <div className="flex flex-col h-full items-center font-bold">
      <span className="text-4xl p-6">Emotion: {props.emotion}</span>
      <img src={ElmaModel} alt="elma_model" />
    </div>
  );
}
export default Live2DModel;
