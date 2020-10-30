import ObjectsProperties from "./interfaces/ObjectsProperties";
export declare class ObjectHelper {
    constructor();
    getKeys<T extends Object>(me: T, includeNestedKeys?: boolean): ObjectsProperties<Object, T>;
    isDefinedKeyOfObject<T, TKey extends keyof T>(obj: T, propertyName: TKey): propertyName is TKey;
    /**
     * @see {isDefinedKeyOfObject} if you want to have typescript intellisense and you know already, that it will be a valid property name
     * @param obj
     * @param propertyName
     */
    isDefinedKey<T, TKey extends keyof T>(obj: T, propertyName: any): propertyName is TKey;
    isObjectKey(propertyName: any): propertyName is string | number | symbol;
    getPropertyDescriptor<T extends Object, TKey extends keyof T>(objectOrPrototype: T, propertyKey: TKey): PropertyDescriptor | undefined;
    isObjectsFunction<T extends Object, TKey extends keyof T>(objectOrPrototype: T, actualObject: T, propertyKey: TKey, propertyValue: any): propertyValue is Function;
    isFunctionDescriptor(descriptor: PropertyDescriptor | undefined): descriptor is PropertyDescriptor & {
        value: Function;
    };
    /**
     * defines a property bound to this, which can be returned by a getter inside a property descriptor
     * @param target
     * @param propertyKey
     * @param descriptor
     * @param valueToBeBound
     */
    createBoundValue<TTarget extends Object, T extends Function>(target: TTarget, propertyKey: string, descriptor: TypedPropertyDescriptor<T> | undefined, valueToBeBound: T): void;
}
export default ObjectHelper;
