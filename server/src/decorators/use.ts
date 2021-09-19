import 'reflect-metadata';
import { RequestHandler } from "express";
import { MetadataKeys } from './metadataKeys';

export function use(middleware: RequestHandler) {
  return function(target: any, key: any, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
  }
}