import 'reflect-metadata';
import { MetadataKeys } from './metadataKeys';
import { AppRouter } from '../AppRouter';
import { Methods } from './methods';
import {Request, Response, NextFunction} from 'express';

function bodyValidator(keys: string) {
  return function(req: Request, res: Response, next: NextFunction) {
    if(!req.body) {
      res.status(422).send('invalid request');
      return;
    }

    for(let key of keys) {
      if(!req.body[key]) {
        res.status(422).send(`missed property ${req.body[key]}`);
        return;
      }
    }

    next();
  }
} 

export function controller(routerPrefix: string) {
  return function(target: Function) {
    for(let key in target.prototype) {
      const routerHandler =  target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key); 
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requireBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
      const validator = bodyValidator(requireBodyProps);
      if(path) {
        AppRouter.getInstance()[method](`${routerPrefix}${path}`, ...middlewares, validator, routerHandler);
      }
    }
  }
}