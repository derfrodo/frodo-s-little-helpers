"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BindThis_1 = require("./BindThis");
var guid_typescript_1 = require("guid-typescript");
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    /**
     * trims string. Whitespaces at start and end will be trimmed
     * @param value
     */
    StringHelper.prototype.trimWhitspaces = function (value) {
        return this.trim(value, undefined);
    };
    /**
     * trims string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    StringHelper.prototype.trim = function (value, pattern) {
        return this.trimStart(this.trimEnd(value, pattern), pattern);
    };
    /**
     * trims start of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    StringHelper.prototype.trimStart = function (value, pattern) {
        var result = value;
        if (pattern === "" ||
            pattern === undefined ||
            pattern instanceof RegExp) {
            var searchPattern = pattern || /\s/;
            var match = searchPattern.exec(result);
            while (result && match && match.length > 0 && match.index === 0) {
                result = result.substring(match[0].length);
                match = searchPattern.exec(result);
            }
            return result;
        }
        else if (typeof pattern === "string") {
            while (!!result && result.indexOf(pattern) === 0) {
                result = result.substring(pattern.length);
            }
            return result;
        }
        throw Error("Type of pattern is invalid: Please use only RegExp or string. Type is \"" + typeof pattern + "\".");
    };
    StringHelper.prototype.findLastMatch = function (value, pattern) {
        if (!pattern.global) {
            throw new Error("Can not find last match: Global flag has to be set!");
        }
        var interValue = value;
        // say "or" to adress iterations (?) Seems to work fine :)
        var lastMatch = pattern.exec(interValue) || pattern.exec(interValue);
        var result = lastMatch;
        while (lastMatch &&
            lastMatch.length > 0 &&
            lastMatch.index <= interValue.length - lastMatch[0].length) {
            result = lastMatch;
            if (interValue && interValue.length === lastMatch.index + 1) {
                break;
            }
            else if (interValue) {
                // interValue = interValue.substr(lastMatch.index + 1);
                lastMatch = pattern.exec(interValue);
            }
        }
        return result;
    };
    /**
     * trims end of string => if no pattern has been passed, whitespaces will be trimmed
     * @param value
     * @param pattern
     */
    StringHelper.prototype.trimEnd = function (value, pattern) {
        var result = value;
        if (pattern === "" ||
            pattern === undefined ||
            pattern instanceof RegExp) {
            var searchPattern = pattern || /\s/g;
            var match = this.findLastMatch(result, searchPattern);
            while (result &&
                match &&
                match.length > 0 &&
                match.index === result.length - match[0].length) {
                result = result.substring(0, result.length - match[0].length);
                match = this.findLastMatch(result, searchPattern);
            }
            return result;
        }
        else if (typeof pattern === "string") {
            while (!!result &&
                result.lastIndexOf(pattern) === result.length - pattern.length) {
                result = result.substring(0, result.length - pattern.length);
            }
            return result;
        }
        throw Error("Type of pattern is invalid: Please use only RegExp or string. Type is \"" + typeof pattern + "\".");
    };
    /**
     * Combines with "" as separator
     * @param parts will not include null or undefined in resulting string
     */
    StringHelper.prototype.combine = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        return parts.filter(function (p) { return p !== undefined && p !== null; }).join("");
    };
    StringHelper.prototype.toUpperCasedWithUnderscore = function (camelCasedString) {
        if (typeof camelCasedString !== "string") {
            return camelCasedString;
        }
        if (camelCasedString.indexOf("_") >= 0) {
            throw new Error('Failed to transform to UPPER_CASED_SNAKE_CASE. Parameter must not contain "_"');
        }
        return (camelCasedString
            .replace(/([a-z_])([A-Z]+)/g, function (mtch) { return mtch[0] + "_" + mtch.substr(1).toUpperCase(); })
            // .replace(/(?<!^)[A-Z]+/g, (mtch) => `_${mtch.toLowerCase()}`)
            .toUpperCase());
    };
    StringHelper.prototype.toPascalCased = function (camelCasedString) {
        if (typeof camelCasedString !== "string") {
            return camelCasedString;
        }
        if (camelCasedString.indexOf("_") >= 0) {
            throw new Error('Failed to transform to PascalCased (yet...). Parameter must not contain "_"');
        }
        return camelCasedString.length === 0
            ? camelCasedString
            : "" + camelCasedString.substring(0, 1).toUpperCase() + (camelCasedString.length > 1
                ? camelCasedString.substring(1)
                : "");
        // this return was used in the last patch version,
        // but had lead to some issues with safari and firefox browsers due to
        // the group elements within the regex pattern
        // return camelCasedString.replace(/(?:^)[a-z]{1}/, (mtch) =>
        //     mtch.toUpperCase()
        // );
    };
    StringHelper.prototype.toCamelCased = function (PascalCasedString) {
        if (typeof PascalCasedString !== "string") {
            return PascalCasedString;
        }
        if (PascalCasedString.indexOf("_") >= 0) {
            throw new Error('Failed to transform to camelCased (yet...). Parameter must not contain "_"');
        }
        return PascalCasedString.length === 0
            ? PascalCasedString
            : "" + PascalCasedString.substring(0, 1).toLowerCase() + (PascalCasedString.length > 1
                ? PascalCasedString.substring(1)
                : "");
        // this return was used in the last patch version,
        // but had lead to some issues with safari and firefox browsers due to
        // the group elements within the regex pattern
        // return PascalCasedString.replace(/(?:^)[A-Z]{1}/g, (mtch) =>
        //     mtch.toLowerCase()
        // );
    };
    StringHelper.prototype.createGuid = function () {
        return guid_typescript_1.Guid.create().toString();
    };
    StringHelper.prototype.createGuidString = function () {
        return guid_typescript_1.Guid.create().toString();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StringHelper.prototype.isNonEmptyGuid = function (possibleGuid) {
        try {
            var parsedGuid = guid_typescript_1.Guid.isGuid(possibleGuid) && typeof possibleGuid !== "string"
                ? possibleGuid
                : guid_typescript_1.Guid.parse(possibleGuid);
            return !parsedGuid.isEmpty() && guid_typescript_1.Guid.isGuid(parsedGuid);
        }
        catch (err) {
            return false;
        }
    };
    StringHelper.prototype.isTypescriptGuid = function (possibleGuid) {
        try {
            return (typeof possibleGuid !== "string" && guid_typescript_1.Guid.isGuid(possibleGuid));
        }
        catch (err) {
            return false;
        }
    };
    StringHelper.prototype.asGuid = function (possibleGuid) {
        if (this.isTypescriptGuid(possibleGuid)) {
            return possibleGuid;
        }
        return guid_typescript_1.Guid.parse(possibleGuid);
    };
    StringHelper.prototype.isEqualGuids = function (guid1, guid2) {
        var g1 = this.asGuid(guid1);
        var g2 = this.asGuid(guid2);
        return g1.equals(g2);
    };
    StringHelper.prototype.joinCssClasses = function () {
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        return this.joinStringsAndNumbers(classNames, " ");
    };
    /**
     * Joines given strings and numbers into a string connected by separator
     * parts which are no numbers or strings will be ignored. Also empty strings will be ignored and skipped
     * @param parts
     * @param separator
     */
    StringHelper.prototype.joinStringsAndNumbers = function (parts, separator) {
        if (separator === void 0) { separator = ","; }
        return (parts || [])
            .filter(function (cn) {
            return (typeof cn === "string" && cn !== "") ||
                typeof cn === "number";
        })
            .join(separator);
    };
    StringHelper = __decorate([
        BindThis_1.BindToClass()
    ], StringHelper);
    return StringHelper;
}());
exports.StringHelper = StringHelper;
exports.default = StringHelper;
