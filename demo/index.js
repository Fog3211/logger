"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
var logger = new index_1["default"]({
    logLevel: 'DETAIL',
    logPrefix: 'dev'
});
logger.logInfo('测试logInfo');
logger.logErr('测试logErr');
logger.logSuccess('测试logSuccess', 'logSuccess');
logger.logWarn('测试logWarn');
