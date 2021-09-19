import express from 'express';
import cookieSession from 'cookie-session';


import './controllers/LoginController';
import './controllers/RootController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(express.urlencoded({extended: true}));

app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({keys: ['key']}));

app.get('/', (req, res) => {
  res.send(`
  <h1>Home page</h1>

  <a href="/auth/login">login</a>
  `);
})

app.use(AppRouter.getInstance());

app.listen(5050, () => {
  console.log('server running at http://localhost:5050');
});