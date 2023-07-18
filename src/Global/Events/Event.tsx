export class Event<T> {
  private event: Array<(arg: T) => void> = [];
  private callback?: () => void;

  constructor(callback?: () => void) {
    this.callback = callback;
  }

  public subscribe(listener: (arg: T) => void): void {
    this.event.push(listener);
  }

  public async trigger(eventArg: T): Promise<void> {
    const listenersCount = this.event.length;

    let listenersCalled = 0;

    if (listenersCount === 0 && this.callback) {
      this.callback();
      return;
    }

    const onListenerCalled = () => {
      listenersCalled++;
      if (listenersCalled === listenersCount && this.callback) {
        this.callback();
      }
    };

    this.event.forEach(async (listener) => {
      await listener(eventArg);
      onListenerCalled();
    });
  }
}
