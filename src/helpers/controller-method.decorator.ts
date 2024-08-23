import { Response } from 'express';
import { isNull } from 'lodash';

export function ControllerMethod({
  okHttp = 200,
  errMsg = 'Server Error'
}: {
  okHttp?: number;
  errMsg?: string;
  entityName?: string;
}): MethodDecorator {
  return function (_target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalFunc = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const res: Response = args[1] as Response;
      // const nextFunc: NextFunction = args[2] as NextFunction

      console.log(
        `Start ${propertyKey.toString()} function`,
        `from ${this.constructor.name}.${propertyKey.toString()}`
      );

      try {
        const result = await originalFunc.apply(this, args);

        if (isNull(result) || res.headersSent) return;

        !res.statusCode && res.status(okHttp);

        res.send(result);
      } catch (error: any) {
        if (error.status && error.message) {
          console.error(error.message);
          res.status(error.status).send(error.message);
        } else {
          res.status(500).send(errMsg);
        }
      }

      console.log(`End ${propertyKey.toString()} function\n`);
    };
  };
}
