
import { CommonHelper } from '../helper';
import { ResMsg } from '../enums/resMsg.enum';

export class CommonApiManager {


    public getProcessedData = async (parseData) => {
        return await new Promise((resolve, reject) => {
            try {
         
                let firstName= parseData.split('0000');
                let lastName = firstName[1].split('000');
                let number = parseData.split('000')[2];
        
                var resData={
                    "firstName": firstName[0],
                    "lastName": lastName[0],
                    "clientId": number
                }

                resolve(resData)
            }
            catch (err) {
                reject({
                    result: ResMsg.ERROR,
                    message: ResMsg.COMMON_ERR_MSG,
                    description: err
                });
            }
        });
    }
}
