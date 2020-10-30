"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BindThis_1 = require("./BindThis");
var StringHelper_1 = __importDefault(require("./StringHelper"));
var PathHelper = /** @class */ (function () {
    function PathHelper(_stringHelper) {
        if (_stringHelper === void 0) { _stringHelper = new StringHelper_1.default(); }
        this._stringHelper = _stringHelper;
    }
    PathHelper.prototype.isValidPathFragment = function (fragment) {
        return ((typeof fragment === "string" && fragment !== "") ||
            typeof fragment === "number");
    };
    PathHelper.prototype.createPath = function () {
        var _this = this;
        var pathFragments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathFragments[_i] = arguments[_i];
        }
        if (pathFragments.length === 0) {
            throw new Error("Failed to create path. No fragments has been passed.");
        }
        var rootFragment = pathFragments[0], rest = pathFragments.slice(1);
        var base = this.isValidPathFragment(rootFragment)
            ? rootFragment + ""
            : undefined;
        if (rest.length === 0) {
            return typeof base === "string" ? base : "";
        }
        var isEmptyRoot = typeof base !== "string";
        var validPathsRest = rest
            .filter(function (r, i) {
            return _this.isValidPathFragment(r) &&
                (typeof r === "number" ||
                    _this._stringHelper.trimStart(r, "/") !== "" ||
                    (i === rest.length - 1 && r !== ""));
        })
            .map(function (p) { return p + ""; });
        var lastValidPathIsSlash = validPathsRest.length > 0 &&
            validPathsRest[validPathsRest.length - 1].lastIndexOf("/") ===
                validPathsRest[validPathsRest.length - 1].length - 1;
        if (!isEmptyRoot && typeof base === "string") {
            return __spreadArrays([
                this._stringHelper.trimEnd(base, "/")
            ], validPathsRest.map(function (vp) {
                return _this._stringHelper.trimStart(vp, "/");
            })).join("/");
        }
        else {
            return __spreadArrays(validPathsRest.map(function (vp) {
                return _this._stringHelper.trimStart(vp, "/");
            })).join("/");
        }
    };
    PathHelper = __decorate([
        BindThis_1.BindToClass(),
        __metadata("design:paramtypes", [StringHelper_1.default])
    ], PathHelper);
    return PathHelper;
}());
exports.PathHelper = PathHelper;
exports.default = PathHelper;
