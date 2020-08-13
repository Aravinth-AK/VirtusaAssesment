const mongodb = require('mongodb');
const dbconfig = require('../config/app.config.json').DBConnections;
import { MongoHelper } from '../helper/mongodb.helper';

var MongoClient = require('mongodb').MongoClient;

let db: any;

export class DBConnectionService {
    // public db: any;
    
constructor() {
   this.getConnection(); 
}
public getConnection() {
MongoClient.connect(MongoHelper.connectionString, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   }, (err, client) => {
   if (err) {
     console.error(err)
     return err;
   }
   db = client.db(dbconfig.database);
   console.log("connected to DB");   
 });
}
}

export { db }