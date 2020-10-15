type Callback = () => void

class EventService {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) {
      return;
    }
    handlers.forEach((callBack: Callback) => callBack());
  }
}

export default EventService;
