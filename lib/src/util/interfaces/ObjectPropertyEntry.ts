/* eslint-disable @typescript-eslint/ban-types */
export type ObjectPropertyEntry<
    TProto extends Object,
    TActual extends Object,
    TKey extends keyof TActual & keyof TProto
> = {
    propertyKey: TKey;
    objectOrPrototype: TActual | TProto;
};

export default ObjectPropertyEntry;
