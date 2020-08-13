import * as mongo from 'mongodb';
const dbconfig = require('../config/app.config.json').DBConnections;

export class MongoHelper {
  public static client: mongo.MongoClient;
  public static connectionString = dbconfig.dbType + "://"+ dbconfig.server+":"+dbconfig.Port +"/" + dbconfig.database;
 
  constructor() {
  }
 
  public static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10}, (err, client: mongo.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          MongoHelper.client = client;
          resolve(client);
        }
      });
    });
  }
 
  public disconnect(): void {
    MongoHelper.client.close();
  }
}