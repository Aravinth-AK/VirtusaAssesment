"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resMsg_enum_1 = require("../enums/resMsg.enum");
const helper_1 = require("../helper");
/**
 * @class
 * @name BankAccountsManager
 */
class BankAccountsManager {
    constructor() {
        this.dbName = 'APIContest';
        this.collectionName = 'bankaccounts';
        /**
     * @public
     * @async
     * @function
     * @name getSelectedAccount
     * @param {string} collectionName collection name for the function
     * @description This Method is Used fetch the user savings account details.
     * on successfull completion the response will contains user account detail.
     * @returns {promise<object>} Returns Status and data requested by the user
     * Status will be invalid or valid
     * Message will be Error Object if invalid and correct result will be sent incase of proper request
     * @author Team AppComposer
     */
        this.getSelectedAccount = (collectionId) => __awaiter(this, void 0, void 0, function* () {
            let collectionName = collectionId;
            return yield new Promise((resolve, reject) => {
                try {
                    helper_1.CommonHelper.getCollection(this.dbName, collectionName).find({}).toArray((err, accountDetails) => {
                        if (err) {
                            reject({
                                result: resMsg_enum_1.ResMsg.ERROR,
                                message: err
                            });
                        }
                        if (accountDetails.length > 0) {
                            resolve({ result: resMsg_enum_1.ResMsg.SUCCESS, content: (accountDetails) });
                        }
                        else {
                            resolve({ result: resMsg_enum_1.ResMsg.ACC_UNAVAILABLE, message: resMsg_enum_1.ResMsg.ACC_UNAVAILABLE });
                        }
                    });
                }
                catch (err) {
                    reject({
                        result: resMsg_enum_1.ResMsg.ERROR,
                        message: resMsg_enum_1.ResMsg.COMMON_ERR_MSG,
                        description: err
                    });
                }
            });
        });
        /**
  * @public
  * @async
  * @function
  * @name getTransactionData
  * @param {string} collectionName collection name for the function
  * @description This Method is Used fetch the tranasaction details if the string represent the data for account transactions.
  * response will consist of users transaction details.
  * @returns {promise<object>} Returns Status and data requested by the user
  * Status will be invalid or valid
  * Message will be Error Object if invalid and correct result will be sent incase of proper request
  * @author Team AppComposer
  */
        this.getTransactionData = () => __awaiter(this, void 0, void 0, function* () {
            let collectionName = 'transactiondata';
            return yield new Promise((resolve, reject) => {
                try {
                    helper_1.CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {
                        let resObj = [];
                        if (accounts.length > 0) {
                            resObj = accounts;
                        }
                        let respBody = {
                            result: resMsg_enum_1.ResMsg.SUCCESS,
                            bank_accounts: resObj
                        };
                        resolve(respBody);
                    });
                }
                catch (err) {
                    reject({
                        result: resMsg_enum_1.ResMsg.ERROR,
                        message: err
                    });
                }
            });
        });
        /**
* @public
* @async
* @function
* @name getCreditcardData
* @param {string} collectionName collection name for the function
* @description This Method is Used fetch the credit card details if the string represent the data for credit card.
* response for the method will contains all credit card information.
* @returns {promise<object>} Returns Status and data requested by the user
* Status will be invalid or valid
* Message will be Error Object if invalid and correct result will be sent incase of proper request
* @author Team AppComposer
*/
        this.getCreditcardData = () => __awaiter(this, void 0, void 0, function* () {
            let collectionName = 'creditcard';
            return yield new Promise((resolve, reject) => {
                try {
                    helper_1.CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {
                        let resObj = [];
                        if (accounts.length > 0) {
                            resObj = accounts;
                        }
                        let respBody = {
                            result: resMsg_enum_1.ResMsg.SUCCESS,
                            bank_accounts: resObj
                        };
                        resolve(respBody);
                    });
                }
                catch (err) {
                    reject({
                        result: resMsg_enum_1.ResMsg.ERROR,
                        message: err
                    });
                }
            });
        });
        /**
* @public
* @async
* @function
* @name getLoanData
* @param {string} collectionName collection name for the function
* @description This Method is Used fetch the user loan details if the string represent the enquiry about the  user loans.
* the response will contain the user loan details
* @returns {promise<object>} Returns Status and data requested by the user
* Status will be invalid or valid
* Message will be Error Object if invalid and correct result will be sent incase of proper request
* @author Team AppComposer
*/
        this.getLoanData = () => __awaiter(this, void 0, void 0, function* () {
            let collectionName = 'loandata';
            return yield new Promise((resolve, reject) => {
                try {
                    helper_1.CommonHelper.getCollection(this.dbName, collectionName).find().toArray((err, accounts) => {
                        let resObj = [];
                        if (accounts.length > 0) {
                            resObj = accounts;
                        }
                        let respBody = {
                            result: resMsg_enum_1.ResMsg.SUCCESS,
                            bank_accounts: resObj
                        };
                        resolve(respBody);
                    });
                }
                catch (err) {
                    reject({
                        result: resMsg_enum_1.ResMsg.ERROR,
                        message: err
                    });
                }
            });
        });
    }
}
exports.BankAccountsManager = BankAccountsManager;
//# sourceMappingURL=bank-account.manager.js.map