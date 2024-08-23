export function TryCatch(errMsg: string): MethodDecorator {
  return function (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalFunc = descriptor.value;

    if (typeof originalFunc !== 'function') {
      throw new TypeError('Decorated property must be a method.');
    }

    descriptor.value = async function (...args: unknown[]) {
      try {
        return await originalFunc.apply(this, args);
      } catch (error: any) {
        if (error instanceof Error) {
          console.error(`Error in ${originalFunc.name}: ${error.message}`);
          throw error;
        } else if (error?.status && error?.message) {
          console.error(error.message);
          throw error;
        }

        throw new Error(errMsg);
      }
    };

    return descriptor;
  };
}
