/* eslint-disable @typescript-eslint/ban-types */

import ObjectsProperties from "./interfaces/ObjectsProperties";
import ObjectPropertyEntry from "./interfaces/ObjectPropertyEntry";

export class ObjectHelper {
    constructor() {
        this.getKeys = this.getKeys.bind(this);
        this.isObjectKey = this.isObjectKey.bind(this);
        this.getPropertyDescriptor = this.getPropertyDescriptor.bind(this);
        this.isObjectsFunction = this.isObjectsFunction.bind(this);
        this.isFunctionDescriptor = this.isFunctionDescriptor.bind(this);
        this.isDefinedKey = this.isDefinedKey.bind(this);
        this.isDefinedKeyOfObject = this.isDefinedKeyOfObject.bind(this);
    }

    getKeys<T extends Object>(
        me: T,
        includeNestedKeys = true
    ): ObjectsProperties<Object, T> {
        const keys = new Set<
            ObjectPropertyEntry<Object, T, keyof Object & keyof T>
        >();
        let current: T | object = me;
        while (
            current !== Object.prototype &&
            (includeNestedKeys || current === me)
        ) {
            for (const key of Reflect.ownKeys(current)) {
                keys.add({
                    objectOrPrototype: current,
                    propertyKey: key as keyof Object & keyof T,
                });
            }
            current = Reflect.getPrototypeOf(current);
        }
        return keys;
    }

    isDefinedKeyOfObject<T, TKey extends keyof T>(
        obj: T,
        propertyName: TKey
    ): propertyName is TKey {
        return propertyName in obj;
    }

    /**
     * @see {isDefinedKeyOfObject} if you want to have typescript intellisense and you know already, that it will be a valid property name
     * @param obj
     * @param propertyName
     */
    isDefinedKey<T, TKey extends keyof T>(
        obj: T,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        propertyName: any
    ): propertyName is TKey {
        return this.isObjectKey(propertyName) && propertyName in obj;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isObjectKey(propertyName: any): propertyName is string | number | symbol {
        if (
            typeof propertyName !== "string" &&
            typeof propertyName !== "number" &&
            typeof propertyName !== "symbol"
        ) {
            return false;
        }
        return propertyName !== "";
    }

    getPropertyDescriptor<T extends Object, TKey extends keyof T>(
        objectOrPrototype: T,
        propertyKey: TKey
    ): PropertyDescriptor | undefined {
        const dscptr = Reflect.getOwnPropertyDescriptor(
            objectOrPrototype,
            propertyKey
        );
        return dscptr;
    }

    isObjectsFunction<T extends Object, TKey extends keyof T>(
        objectOrPrototype: T,
        actualObject: T,
        propertyKey: TKey,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        propertyValue: any
    ): propertyValue is Function {
        if (
            !objectOrPrototype ||
            typeof objectOrPrototype !== "object" ||
            !this.isObjectKey(propertyKey)
        ) {
            return false;
        }

        const dscptr = this.getPropertyDescriptor(
            objectOrPrototype,
            propertyKey
        );
        return (
            actualObject[propertyKey] === propertyValue &&
            this.isFunctionDescriptor(dscptr)
        );
    }

    isFunctionDescriptor(
        descriptor: PropertyDescriptor | undefined
    ): descriptor is PropertyDescriptor & { value: Function } {
        const { value } = descriptor || {};
        return value && typeof value === "function";
    }

    /**
     * defines a property bound to this, which can be returned by a getter inside a property descriptor
     * @param target 
     * @param propertyKey 
     * @param descriptor 
     * @param valueToBeBound 
     */
    createBoundValue<TTarget extends Object, T extends Function>(
        target: TTarget,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<T> | undefined,
        valueToBeBound: T
    ): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { value: v, writable, ...rest } = descriptor || {};
        Object.defineProperty(target, propertyKey, {
            ...(rest || { configurable: true, enumerable: false }),
            value: valueToBeBound.bind(target),
        });
    }
}

export default ObjectHelper;
