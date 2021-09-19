import { User, UserProps } from "../../models/User";
import {View} from '../View';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <h2>User Details</h2>
        <h3>User name: ${this.model.get('name')}</h3>
        <h3>Age: ${this.model.get('age')}</h3>
      </div>
    `
  }
}