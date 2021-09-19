import {View} from '../View';
import {User, UserProps} from '../../models/User';

export class UserForm extends View<User, UserProps> {

  eventsMap(): {[key: string]: () => void} {
    return {
      'click:.btn-save': this.saveUser,
      'click:.btn-random': this.setRandomAge,
      'click:.btn-update-name': this.updateName
    }
  }

  setRandomAge = (): void => {
    this.model.randomAge();
  }
  
  updateName = (): void => {
    const input = this.parent.querySelector('input');
    if(input) {
      const name = input.value;
      this.model.set({name});
    }
  }

  saveUser = (): void => {
    const input = this.parent.querySelector('input');
    if(input) {
      const name = input.value;
      this.model.set({name});
      this.model.save();
    }
  }

  template(): string{
    return `
      <div>
        <label>username</label>
        <input placeholder="sam" />

        <button class="btn-update-name">update name</button>
        <button class="btn-random">Set random age</button>
        
        <button class="btn-save">Save</button>
      </div>
    `
  }
}