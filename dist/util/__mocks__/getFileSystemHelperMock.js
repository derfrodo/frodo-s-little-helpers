"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var FileSystemHelper_1 = __importDefault(require("../FileSystemHelper"));
var createMockService_1 = __importDefault(require("./createMockService"));
jest.mock("../FileSystemHelper");
exports.getFileSystemHelperMock = function () {
    return createMockService_1.default(new FileSystemHelper_1.default());
};
exports.default = exports.getFileSystemHelperMock;
