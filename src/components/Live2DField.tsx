//#region dependencies
import { useEffect } from "react";
import { Live2DModel, config, InternalModel } from "pixi-live2d-display";
import * as PIXI from "pixi.js";
import { Ticker } from "@pixi/ticker";
//#endregion

// log level
config.logLevel = config.LOG_LEVEL_WARNING; // LOG_LEVEL_VERBOSE, LOG_LEVEL_ERROR, LOG_LEVEL_NONE

// play sound for motions
config.sound = true;

// defer the playback of a motion and its sound until both are loaded
config.motionSync = true;

// default fade-in/fade-out durations in milliseconds, will be applied to
// motions/expressions that don't have these values specified
config.motionFadingDuration = 500;
config.idleMotionFadingDuration = 500;
config.expressionFadingDuration = 500;

// unofficial and experimental support for 4x4 mask division in Cubism 4
config.cubism4.supportMoreMaskDivisions = true;

interface Live2DFieldProps {
  emotion: string;
  audioData: ArrayBuffer;
}
let model: Live2DModel<InternalModel> | null = null;
function Live2DField(props: Live2DFieldProps) {
  // register Ticker for Live2DModel
  Live2DModel.registerTicker(Ticker);
  const cubism4Model = "src\\assets\\model\\未命名\\未命名.model3.json";

  useEffect(() => {
    const app = new PIXI.Application({
      view:
        (document.getElementById("canvas") as HTMLCanvasElement) ?? undefined,
      autoStart: true,
      backgroundAlpha: 0.0,
      resizeTo: document.getElementById("elmaContainer") ?? undefined,
    });
    app.renderer.plugins.interaction.destroy(); // Remove the default interaction manager

    const loadModels = async () => {
      model = await Live2DModel.from(cubism4Model);
      app.stage.addChild(model);

      model.scale.set(0.5);
      model.anchor.set(0.2, 0);
      // model.x =
      //   ((document.getElementById("elmaContainer")?.offsetWidth ?? 700) / 3) *
      //   -1;
      // model.y =
      //   (document.getElementById("elmaContainer")?.offsetHeight ?? 700) / 100.0;
      // model.zIndex = -50;
    };
    loadModels();
    return () => {
      //model?.destroy();
    };
  }, []);

  useEffect(() => {
    if (props.audioData.byteLength <= 0) return;

    let playing = true;
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    audioCtx.decodeAudioData(props.audioData, function (buffer) {
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      source.connect(audioCtx.destination);

      source.connect(analyser);

      source.start(0);

      source.onended = () => {
        playing = false;
      };
    });
    //};
    //request.send();

    const getByteFrequencyData = () => {
      analyser.getByteFrequencyData(frequencyData);
      return frequencyData;
    };
    const setMouthOpenY = (v: number) => {
      v = Math.max(0, Math.min(1, v));

      model &&
        //@ts-ignore
        model.internalModel.coreModel.setParameterValueById(
          "ParamMouthOpenY",
          v
        );
      model &&
        //@ts-ignore
        model.internalModel.coreModel.setParameterValueById(
          "ParamMouthForm",
          v
        );
    };
    const mouthCloseSize: number = 10;
    const arrayAdd = (a: number[]): number => a.reduce((i, a) => i + a, 0);

    const run = (): void => {
      if (!playing) return;
      const frequencyData: Uint8Array = getByteFrequencyData();
      const arr: number[] = [];
      for (let i: number = 0; i < 700; i += mouthCloseSize) {
        arr.push(frequencyData[i]);
      }
      setMouthOpenY((arrayAdd(arr) / arr.length - 20) / 60);
      setTimeout(run, 1000 / 30);
    };
    run();
  }, [props.audioData]);

  return <canvas id="canvas"></canvas>;
}

export default Live2DField;
