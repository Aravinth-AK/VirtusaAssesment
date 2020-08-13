import { Router, Request, Response, NextFunction } from 'express';
import { Api, ValidatorHelper } from '../helper';
import { CommonApiManager } from '../data-manager';
import { DataSchema } from '../schema-validators';


export class DataParseController {

    public static route = '/api/';
    public router: Router = Router();
    constructor() {
        this.router.post('/v1/parse',this.validateIncomingReq, this.parseTypeV1);
        this.router.post('/v2/parse',this.validateIncomingReq, this.parseTypeV2);
        this.router.get('/', this.test);
    }


//validate req body
    private validateIncomingReq = (request: Request, response: Response, next: NextFunction) => {
        const validator = new ValidatorHelper();
        const schema = new DataSchema();
        validator.jsonValidator(schema.validateReqBody(), request.body).then(validReq => {
            if (!validReq) {
                return Api.invalid(request, response, 'Data is Required');
            }
            next();
        }).catch(error => {
            Api.invalid(request, response, 'Data is Required');
        });
    }


//Function to proccess v1 scenario
    public async parseTypeV1(req: Request, res: Response, next: NextFunction) {
        const parseData = req.body['data'];
        const dataManager=new CommonApiManager;

        dataManager.getProcessedData(parseData).then((data:any)=>{
            var resData={
                "firstName": data.firstName+'0000',
                "lastName": data.lastName+'000',
                "clientId": data.clientId
            };
            return Api.ok(req, res, {'data':resData});
        }).catch(error=>{
            return Api.invalid(req, res, error.message);
        });
    }

    
//Function to proccess v2 scenario
    public async parseTypeV2(req: Request, res: Response, next: NextFunction) {
        const parseData = req.body['data'];
        const dataManager=new CommonApiManager;
      
        dataManager.getProcessedData(parseData).then((data:any)=>{
             data['clientId']=[  data['clientId'].slice(0,3), '-',   data['clientId'].slice(3)].join('');
            return Api.ok(req, res, {'data':data});
        }).catch(error=>{
            return Api.invalid(req, res, error.message);
        });
    }

    public async test(req: Request, res: Response, next: NextFunction) {
        return Api.ok(req, res, 'Parse API works fine');
    }


}