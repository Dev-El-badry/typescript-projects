export type Callback = () => void;

export class Eventing {
  events: {[key: string]: Callback[]} = {};
  constructor() {}

  on = (eventName: string, callback: Callback): void =>  {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    if(Object.keys(this.events).length < 1 ) {
      return;
    }
    if(!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(cb => {
      cb();
    });
  }
}