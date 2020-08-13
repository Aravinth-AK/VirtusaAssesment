"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-docs/api.swagger.json');
const path = require('path');
const appConfig = require('./config/app.config.json').AppConfig;
const http = require("http");
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const logger_1 = require("./helper/logger");
const helper_1 = require("./helper");
const api_routing_1 = require("./api.routing");
const mongodb_helper_1 = require("./helper/mongodb.helper");
class WebApi {
    constructor() {
        this.PORT = process.env.PORT || appConfig.port;
        this.app = express();
        this.router = express.Router();
        this.configure();
    }
    configure() {
        this.configureMiddleware();
        this.configureBaseRoute();
        this.configureRoutes();
        this.errorHandler();
    }
    configureMiddleware() {
        this.app.use(body_parser_1.json({ limit: '50mb' }));
        this.app.use(compression());
        this.app.use(body_parser_1.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(function (req, res, next) {
            req['rootPath'] = __dirname;
            next();
        });
        logger_1.Logger.ConfigureLogger();
        // Logger.configureErrorLogger(this.app);
    }
    configureBaseRoute() {
        this.app.use(cors());
        this.app.use('/', this.router);
        this.app.get('/api', (req, res) => {
            res.send('Virtusa Assesment');
        });
        this.app.use('/api-docs/api-contest', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/static', express.static(__dirname));
        this.app.on('uncaughtException', (err) => {
            console.log(`uncaughtException: ${err}`);
        });
    }
    configureRoutes() {
        api_routing_1.ApiRouting.ConfigureRouters(this.app);
    }
    errorHandler() {
        this.app.use(function (err, req, res, next) {
            if (req.body) {
                logger_1.Logger.error('', req.body, req);
            }
            logger_1.Logger.error('', err, req);
            helper_1.Api.serverError(req, res, err);
        });
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            helper_1.Api.notFound(req, res);
        });
    }
    run() {
        let server = http.createServer(this.app);
        server.listen(this.PORT, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Server is running in http://localhost:${this.PORT}`);
            try {
                yield mongodb_helper_1.MongoHelper.connect(mongodb_helper_1.MongoHelper.connectionString);
                console.log(`Connected to MongoDb successfully`);
            }
            catch (err) {
                console.error(`Unable to connect to MongoDb!`, err);
            }
        }));
        server.on('error', this.onError);
    }
    onError(error) {
        let port = this.PORT;
        console.log('error');
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES': {
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
            }
            case 'EADDRINUSE': {
                console.error(bind + ' is already in use');
                process.exit(1);
            }
            default:
                throw error;
        }
    }
}
exports.WebApi = WebApi;
//# sourceMappingURL=webApi.js.map