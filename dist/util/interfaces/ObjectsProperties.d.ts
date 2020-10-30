import ObjectPropertyEntry from "./ObjectPropertyEntry";
export declare type ObjectsProperties<TProto extends Object, TActual extends Object> = Set<ObjectPropertyEntry<TProto, TActual, keyof TProto & keyof TActual>>;
export default ObjectsProperties;
