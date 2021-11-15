"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var LogLevelPriority;
(function (LogLevelPriority) {
    LogLevelPriority[LogLevelPriority["DETAIL"] = 1] = "DETAIL";
    LogLevelPriority[LogLevelPriority["INFO"] = 2] = "INFO";
    LogLevelPriority[LogLevelPriority["SUCCESS"] = 3] = "SUCCESS";
    LogLevelPriority[LogLevelPriority["WARN"] = 3] = "WARN";
    LogLevelPriority[LogLevelPriority["ERROR"] = 4] = "ERROR";
    LogLevelPriority[LogLevelPriority["SILENT"] = 5] = "SILENT";
})(LogLevelPriority || (LogLevelPriority = {}));
var ColorPlates;
(function (ColorPlates) {
    ColorPlates["INFO"] = "color: #1f132b; background-color: #f0f0f0";
    ColorPlates["WARN"] = "color: #494008; background-color: #e7c60c";
    ColorPlates["ERROR"] = "color: white; background-color: #D33F49";
    ColorPlates["SUCCESS"] = "color: white; background-color: #95B46A";
})(ColorPlates || (ColorPlates = {}));
;
var NodeColorPlates;
(function (NodeColorPlates) {
    NodeColorPlates["INFO"] = "\u001B[37m%s";
    NodeColorPlates["WARN"] = "\u001B[33m%s";
    NodeColorPlates["ERROR"] = "\u001B[31m%s";
    NodeColorPlates["SUCCESS"] = "\u001B[32m%s";
})(NodeColorPlates || (NodeColorPlates = {}));
;
var DEFAULT_LOGGER_LEVEL = 'INFO';
var DEFAULT_LOGGER_PREFIX = 'AIRMUS-LOGGER';
var Logger = /** @class */ (function () {
    function Logger(_a) {
        var _b = _a === void 0 ? {} : _a, logLevel = _b.logLevel, logPrefix = _b.logPrefix;
        this.logLevel = DEFAULT_LOGGER_LEVEL;
        this.logPrefix = DEFAULT_LOGGER_PREFIX;
        this.logLevel = logLevel !== null && logLevel !== void 0 ? logLevel : DEFAULT_LOGGER_LEVEL;
        this.logPrefix = logPrefix !== null && logPrefix !== void 0 ? logPrefix : DEFAULT_LOGGER_PREFIX;
    }
    Logger.prototype.logInfo = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (LogLevelPriority[this.logLevel] <= LogLevelPriority['INFO']) {
            this.logOptimize('INFO', msgs);
        }
    };
    Logger.prototype.logSuccess = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (LogLevelPriority[this.logLevel] <= LogLevelPriority['SUCCESS']) {
            this.logOptimize('SUCCESS', msgs);
        }
    };
    Logger.prototype.logWarn = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (LogLevelPriority[this.logLevel] <= LogLevelPriority['WARN']) {
            this.logOptimize('WARN', msgs);
        }
    };
    Logger.prototype.logErr = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (LogLevelPriority[this.logLevel] <= LogLevelPriority['ERROR']) {
            this.logOptimize('ERROR', msgs);
        }
    };
    Logger.prototype.logOptimize = function (method, msgs) {
        var inBrowser = typeof window !== 'undefined';
        var logMsg = inBrowser ? __spreadArray([ColorPlates[method], "[" + this.logPrefix + "]:"], msgs) : __spreadArray([NodeColorPlates[method], "[" + this.logPrefix + "]:"], msgs);
        if (inBrowser) {
            if (method === 'ERROR') {
                console.error.apply(console, logMsg);
            }
            else if (method === 'WARN') {
                console.warn.apply(console, __spreadArray(['%s'], logMsg));
            }
            else {
                console.log.apply(console, __spreadArray(['%s'], logMsg));
            }
        }
        else {
            console.log.apply(console, logMsg);
        }
    };
    return Logger;
}());
exports["default"] = Logger;
