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
const express_1 = require("express");
const helper_1 = require("../helper");
const constants_1 = require("../constants");
const multimatch = require("multimatch");
const optionSelect_manager_1 = require("../data-manager/optionSelect.manager");
/**
 * @class
 * @name VoicePatternController
 */
class VoicePatternController {
    constructor() {
        this.router = express_1.Router();
        this.router.post('/user-query', helper_1.JoiValidatorAccRequest, this.parseSpeechData);
        this.router.get('/', this.test);
    }
    /**
 * @public
 * @async
 * @function
 * @name parseSpeechData
 * @param req API Request Interface with contains Request body, request header etc.,
 * @param res API Response Interface which is used to send back response with
 * respond data after processing the Request.
 * @param next This Param is used if there is any other methods to be exected after
 * completion of current function, the next() will deviate to next method.
 * @description This Method will Get the string pattern from request body.
 * The string pattern will be converted to an array for processing.
 * algorithm will check for the repeating word pattern and return the request if constrain fails
 * here the voice pattern will be parsed and check for the most relevant matching possiblities.
 * @returns {function} returns Functions like Api.ok, Api.badRequest, Api.serverError etc.,
 * @author Team AppComposer
 */
    parseSpeechData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const accounHolderName = req.params['AccountHolderName'];
            const voicePattern = req.body['voicePattern'];
            const detectQuery = new optionSelect_manager_1.OptionSelectManager();
            let ProcessedArray = voicePattern.split(" ");
            detectQuery.parseData(ProcessedArray).then((count) => {
                if (count != 0 && count > ProcessedArray.length / 2)
                    return helper_1.Api.ok(req, res, "Too many repeating patterns");
                else {
                    //match Pattern
                    constants_1.dictionaryMap.forEach((data, key) => {
                        let result = multimatch(ProcessedArray, data);
                        data.match = result.length;
                    });
                    //sorting Matched data in descending order to find highest possiblity
                    const sortedMap = new Map([...constants_1.dictionaryMap].sort((a, b) => a[1]['match'] > b[1]['match'] ? -1 : 1));
                    let firstKey = sortedMap.keys().next().value;
                    let firstValue = sortedMap.values().next().value;
                    //data fetch from DB
                    if (firstValue["match"] > 0) {
                        detectQuery.selectService(firstKey).then((result) => {
                            firstKey = null;
                            return helper_1.Api.ok(req, res, result);
                        });
                    }
                    else {
                        return helper_1.Api.ok(req, res, "Sorry no relevant result found");
                    }
                }
            });
        });
    }
    test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return helper_1.Api.ok(req, res, 'Parse API works fine');
        });
    }
}
exports.VoicePatternController = VoicePatternController;
VoicePatternController.route = '/api/bank-account';
//# sourceMappingURL=voice-pattern.controller.js.map