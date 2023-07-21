import { events } from "../Global/Data/Enum";
import { eventArg } from "../Global/Data/Interface";

type listener = (arg?: eventArg) => Promise<void> | eventArg;
interface eventProp {
  handler: Array<listener>;
  callback?: () => void;
}

let userSubmitStart: eventProp = {
  handler: [],
  callback: () => {
    {
      useTrigger(events.OnUserSubmitEnd);
    }
  },
};
let userSubmitEnd: eventProp = {
  handler: [],
  callback: () => {
    {
      useTrigger(events.OnOpenAIStart);
    }
  },
};
let openAIStart: eventProp = {
  handler: [],
  callback: () => {
    {
      useTrigger(events.OnVitsStart);
    }
  },
};
let vitsStart: eventProp = {
  handler: [],
  callback: () => {
    {
      useTrigger(events.OnAPIsEnd);
    }
  },
};
let APIsEnd: eventProp = {
  handler: [],
  callback: () => {
    {
    }
  },
};

export const useEvent = (_event: events) => {
  let event: eventProp = { handler: [], callback: undefined };

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

export const useSubscribe = (listener: listener, _event: events) => {
  const { event } = useEvent(_event);
  event.handler.push(listener);
  return event.handler.indexOf(listener);
};

export const useUnsubscribe = (index: number, _event: events) => {
  const { event } = useEvent(_event);
  event.handler.splice(index, 1);
};

// const handle = useCallback(() => {
// }, []);
const trigger = async (
  event: eventProp,
  arg?: eventArg,
  callback?: () => void
) => {
  const listenersCount = event.handler.length;
  let listenersCalled = 0;

  if (listenersCount === 0 && callback) {
    callback();
    return;
  }

  event.handler.forEach(async (listener) => {
    await listener(arg);
    listenersCalled++;
    if (listenersCalled === listenersCount && callback) {
      callback();
    }
  });
};

export const useTrigger = async (_event: events, arg?: eventArg) => {
  const { event } = useEvent(_event);
  trigger(event, arg, event.callback);
};
