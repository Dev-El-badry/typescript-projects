import { AxiosPromise } from "axios";
import { Callback } from "./Eventing";
import {AxiosResponse} from 'axios';

interface SyncApi<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(data: T): void;
  getAll(): T;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private sync: SyncApi<T>,
    private attributes: ModelAttributes<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T) {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.get("id");
    if(typeof id !== 'number') {
      throw new Error('cannot fetch without an id');
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save() {
    const data = this.attributes.getAll();
    
    this.sync.save(data).then((response: AxiosResponse) => {
      this.trigger('save');
    }).catch(err => {
      this.trigger('error');
    })
  }
}