"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var StringHelper_1 = __importDefault(require("../StringHelper"));
var createMockService_1 = __importDefault(require("./createMockService"));
jest.mock("../StringHelper");
exports.getStringHelperMock = function () {
    return createMockService_1.default(new StringHelper_1.default());
};
exports.default = exports.getStringHelperMock;
