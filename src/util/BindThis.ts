import ObjectHelper from "./ObjectHelper";
import { getBoundToThisDescriptor } from "./BindFunctional";

/* eslint-disable @typescript-eslint/ban-types */
const bindClasses = new Map<
    Object,
    {
        flaggedAsBindToThis: TypedPropertyDescriptor<any>[];
    }
>();

const getBoundClasses: () => Readonly<typeof bindClasses> = () => bindClasses;

/**
 * flags a property for bind to this.
 * binding will be done by calling [bindFunctions]{@link bindFunctions}
 */
export function FlagForBinding() {
    return function <
        T,
        // eslint-disable-next-line @typescript-eslint/ban-types
        TTarget extends Object
    >(
        target: TTarget,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void {
        if (!bindClasses.has(target)) {
            bindClasses.set(target, {
                flaggedAsBindToThis: [descriptor],
            });
        } else {
            bindClasses.get(target)?.flaggedAsBindToThis.push(descriptor);
        }
        return descriptor;
    };
}

// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * Binds decorated Method to this (no need to .bind(this) in constructor any more)
 * @param objHelper
 */
export function BindToThis(objHelper: ObjectHelper = new ObjectHelper()) {
    return function <TTarget extends Object, TFnc extends Function>(
        target: TTarget,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<TFnc>
    ): TypedPropertyDescriptor<TFnc> | void {
        return getBoundToThisDescriptor(propertyKey, descriptor);
    };
}

/**
 * Use in constructor. This Method will bind all marked functions of "self".
 * Mark them with @see {@FlagForBinding}
 * @param self parameter who will be binded by .bind(self)
 * @param objHelper
 */
export function bindFunctions<T extends Object>(
    self: T,
    objHelper: ObjectHelper = new ObjectHelper()
): void {
    const me: T | undefined = self;
    if (!me || typeof me !== "object") {
        throw new Error(
            "Failed to bind functions: No object has been passed. This is also falsy."
        );
    }

    const keys = objHelper.getKeys(me);
    const bndClzzs = getBoundClasses();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
    keys.forEach((value /*, value2, set*/) => {
        const { objectOrPrototype, propertyKey } = value;
        const { flaggedAsBindToThis } = bndClzzs.get(objectOrPrototype) || {};

        const descriptor = objHelper.getPropertyDescriptor(
            objectOrPrototype,
            propertyKey
        );
        const property = me[propertyKey];

        const isInFlaggedFunctions =
            descriptor &&
            (flaggedAsBindToThis?.filter(
                (tbf) => tbf.value === descriptor.value
            ).length ?? 0) > 0;

        if (
            isInFlaggedFunctions &&
            objHelper.isObjectsFunction(
                objectOrPrototype,
                me,
                propertyKey,
                property
            )
        ) {
            me[propertyKey] = me[propertyKey].bind(me);
        }
    });
}

// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * Use as decorator and bind all functions to this. (This will only bind methods inside this class and need to be reused in inherited classes)
 * @param objHelper
 */
export function BindToClass(
    objHelper: ObjectHelper = new ObjectHelper()
): ClassDecorator {
    return function <TFnc extends Function>(target: TFnc): TFnc | void {
        // Value + Accessors must not be set, when we add a getter
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {} = target;

        const keys = objHelper.getKeys(target.prototype, false);
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
                // target.prototype.

                Object.defineProperty(
                    target.prototype,
                    propertyKey,
                    getBoundToThisDescriptor(propertyKey, descriptor)
                );

                // target[] =getBoundToThisDescriptor

                //       objHelper.createBoundValue(
                //           this as any,
                //           propertyKey,
                //           descriptor,
                //           value
                //       );
            }
            // const property = me[propertyKey];

            // const isInFlaggedFunctions =
            //     descriptor &&
            //     (flaggedAsBindToThis?.filter(
            //         (tbf) => tbf.value === descriptor.value
            //     ).length ?? 0) > 0;

            // if (
            //     isInFlaggedFunctions &&
            //     objHelper.isObjectsFunction(
            //         objectOrPrototype,
            //         me,
            //         propertyKey,
            //         property
            //     )
            // ) {
            //     me[propertyKey] = me[propertyKey].bind(me);
            // }
        });
    };
}
