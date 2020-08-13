import * as joi from 'joi';

export class DataSchema {

public validateReqBody(){
    return joi.object({
        data: joi.string().alphanum().required()
    })
 }
 
}