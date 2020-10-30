"use strict";
/* eslint-disable @typescript-eslint/ban-types */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectHelper = /** @class */ (function () {
    function ObjectHelper() {
        this.getKeys = this.getKeys.bind(this);
        this.isObjectKey = this.isObjectKey.bind(this);
        this.getPropertyDescriptor = this.getPropertyDescriptor.bind(this);
        this.isObjectsFunction = this.isObjectsFunction.bind(this);
        this.isFunctionDescriptor = this.isFunctionDescriptor.bind(this);
        this.isDefinedKey = this.isDefinedKey.bind(this);
        this.isDefinedKeyOfObject = this.isDefinedKeyOfObject.bind(this);
    }
    ObjectHelper.prototype.getKeys = function (me, includeNestedKeys) {
        if (includeNestedKeys === void 0) { includeNestedKeys = true; }
        var keys = new Set();
        var current = me;
        while (current !== Object.prototype &&
            (includeNestedKeys || current === me)) {
            for (var _i = 0, _a = Reflect.ownKeys(current); _i < _a.length; _i++) {
                var key = _a[_i];
                keys.add({
                    objectOrPrototype: current,
                    propertyKey: key,
                });
            }
            current = Reflect.getPrototypeOf(current);
        }
        return keys;
    };
    ObjectHelper.prototype.isDefinedKeyOfObject = function (obj, propertyName) {
        return propertyName in obj;
    };
    /**
     * @see {isDefinedKeyOfObject} if you want to have typescript intellisense and you know already, that it will be a valid property name
     * @param obj
     * @param propertyName
     */
    ObjectHelper.prototype.isDefinedKey = function (obj, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propertyName) {
        return this.isObjectKey(propertyName) && propertyName in obj;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ObjectHelper.prototype.isObjectKey = function (propertyName) {
        if (typeof propertyName !== "string" &&
            typeof propertyName !== "number" &&
            typeof propertyName !== "symbol") {
            return false;
        }
        return propertyName !== "";
    };
    ObjectHelper.prototype.getPropertyDescriptor = function (objectOrPrototype, propertyKey) {
        var dscptr = Reflect.getOwnPropertyDescriptor(objectOrPrototype, propertyKey);
        return dscptr;
    };
    ObjectHelper.prototype.isObjectsFunction = function (objectOrPrototype, actualObject, propertyKey, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propertyValue) {
        if (!objectOrPrototype ||
            typeof objectOrPrototype !== "object" ||
            !this.isObjectKey(propertyKey)) {
            return false;
        }
        var dscptr = this.getPropertyDescriptor(objectOrPrototype, propertyKey);
        return (actualObject[propertyKey] === propertyValue &&
            this.isFunctionDescriptor(dscptr));
    };
    ObjectHelper.prototype.isFunctionDescriptor = function (descriptor) {
        var value = (descriptor || {}).value;
        return value && typeof value === "function";
    };
    /**
     * defines a property bound to this, which can be returned by a getter inside a property descriptor
     * @param target
     * @param propertyKey
     * @param descriptor
     * @param valueToBeBound
     */
    ObjectHelper.prototype.createBoundValue = function (target, propertyKey, descriptor, valueToBeBound) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var _a = descriptor || {}, v = _a.value, writable = _a.writable, rest = __rest(_a, ["value", "writable"]);
        Object.defineProperty(target, propertyKey, __assign(__assign({}, (rest || { configurable: true, enumerable: false })), { value: valueToBeBound.bind(target) }));
    };
    return ObjectHelper;
}());
exports.ObjectHelper = ObjectHelper;
exports.default = ObjectHelper;
