const Logger = require('../dist/lib/index')

const logger = new Logger({
  logLevel: 'DETAIL',
  logPrefix: 'dev'
})

logger.logInfo('测试logInfo')
logger.logErr('测试logErr')
logger.logSuccess('测试logSuccess', 'logSuccess')
logger.logWarn('测试logWarn')
