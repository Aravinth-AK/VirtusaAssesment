"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require('mongodb');
const dbconfig = require('../config/app.config.json').DBConnections;
const mongodb_helper_1 = require("../helper/mongodb.helper");
var MongoClient = require('mongodb').MongoClient;
let db;
exports.db = db;
class DBConnectionService {
    // public db: any;
    constructor() {
        this.getConnection();
    }
    getConnection() {
        MongoClient.connect(mongodb_helper_1.MongoHelper.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                console.error(err);
                return err;
            }
            exports.db = db = client.db(dbconfig.database);
            console.log("connected to DB");
        });
    }
}
exports.DBConnectionService = DBConnectionService;
//# sourceMappingURL=dbConnection.service.js.map