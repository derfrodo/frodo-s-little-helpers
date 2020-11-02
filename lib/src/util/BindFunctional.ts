import ObjectHelper from "./ObjectHelper";
// import log from "loglevel";

/**
 * returns a property descriptor which gets getters and setters with to "this" bound functions.
 * Property has to be a function
 * @param propertyKey
 * @param descriptor
 * @param objHelper
 */
export function getBoundToThisDescriptor<TFnc extends Function>(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<TFnc>,
    objHelper: ObjectHelper = new ObjectHelper()
): TypedPropertyDescriptor<TFnc> {
    // Value + Accessors must not be set, when we add a getter
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, writable, ...rest } = descriptor;
    return descriptor && value
        ? {
              ...rest,
              get(): TFnc {
                  objHelper.createBoundValue(
                      this as any,
                      propertyKey,
                      descriptor,
                      value
                  );
                  return (this as any)[propertyKey];
              },
              set(): void {
                  throw new Error("Do not reassign fields");
              },
          }
        : {
              ...rest,
              set(v): void {
                  // as seen at mobX => not sure if this is really reasonable
                  // https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
                  // LICENSE: https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/LICENSE
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  objHelper.createBoundValue(
                      this as any,
                      propertyKey,
                      descriptor,
                      v
                  );
              },
              get(): TFnc {
                  return (undefined as unknown) as TFnc;
              },
          };
}

// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * YOU WILL MOST LIKELY PREFER @see {doBindPrototype}
 * Use as function in constructor and bind all functions to this. (This will only bind methods inside this class and CANT to be reused in inherited classes)
 * @param objHelper
 * @deprecated
 */
export function doBindToClass(
    self: any,
    objHelper: ObjectHelper = new ObjectHelper()
): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const target = this;
    const keys = objHelper.getKeys(Reflect.getPrototypeOf(self), false);
    // console.log(keys)
    keys.forEach((value /*, value2, set*/) => {
        const { objectOrPrototype, propertyKey } = value;

        const descriptor = objHelper.getPropertyDescriptor(
            objectOrPrototype,
            propertyKey
        );

        if (
            propertyKey !== "constructor" &&
            objHelper.isFunctionDescriptor(descriptor)
        ) {
            Object.defineProperty(
                Reflect.getPrototypeOf(self),
                propertyKey,
                getBoundToThisDescriptor(propertyKey, descriptor)
            );
            // console.log(propertyKey)
            // self[propertyKey] = self[propertyKey].bind(self)
        }
    });
}

// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * Use as function in constructor and bind all functions to this. (This will only bind methods inside this class and need to be called for inherited classes, too)
 * e.g.
 * "doBindPrototype(this, [ClassOfThis].prototype)"
 * "doBindPrototype(this, [BaseClassOfThis].prototype)"
 * @param target
 * @param prototypeToBeBound Prototype of target (can be class Classsname {} => Classsname.prototype)
 * @param objHelper
 */
export function doBindPrototype<TProto, TTarget extends TProto & object>(
    target: TTarget,
    prototypeToBeBound: TProto,
    objHelper: ObjectHelper = new ObjectHelper()
): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const target = this;
    const keys = objHelper.getKeys(prototypeToBeBound, false);

    keys.forEach((value /*, value2, set*/) => {
        const { objectOrPrototype, propertyKey } = value;

        const descriptor = objHelper.getPropertyDescriptor(
            objectOrPrototype,
            propertyKey
        );

        if (
            propertyKey !== "constructor" &&
            objHelper.isFunctionDescriptor(descriptor)
        ) {
            Object.defineProperty(
                Reflect.getPrototypeOf(target),
                propertyKey,
                getBoundToThisDescriptor(propertyKey, descriptor)
            );
            // console.log(propertyKey)
            // self[propertyKey] = self[propertyKey].bind(self)
        }
    });
}
