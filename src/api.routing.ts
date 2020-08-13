import * as express from 'express';
import { DataParseController } from './controller/data-Parse.controller';
export class ApiRouting {
        public static ConfigureRouters(app: express.Router) {
                app.use(DataParseController.route, new DataParseController().router);
        }
}
