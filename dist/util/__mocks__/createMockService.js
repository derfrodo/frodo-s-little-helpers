"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockService = function (actualService) {
    var serviceMock = actualService;
    return { service: actualService, mock: serviceMock };
};
exports.default = exports.createMockService;
