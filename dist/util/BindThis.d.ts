import ObjectHelper from "./ObjectHelper";
/**
 * flags a property for bind to this.
 * binding will be done by calling [bindFunctions]{@link bindFunctions}
 */
export declare function FlagForBinding(): <T, TTarget extends Object>(target: TTarget, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => void | TypedPropertyDescriptor<T>;
/**
 * Binds decorated Method to this (no need to .bind(this) in constructor any more)
 * @param objHelper
 */
export declare function BindToThis(objHelper?: ObjectHelper): <TTarget extends Object, TFnc extends Function>(target: TTarget, propertyKey: string, descriptor: TypedPropertyDescriptor<TFnc>) => void | TypedPropertyDescriptor<TFnc>;
/**
 * Use in constructor. This Method will bind all marked functions of "self".
 * Mark them with @see {@FlagForBinding}
 * @param self parameter who will be binded by .bind(self)
 * @param objHelper
 */
export declare function bindFunctions<T extends Object>(self: T, objHelper?: ObjectHelper): void;
/**
 * Use as decorator and bind all functions to this. (This will only bind methods inside this class and need to be reused in inherited classes)
 * @param objHelper
 */
export declare function BindToClass(objHelper?: ObjectHelper): ClassDecorator;
