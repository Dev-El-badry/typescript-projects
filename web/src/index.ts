import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserList } from "./views/users/UserList";

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json);
});

users.on('fetch', () => {
  const root = document.getElementById('app');
  if(root) {
    new UserList(root, users).render();
  }
});

users.fetch();