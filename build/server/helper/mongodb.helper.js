"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
const dbconfig = require('../config/app.config.json').DBConnections;
class MongoHelper {
    constructor() {
    }
    static connect(url) {
        return new Promise((resolve, reject) => {
            mongo.MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                poolSize: 10
            }, (err, client) => {
                if (err) {
                    reject(err);
                }
                else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }
    disconnect() {
        MongoHelper.client.close();
    }
}
exports.MongoHelper = MongoHelper;
MongoHelper.connectionString = dbconfig.dbType + "://" + dbconfig.server + ":" + dbconfig.Port + "/" + dbconfig.database;
//# sourceMappingURL=mongodb.helper.js.map