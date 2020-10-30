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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var StringHelper_1 = __importDefault(require("./StringHelper"));
var BindThis_1 = require("./BindThis");
var FileSystemHelper = /** @class */ (function () {
    function FileSystemHelper(stringHelper) {
        if (stringHelper === void 0) { stringHelper = new StringHelper_1.default(); }
        this.stringHelper = stringHelper;
    }
    FileSystemHelper.prototype.readFile = function (path, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.isFile(path)) {
                    throw new Error("No file has been passed");
                }
                return [2 /*return*/, fs_extra_1.default.readFile(path, encoding)];
            });
        });
    };
    FileSystemHelper.prototype.writeFile = function (path, content, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeSureParentPathExists(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, fs_extra_1.default.writeFile(path, content, { encoding: encoding, flag: "w" })];
                }
            });
        });
    };
    FileSystemHelper.prototype.makeSureParentPathExists = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var parent, pathsToCreate, _i, _a, pathToCreate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getParentFolderFromFSObjectsPath(path)];
                    case 1:
                        parent = _b.sent();
                        pathsToCreate = [];
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.pathExists(parent)];
                    case 3:
                        if (!!(_b.sent())) return [3 /*break*/, 5];
                        pathsToCreate.push(parent);
                        return [4 /*yield*/, this.getParentFolderFromFSObjectsPath(parent)];
                    case 4:
                        parent = _b.sent();
                        return [3 /*break*/, 2];
                    case 5:
                        _i = 0, _a = pathsToCreate.reverse();
                        _b.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        pathToCreate = _a[_i];
                        return [4 /*yield*/, fs_extra_1.default.mkdir(pathToCreate)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * find folders, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    FileSystemHelper.prototype.findFolders = function (path, searchPattern, options) {
        return __awaiter(this, void 0, void 0, function () {
            var stringHelper, folders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringHelper = this.stringHelper;
                        if (typeof searchPattern !== "string" &&
                            searchPattern instanceof RegExp === false) {
                            throw new Error("You must enter a string or Regular Expression with global flag as search pattern");
                        }
                        if (searchPattern instanceof RegExp && !searchPattern.global) {
                            throw new Error('Regular Expressions have to set global to true ("/pattern/g")');
                        }
                        return [4 /*yield*/, this.getFolders(path, options)];
                    case 1:
                        folders = _a.sent();
                        if (typeof searchPattern === "string") {
                            return [2 /*return*/, folders.filter(function (f) {
                                    return typeof f === "string" &&
                                        f.length >= searchPattern.length &&
                                        f.lastIndexOf(searchPattern) ===
                                            f.length - searchPattern.length;
                                })];
                        }
                        else {
                            return [2 /*return*/, folders.filter(function (f) {
                                    var lastMatch = typeof f === "string"
                                        ? stringHelper.findLastMatch(f, searchPattern)
                                        : null;
                                    return (lastMatch &&
                                        f.length > lastMatch.index &&
                                        lastMatch.index === f.length - lastMatch[0].length);
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * find files, which path's ends matching to given search pattern (may be exceeded over multiple folders)
     * @param path
     * @param searchPattern
     * @param options
     */
    FileSystemHelper.prototype.findFiles = function (path, searchPattern, options) {
        return __awaiter(this, void 0, void 0, function () {
            var stringHelper, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringHelper = this.stringHelper;
                        if (typeof searchPattern !== "string" &&
                            searchPattern instanceof RegExp === false) {
                            throw new Error("You must enter a string or Regular Expression with global flag as search pattern");
                        }
                        if (searchPattern instanceof RegExp && !searchPattern.global) {
                            throw new Error('Regular Expressions have to set global to true ("/pattern/g")');
                        }
                        return [4 /*yield*/, this.getFiles(path, options)];
                    case 1:
                        files = _a.sent();
                        if (typeof searchPattern === "string") {
                            return [2 /*return*/, files.filter(function (f) {
                                    return typeof f === "string" &&
                                        f.length >= searchPattern.length &&
                                        f.lastIndexOf(searchPattern) ===
                                            f.length - searchPattern.length;
                                })];
                        }
                        else {
                            return [2 /*return*/, files.filter(function (f) {
                                    var lastMatch = typeof f === "string"
                                        ? stringHelper.findLastMatch(f, searchPattern)
                                        : null;
                                    return (lastMatch &&
                                        f.length > lastMatch.index &&
                                        lastMatch.index === f.length - lastMatch[0].length);
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * will return ./parent folder, read from path
     * @param path has already to contain parent in terms of "./parent/fileOrFolder"
     */
    FileSystemHelper.prototype.getParentFolderFromFSObjectsPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stringHelper, cleanedPath, lastMatch, parentFolderPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringHelper = this.stringHelper;
                        cleanedPath = stringHelper.trimEnd(path, "/");
                        return [4 /*yield*/, stringHelper.findLastMatch(cleanedPath, /\//g)];
                    case 1:
                        lastMatch = _a.sent();
                        if (lastMatch === null ||
                            lastMatch.index === 0 ||
                            lastMatch.index < 0) {
                            throw new Error("Path must contain parent object/folder already.");
                        }
                        parentFolderPath = cleanedPath.substring(0, lastMatch.index);
                        return [2 /*return*/, parentFolderPath];
                }
            });
        });
    };
    FileSystemHelper.prototype.getObjectNameFromFSObjectsPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stringHelper, cleanedPath, lastMatch, objectName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringHelper = this.stringHelper;
                        cleanedPath = stringHelper.trimEnd(path, "/");
                        return [4 /*yield*/, stringHelper.findLastMatch(cleanedPath, /\//g)];
                    case 1:
                        lastMatch = _a.sent();
                        if (lastMatch === null ||
                            lastMatch.index === 0 ||
                            lastMatch.index < 0) {
                            return [2 /*return*/, cleanedPath];
                        }
                        objectName = cleanedPath.substring(lastMatch.index + 1);
                        return [2 /*return*/, objectName];
                }
            });
        });
    };
    FileSystemHelper.prototype.getFiles = function (path, options) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var optionsWithDefaults, includeNested, result, content, content_1, content_1_1, entry, combinedPath, _b, _c, _d, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        optionsWithDefaults = __assign({ includeNested: false }, (options || {}));
                        includeNested = optionsWithDefaults.includeNested;
                        result = [];
                        return [4 /*yield*/, fs_extra_1.default.readdir(path)];
                    case 1:
                        content = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 11, 12, 17]);
                        content_1 = __asyncValues(content);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, content_1.next()];
                    case 4:
                        if (!(content_1_1 = _e.sent(), !content_1_1.done)) return [3 /*break*/, 10];
                        entry = content_1_1.value;
                        combinedPath = this.combinePath(path, entry);
                        return [4 /*yield*/, this.isDirectory(combinedPath)];
                    case 5:
                        if (!_e.sent()) return [3 /*break*/, 8];
                        if (!includeNested) return [3 /*break*/, 7];
                        _c = (_b = result.push).apply;
                        _d = [result];
                        return [4 /*yield*/, this.getFiles(combinedPath, options)];
                    case 6:
                        _c.apply(_b, _d.concat([(_e.sent())]));
                        _e.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (this.isFile(combinedPath)) {
                            result.push(combinedPath);
                        }
                        _e.label = 9;
                    case 9: return [3 /*break*/, 3];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _e.trys.push([12, , 15, 16]);
                        if (!(content_1_1 && !content_1_1.done && (_a = content_1.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(content_1)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, result];
                }
            });
        });
    };
    FileSystemHelper.prototype.getFolders = function (path, options) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var optionsWithDefaults, includeNested, result, content, content_2, content_2_1, entry, combinedPath, _b, _c, _d, e_2_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        optionsWithDefaults = __assign({ includeNested: false }, (options || {}));
                        includeNested = optionsWithDefaults.includeNested;
                        result = [];
                        return [4 /*yield*/, fs_extra_1.default.readdir(path)];
                    case 1:
                        content = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 9, 10, 15]);
                        content_2 = __asyncValues(content);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, content_2.next()];
                    case 4:
                        if (!(content_2_1 = _e.sent(), !content_2_1.done)) return [3 /*break*/, 8];
                        entry = content_2_1.value;
                        combinedPath = this.combinePath(path, entry);
                        return [4 /*yield*/, this.isDirectory(combinedPath)];
                    case 5:
                        if (!_e.sent()) return [3 /*break*/, 7];
                        result.push(combinedPath);
                        if (!includeNested) return [3 /*break*/, 7];
                        _c = (_b = result.push).apply;
                        _d = [result];
                        return [4 /*yield*/, this.getFolders(combinedPath, options)];
                    case 6:
                        _c.apply(_b, _d.concat([(_e.sent())]));
                        _e.label = 7;
                    case 7: return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _e.trys.push([10, , 13, 14]);
                        if (!(content_2_1 && !content_2_1.done && (_a = content_2.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(content_2)];
                    case 11:
                        _e.sent();
                        _e.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/, result];
                }
            });
        });
    };
    FileSystemHelper.prototype.pathExists = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (r) { return fs_extra_1.default.exists(path, function (exists) { return r(exists); }); })];
            });
        });
    };
    FileSystemHelper.prototype.isFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pathExists(path)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_extra_1.default.stat(path)];
                    case 2:
                        stats = _a.sent();
                        return [2 /*return*/, stats.isFile()];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    FileSystemHelper.prototype.isDirectory = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pathExists(path)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs_extra_1.default.stat(path)];
                    case 2:
                        stats = _a.sent();
                        return [2 /*return*/, stats.isDirectory()];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    FileSystemHelper.prototype.combinePath = function () {
        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments[_i];
        }
        var result = "";
        var stringHelper = this.stringHelper;
        for (var _a = 0, _b = path.filter(function (sp) { return typeof sp === "string" && sp !== ""; }); _a < _b.length; _a++) {
            var subPath = _b[_a];
            if (typeof subPath === "string") {
                var base = result === "/"
                    ? "/"
                    : stringHelper.trimEnd(result, /\/|\\/g);
                result = "" + base + (base !== "" ? "/" : "") + stringHelper.trimStart(subPath, /\/|\\/g);
            }
        }
        return result;
    };
    FileSystemHelper = __decorate([
        BindThis_1.BindToClass(),
        __metadata("design:paramtypes", [StringHelper_1.default])
    ], FileSystemHelper);
    return FileSystemHelper;
}());
exports.FileSystemHelper = FileSystemHelper;
exports.default = FileSystemHelper;
