import { MongoHelper } from '../helper/mongodb.helper';
import { ResMsg } from '../enums/resMsg.enum';
const dbconfig = require('../config/app.config.json').DBConnections;

export class CommonHelper {
 
  constructor() {
  }

  public static getCollection = (dataBaseName, collectionName) => {
    return MongoHelper.client.db(dataBaseName).collection(collectionName)
}
  public  hasValueExist(targetFieldName, newFieldValue, collectionName ) {
        return new Promise((resolve, reject) => {
            let queryToExecute = {};
            queryToExecute[targetFieldName] =  { $eq: newFieldValue };
            CommonHelper.getCollection(dbconfig.dataBaseName, collectionName).find(queryToExecute).toArray(
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res.length > 0);
                }
            );
        });
    } 

}
