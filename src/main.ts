import { WebApi } from './webApi';
let api = new WebApi();
api.run();
let app = new WebApi().app;
export { app };
