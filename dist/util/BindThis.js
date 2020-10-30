"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectHelper_1 = __importDefault(require("./ObjectHelper"));
var BindFunctional_1 = require("./BindFunctional");
/* eslint-disable @typescript-eslint/ban-types */
var bindClasses = new Map();
var getBoundClasses = function () { return bindClasses; };
/**
 * flags a property for bind to this.
 * binding will be done by calling [bindFunctions]{@link bindFunctions}
 */
function FlagForBinding() {
    return function (target, propertyKey, descriptor) {
        var _a;
        if (!bindClasses.has(target)) {
            bindClasses.set(target, {
                flaggedAsBindToThis: [descriptor],
            });
        }
        else {
            (_a = bindClasses.get(target)) === null || _a === void 0 ? void 0 : _a.flaggedAsBindToThis.push(descriptor);
        }
        return descriptor;
    };
}
exports.FlagForBinding = FlagForBinding;
// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * Binds decorated Method to this (no need to .bind(this) in constructor any more)
 * @param objHelper
 */
function BindToThis(objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    return function (target, propertyKey, descriptor) {
        return BindFunctional_1.getBoundToThisDescriptor(propertyKey, descriptor);
    };
}
exports.BindToThis = BindToThis;
/**
 * Use in constructor. This Method will bind all marked functions of "self".
 * Mark them with @see {@FlagForBinding}
 * @param self parameter who will be binded by .bind(self)
 * @param objHelper
 */
function bindFunctions(self, objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    var me = self;
    if (!me || typeof me !== "object") {
        throw new Error("Failed to bind functions: No object has been passed. This is also falsy.");
    }
    var keys = objHelper.getKeys(me);
    var bndClzzs = getBoundClasses();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
    keys.forEach(function (value /*, value2, set*/) {
        var _a;
        var objectOrPrototype = value.objectOrPrototype, propertyKey = value.propertyKey;
        var flaggedAsBindToThis = (bndClzzs.get(objectOrPrototype) || {}).flaggedAsBindToThis;
        var descriptor = objHelper.getPropertyDescriptor(objectOrPrototype, propertyKey);
        var property = me[propertyKey];
        var isInFlaggedFunctions = descriptor &&
            ((_a = flaggedAsBindToThis === null || flaggedAsBindToThis === void 0 ? void 0 : flaggedAsBindToThis.filter(function (tbf) { return tbf.value === descriptor.value; }).length) !== null && _a !== void 0 ? _a : 0) > 0;
        if (isInFlaggedFunctions &&
            objHelper.isObjectsFunction(objectOrPrototype, me, propertyKey, property)) {
            me[propertyKey] = me[propertyKey].bind(me);
        }
    });
}
exports.bindFunctions = bindFunctions;
// TODO: Have a look at:
// https://github.com/mobxjs/mobx/blob/582a51691ebdbb5b8cd628ee286919a6dafc480c/src/v5/api/actiondecorator.ts
/**
 * Use as decorator and bind all functions to this. (This will only bind methods inside this class and need to be reused in inherited classes)
 * @param objHelper
 */
function BindToClass(objHelper) {
    if (objHelper === void 0) { objHelper = new ObjectHelper_1.default(); }
    return function (target) {
        // Value + Accessors must not be set, when we add a getter
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var _a = target;
        var keys = objHelper.getKeys(target.prototype, false);
        keys.forEach(function (value /*, value2, set*/) {
            var objectOrPrototype = value.objectOrPrototype, propertyKey = value.propertyKey;
            var descriptor = objHelper.getPropertyDescriptor(objectOrPrototype, propertyKey);
            if (propertyKey !== "constructor" &&
                objHelper.isFunctionDescriptor(descriptor)) {
                // target.prototype.
                Object.defineProperty(target.prototype, propertyKey, BindFunctional_1.getBoundToThisDescriptor(propertyKey, descriptor));
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
exports.BindToClass = BindToClass;
