"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectHelper_1 = __importDefault(require("./ObjectHelper"));
// import log from "loglevel";
/**
 * returns a property descriptor which gets getters and setters with to "this" bound functions.
 * Property has to be a function
 * @param propertyKey
 * @param descriptor
 * @param objHelper
 */
function getBoundToThisDescriptor(propertyKey, descriptor, objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    // Value + Accessors must not be set, when we add a getter
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var value = descriptor.value, writable = descriptor.writable, rest = __rest(descriptor, ["value", "writable"]);
    return descriptor && value
        ? __assign(__assign({}, rest), { get: function () {
                objHelper.createBoundValue(this, propertyKey, descriptor, value);
                return this[propertyKey];
            },
            set: function () {
                throw new Error("Do not reassign fields");
            } }) : __assign(__assign({}, rest), { set: function (v) {
            // as seen at mobX => not sure if this is really reasonable
            // https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
            // LICENSE: https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/LICENSE
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            objHelper.createBoundValue(this, propertyKey, descriptor, v);
        },
        get: function () {
            return undefined;
        } });
}
exports.getBoundToThisDescriptor = getBoundToThisDescriptor;
// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * YOU WILL MOST LIKELY PREFER @see {doBindPrototype}
 * Use as function in constructor and bind all functions to this. (This will only bind methods inside this class and CANT to be reused in inherited classes)
 * @param objHelper
 * @deprecated
 */
function doBindToClass(self, objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const target = this;
    var keys = objHelper.getKeys(Reflect.getPrototypeOf(self), false);
    // console.log(keys)
    keys.forEach(function (value /*, value2, set*/) {
        var objectOrPrototype = value.objectOrPrototype, propertyKey = value.propertyKey;
        var descriptor = objHelper.getPropertyDescriptor(objectOrPrototype, propertyKey);
        if (propertyKey !== "constructor" &&
            objHelper.isFunctionDescriptor(descriptor)) {
            Object.defineProperty(Reflect.getPrototypeOf(self), propertyKey, getBoundToThisDescriptor(propertyKey, descriptor));
            // console.log(propertyKey)
            // self[propertyKey] = self[propertyKey].bind(self)
        }
    });
}
exports.doBindToClass = doBindToClass;
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
function doBindPrototype(target, prototypeToBeBound, objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const target = this;
    var keys = objHelper.getKeys(prototypeToBeBound, false);
    keys.forEach(function (value /*, value2, set*/) {
        var objectOrPrototype = value.objectOrPrototype, propertyKey = value.propertyKey;
        var descriptor = objHelper.getPropertyDescriptor(objectOrPrototype, propertyKey);
        if (propertyKey !== "constructor" &&
            objHelper.isFunctionDescriptor(descriptor)) {
            Object.defineProperty(Reflect.getPrototypeOf(target), propertyKey, getBoundToThisDescriptor(propertyKey, descriptor));
            // console.log(propertyKey)
            // self[propertyKey] = self[propertyKey].bind(self)
        }
    });
}
exports.doBindPrototype = doBindPrototype;
