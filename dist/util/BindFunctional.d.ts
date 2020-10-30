import ObjectHelper from "./ObjectHelper";
/**
 * returns a property descriptor which gets getters and setters with to "this" bound functions.
 * Property has to be a function
 * @param propertyKey
 * @param descriptor
 * @param objHelper
 */
export declare function getBoundToThisDescriptor<TFnc extends Function>(propertyKey: string, descriptor: TypedPropertyDescriptor<TFnc>, objHelper?: ObjectHelper): TypedPropertyDescriptor<TFnc>;
/**
 * YOU WILL MOST LIKELY PREFER @see {doBindPrototype}
 * Use as function in constructor and bind all functions to this. (This will only bind methods inside this class and CANT to be reused in inherited classes)
 * @param objHelper
 * @deprecated
 */
export declare function doBindToClass(self: any, objHelper?: ObjectHelper): void;
/**
 * Use as function in constructor and bind all functions to this. (This will only bind methods inside this class and need to be called for inherited classes, too)
 * e.g.
 * "doBindPrototype(this, [ClassOfThis].prototype)"
 * "doBindPrototype(this, [BaseClassOfThis].prototype)"
 * @param target
 * @param prototypeToBeBound Prototype of target (can be class Classsname {} => Classsname.prototype)
 * @param objHelper
 */
export declare function doBindPrototype<TProto, TTarget extends TProto & object>(target: TTarget, prototypeToBeBound: TProto, objHelper?: ObjectHelper): void;
