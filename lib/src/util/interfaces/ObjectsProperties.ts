/* eslint-disable @typescript-eslint/ban-types */
import ObjectPropertyEntry from "./ObjectPropertyEntry";

export type ObjectsProperties<
    TProto extends Object,
    TActual extends Object
> = Set<ObjectPropertyEntry<TProto, TActual, keyof TProto & keyof TActual>>;

export default ObjectsProperties;
