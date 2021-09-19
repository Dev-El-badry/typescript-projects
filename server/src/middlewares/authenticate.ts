import {Request, Response, NextFunction} from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const loggedIn = req.session?.loggedIn;
  
  if(!loggedIn) {
    res.send('not allowed to be here');
    return;
  }
  next();
}