import { Eventing } from "./Eventing";

import axios, {AxiosResponse} from 'axios';
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    private rootUrl: string,
    private deserialized: (json: K) => T 
    ) {}

  get trigger() {
    return this.events.trigger;
  }

  get on() {
    return this.events.on;
  }

  fetch(): void {
    axios.get(this.rootUrl).then(
      (res: AxiosResponse) => {
        const {data} = res;
        data.forEach((record: K) => {
          const user = this.deserialized(record);
          this.models.push(user);
        });
        this.trigger('fetch');
      }
    )
  }
}