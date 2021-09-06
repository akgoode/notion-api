const winston = require('winston')
const expressWinston = require('express-winston')

module.exports = app => {
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        )
    }));
}