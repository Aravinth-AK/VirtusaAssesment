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
const bank_account_manager_1 = require("./bank-account.manager");
/**
 * @class
 * @name OptionSelectManager
 */
class OptionSelectManager {
    constructor() {
        /**
* @public
* @async
* @function
* @name selectService
* @param {string} controllername name of the specific controller function.
* @description This is a follow up method after user predictor algorithm.
* the name of the controller will be selected and given as an input to this function
* @returns {promises<object>} Returns Status and data requested by the user
* Status will be invalid or valid
* Message will be Error Object if invalid and correct result will be sent incase of proper request
* @author Team AppComposer
*/
        this.selectService = (controllername) => __awaiter(this, void 0, void 0, function* () {
            const projectManager = new bank_account_manager_1.BankAccountsManager();
            return yield new Promise((resolve, reject) => {
                switch (controllername) {
                    case 'transactionTable':
                        return projectManager.getTransactionData().then((result) => {
                            resolve(result);
                        });
                    case 'accountTable':
                        return projectManager.getSelectedAccount('userAccount').then((result) => {
                            resolve(result);
                        });
                        break;
                    case 'creditcardTable':
                        return projectManager.getCreditcardData().then((result) => {
                            resolve(result);
                        });
                    case 'loanTable':
                        return projectManager.getLoanData().then((result) => {
                            resolve(result);
                        });
                }
            });
        });
        /**
* @public
* @async
* @function
* @name parseData
* @param {string[]} dataArray voice pattern will be converted as an array and will be given as input.
* @description This is an inital point of checking before the predictor algorithm.
* this method will look for repeating pattern in the string and will cancel the request if there are too many repeating pattern on the string.
* @returns {Promise<number>}  Returns number of repeating pattern in user query
* Status will be invalid or valid
* Message will be Error Object if invalid and correct result will be sent incase of proper request
* @author Team AppComposer
*/
        //to check repeating pattern
        this.parseData = (dataArray) => __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                let count = 0;
                if (dataArray.length <= 3)
                    resolve(count);
                else {
                    let tempArray = dataArray;
                    dataArray.forEach((data) => {
                        tempArray.shift();
                        dataArray.filter((check) => {
                            if (check == data)
                                count++;
                        });
                        resolve(count);
                    });
                }
            });
        });
    }
}
exports.OptionSelectManager = OptionSelectManager;
//# sourceMappingURL=optionSelect.manager.js.map