import Logger from '../src/index'

const logger = new Logger({
  logLevel: 'DETAIL' as const,
  logPrefix: '@airmus/logger'
})

logger.logInfo('测试logInfo')
logger.logErr('测试logErr')
logger.logSuccess('测试logSuccess', 'logSuccess')
logger.logWarn('测试logWarn')
