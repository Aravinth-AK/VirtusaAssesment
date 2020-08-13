"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_helper_1 = require("../helper/mongodb.helper");
const dbconfig = require('../config/app.config.json').DBConnections;
class CommonHelper {
    constructor() {
    }
    hasValueExist(targetFieldName, newFieldValue, collectionName) {
        return new Promise((resolve, reject) => {
            let queryToExecute = {};
            queryToExecute[targetFieldName] = { $eq: newFieldValue };
            CommonHelper.getCollection(dbconfig.dataBaseName, collectionName).find(queryToExecute).toArray((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.length > 0);
            });
        });
    }
}
exports.CommonHelper = CommonHelper;
CommonHelper.getCollection = (dataBaseName, collectionName) => {
    return mongodb_helper_1.MongoHelper.client.db(dataBaseName).collection(collectionName);
};
//# sourceMappingURL=common.helper.js.map