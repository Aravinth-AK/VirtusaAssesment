"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require('@hapi/joi');
exports.AccountsReqSchema = joi.object({
    voicePattern: joi.string().required()
});
class BankAccountsSchema {
    validateProjectReqBody() {
        return joi.object({
            voicePattern: joi.string().required()
        });
    }
}
exports.BankAccountsSchema = BankAccountsSchema;
//# sourceMappingURL=bank-accounts.schema.js.map