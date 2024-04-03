const winston = require('winston');
const {combine, colorize, timestamp, printf} = winston.format;

const colorizer = colorize();

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: combine(
                timestamp({format: "YY-MM-DD HH:mm:ss"}),
                printf(info =>
                    colorizer.colorize(info.level, `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`)
                )
            ),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: combine(
                timestamp({format: "YY-MM-DD HH:mm:ss"}),
                printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`)
            ),
        }),
    ],
});

const queryLogger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'logs/queries.log',
            level: 'info',
            format: combine(
                timestamp({format: "YY-MM-DD HH:mm:ss"}),
                printf(info => `[${info.timestamp}] ${info.message.trim()}`)
            ),
        }),
    ],
});

module.exports = {
    logger,
    logQuery: (query, user) => {
        queryLogger.info(`${query} (user/${user})`);
    }
}