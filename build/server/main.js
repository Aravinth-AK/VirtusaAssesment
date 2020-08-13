"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webApi_1 = require("./webApi");
let api = new webApi_1.WebApi();
api.run();
let app = new webApi_1.WebApi().app;
exports.app = app;
//# sourceMappingURL=main.js.map