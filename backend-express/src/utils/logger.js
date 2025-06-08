const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
