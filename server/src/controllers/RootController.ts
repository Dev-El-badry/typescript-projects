import { Request, Response } from "express";
import { get, controller, use } from "../decorators";
import { authenticate } from "../middlewares/authenticate";

@controller('')
export class RootController {
  @get('/protected')
  @use(authenticate)
  protected(req: Request, res: Response) {
    res.send(`
      <h3>you allowed to be here</h3>
      <form method="post" action="/auth/logout">
        <button type="submit">logout</button>
      </form>
    `);
  }

  @get('/')
  homePage(req: Request, res: Response) {
    res.send(`
      <h1>Homepage</h1>
      <a href="/auth/login>login</a>
    `)
  }
}