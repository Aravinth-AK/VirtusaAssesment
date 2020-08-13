"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const schema_validators_1 = require("../schema-validators");
exports.JoiValidatorAccRequest = (req, res, next) => {
    const { error } = schema_validators_1.AccountsReqSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    next();
};
class ValidatorHelper {
    jsonValidator(joiSchema, jsonValue) {
        return new Promise((resolve, reject) => {
            joi.validate(jsonValue, joiSchema, { stripUnknown: true })
                .then(res => {
                resolve(res);
            }).catch(error => {
                reject(new Error(error).toString());
            });
        });
    }
    ;
}
exports.ValidatorHelper = ValidatorHelper;
;
//# sourceMappingURL=validator.helper.js.map