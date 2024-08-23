import { Router } from 'express';

export interface IGenericExpressRouter {
  resourceName: string;

  getRouterObj(): Router;

  middleware(): void;

  enable(): void;

  errorHandler(): void;
}
