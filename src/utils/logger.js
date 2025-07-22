const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const PORT = process.env.PORT || 'default'; // fallback if PORT is not defined

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `logs/server_${PORT}.log`,
            level: 'info'
        }),
        new transports.File({
            filename: `logs/errors_${PORT}.log`,
            level: 'error'
        })
    ]
});

module.exports = logger;
