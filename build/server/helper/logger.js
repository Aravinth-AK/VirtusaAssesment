"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston'); // for transports.Console
const path = require('path');
const fs = require('fs');
const DailyRotateFile = require('winston-daily-rotate-file');
const ip = require('ip');
const mkdirp = require('mkdirp');
class Logger {
    static createFolderIfNotExists() {
        if (!fs.existsSync(Logger.logDirectory)) {
            mkdirp(Logger.logDirectory, function (err1) {
                if (err1) {
                    Logger.logDirectory = path.join(__dirname, 'logs');
                    mkdirp(Logger.logDirectory, function (err2) {
                        if (err2) {
                            console.error("Error" + err2);
                        }
                        else {
                            Logger.setLogger();
                        }
                    });
                }
                else {
                    Logger.setLogger();
                }
            });
        }
    }
    static setLogger() {
        this.logger = winston.createLogger({
            transports: [
                new DailyRotateFile({
                    json: false,
                    datePattern: "DD-MM-YYYY",
                    prepend: false,
                    localTime: true,
                    zippedArchive: true,
                    filename: path.join(Logger.logDirectory, "SpeechApi-api-%DATE%.log"),
                    prettyPrint: true,
                    maxSize: '2m',
                    maxFiles: '14d'
                }),
            ],
            exitOnError: false
        });
    }
    static ConfigureLogger() {
        Logger.createFolderIfNotExists();
    }
    static GetValue(value) {
        if (typeof value === "string") {
            return value;
        }
        else {
            return JSON.stringify(value);
        }
    }
    static debug(name, value, req) {
        this.writeLog('debug', name, value, req);
    }
    static error(name, value, req) {
        this.writeLog('error', name, value, req);
    }
    static warn(name, value, req) {
        this.writeLog('warn', name, value, req);
    }
    static info(name, value, req) {
        this.writeLog('info', name, value, req);
    }
    static writeLog(type, name, value, req) {
        const lg = `${ip.address()}   ${this.GetValue(value)}`;
        if (this.logger) {
            switch (type) {
                case 'error':
                    this.logger.error(lg);
                    break;
                case 'warn':
                    this.logger.warn(lg);
                    break;
                case 'debug':
                    this.logger.debug(lg);
                    break;
                default:
                    this.logger.info(lg);
                    break;
            }
        }
    }
}
exports.Logger = Logger;
Logger.logDirectory = path.join(process.cwd(), 'SpeechApi-api-logs');
Logger.defaultConfig = {
    json: false,
    datePattern: "DD-MM-YYYY",
    prepend: false,
    localTime: true,
    zippedArchive: true,
    filename: path.join(Logger.logDirectory, "SpeechApi-%DATE%.log"),
    prettyPrint: true,
    maxSize: '2m',
    maxFiles: '14d'
};
//# sourceMappingURL=logger.js.map