import { NextFunction, Request, Response, Router } from 'express';

export abstract class GenericRouter {
  constructor(
    public readonly resourceName: string,
    protected readonly expressRouter: Router
  ) {}

  getRouterObj(): Router {
    console.log(`Router ${this.resourceName} connected`);
    return this.expressRouter;
  }

  middleware() {
    this.expressRouter.use((_req, _res, next: NextFunction) => {
      console.log(this.resourceName, 'Router has been called');
      next();
    });
  }

  errorHandler() {
    this.expressRouter.use((err: unknown, _req: Request, res: Response) => {
      res.status(500).json(err);
    });
  }
}
