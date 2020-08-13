import { Router, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-docs/api.swagger.json');
const path = require('path');
const appConfig = require('./config/app.config.json').AppConfig;

import * as http from 'http';
import * as compression from 'compression';
import * as express from 'express';
import * as cors from 'cors';

import { Api } from './helper';
import { ApiRouting } from './api.routing';

export class WebApi {
    public app: express.Express;
    private router: express.Router;
    public PORT = process.env.PORT || appConfig.port;

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.configure();
    }

    private configure() {
        this.configureMiddleware();
        this.configureBaseRoute();
        this.configureRoutes();
        this.errorHandler();
    }

    private configureMiddleware() {
        this.app.use(json({ limit: '50mb' }));
        this.app.use(compression());
        this.app.use(urlencoded({ limit: '50mb', extended: true }));
        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            req['rootPath'] = __dirname;
            next();
        });

    }

    private configureBaseRoute() {
        this.app.use(cors())
        this.app.use('/', this.router);

        this.app.get('/api', (req, res) => {
            res.send('Virtusa Assesment');
        });
        this.app.use('/api-docs/virtusa-Assesment', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/static', express.static(__dirname));
        this.app.on('uncaughtException', (err) => {
            console.log(`uncaughtException: ${err}`);
        });
    }

    private configureRoutes() {
        ApiRouting.ConfigureRouters(this.app);
    }

    private errorHandler() {
        this.app.use(function (err, req, res, next) {
    
            Api.serverError(req, res, err);
        });

        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            Api.notFound(req, res);
        });
    }


    public run() {
        let server = http.createServer(this.app);
        server.listen(this.PORT, async () => {
            console.log(`Server is running in http://localhost:${this.PORT}`);

        });
        server.on('error', this.onError);
    }

    private onError(error) {
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

