import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './metadataKeys';
import { Methods } from './methods';

interface RouteHandleDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routerBinder(method: Methods) {
  return function(path: string) {
    return function(target: any, key: any, desc: RouteHandleDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    }
  }
}

export const get = routerBinder(Methods.get);
export const post = routerBinder(Methods.post);
export const del = routerBinder(Methods.del);
export const put = routerBinder(Methods.put);
export const patch = routerBinder(Methods.patch);
