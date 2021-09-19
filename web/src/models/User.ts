import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import {Model} from './Model';
import { Sync } from './Sync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Eventing(),
      new Sync(rootUrl),
      new Attributes<UserProps>(attrs)
    )
  }

  randomAge() {
    const randomAge =  Math.round(Math.random() * 100);
    this.set({age: randomAge});
  }
}