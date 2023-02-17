
import { _responseMessage_I } from "../interfaces";
import { MongooseFieldsError_I } from "../interfaces/_mongooseErrorFields.interface";

export class MongooseHelpers {

    constructor() {

    }

    orderErrorTypes(errors: MongooseFieldsError_I[]): _responseMessage_I[] {

        const e: _responseMessage_I[] = [];

        // console.log('que llega aqui', Object.values(errors));

        errors.forEach((element: MongooseFieldsError_I) => {

            if (element.kind === 'ObjectId') {
                e.push(
                    {
                        message: `El _id ${element.value} no es válido o no existe`,
                        type: 'global',
                        // index: `${element.path}_cf`
                    }
                )

            }
            if (element.kind === 'required') {
                e.push(
                    {
                        message: element.message,
                        type: 'fieldData',
                        index: `${element.path}_cf`
                    }
                )
            }
            if (element.kind === 'unique') {
                e.push(
                    {
                        message: element.message,
                        type: 'fieldData',
                        index: `${element.path}_cf`
                    }
                )
            }

        });

        return e;

    }


}
