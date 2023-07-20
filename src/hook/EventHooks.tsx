import { events } from "../Global/Data/Enum";
import { eventArg } from "../Global/Data/Interface";

let userSubmitStart: Array<(arg?: eventArg) => void> = [];
let userSubmitEnd: Array<(arg?: eventArg) => void> = [];
let openAIStart: Array<(arg?: eventArg) => void> = [];
let vitsStart: Array<(arg?: eventArg) => void> = [];
let APIsEnd: Array<(arg?: eventArg) => void> = [];

export const useEvent = (_event: events) => {
  let event: Array<(arg?: eventArg) => void> = [];

  switch (_event) {
    case events.OnUserSubmitStart:
      event = userSubmitStart;
      break;
    case events.OnUserSubmitEnd:
      event = userSubmitEnd;
      break;
    case events.OnOpenAIStart:
      event = openAIStart;
      break;
    case events.OnVitsStart:
      event = vitsStart;
      break;
    case events.OnAPIsEnd:
      event = APIsEnd;
      break;
    default:
      console.warn("Invalid event type: ${_event}");
      break;
  }

  return { event };
};

export const useSubscribe = (
  listener: (arg?: eventArg) => void,
  _event: events
) => {
  const { event } = useEvent(_event);
  event.push(listener);
  return event.indexOf(listener);
};

export const useUnsubscribe = (index: number, _event: events) => {
  const { event } = useEvent(_event);
  event.splice(index, 1);
};

// const handle = useCallback(() => {
// }, []);
const trigger = async (
  event: Array<(arg?: eventArg) => void>,
  callback?: () => void,
  arg?: eventArg
) => {
  const listenersCount = event.length;
  let listenersCalled = 0;

  if (listenersCount === 0 && callback) {
    callback();
    return;
  }

  event.forEach(async (listener) => {
    await listener(arg);
    listenersCalled++;
    if (listenersCalled === listenersCount && callback) {
      callback();
    }
  });
};

export const useTrigger = async (
  _event: events,
  arg?: eventArg,
  callback?: () => void
) => {
  const { event } = useEvent(_event);

  switch (_event) {
    case events.OnAPIsEnd:
      trigger(event, undefined, arg);
      break;
    default:
      trigger(
        event,
        () => {
          callback && callback();
          useTrigger(_event + 1);
        },
        arg
      );
      break;
  }
};
