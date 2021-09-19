import {NextFunction, Request, Response} from 'express';
import {get, controller, post, use, bodyValidator} from '../decorators';
import { authenticate } from '../middlewares/authenticate';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('hi there');
  next();
  return;
}



@controller('/auth')
export class LoginController {

  @get('/login')
  @use(logger)
  showLogin(req: Request, res: Response) {
    res.send(
      `
        <div>
          <h2>Login page</h2>
  
          <form method="POST">
            <div>
              <label>E-mail:</label>
              <input name="email" type="email" />
            </div>
  
            <div>
              <label>password</label>
              <input name="password" type="password" />
            </div>
  
            <button type="submit">Submit</button>
          </form>
        </div>
      `
    )
  }

  @post('/login')
  @bodyValidator('email', 'password')
  loginUser(req: Request, res: Response) {
    const {email, password} = req.body;
    req.session = {loggedIn: true};
    res.redirect('/protected');
  }

  @post('/logout')
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }

}