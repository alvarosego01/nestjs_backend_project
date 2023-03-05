
import { Injectable } from '@nestjs/common';
import { DateProcessService } from '.';
import { MongooseHelpers } from '../helpers';
import { _responseMessage_I, _response_I } from '../interfaces';
import { _argsUpdate } from '../interfaces/responseUpdate.interface';
import { MongooseFieldsError_I } from '../interfaces/_mongooseErrorFields.interface';
import { _argsPagination } from '../interfaces/_responsePaginator.interface';

// import * as mongoose from 'mongoose';
import mongoose, { Document, Model, model } from 'mongoose';




@Injectable()
export class ProcessDataService {

    private readonly _mongooseHelpers = new MongooseHelpers();

    constructor(
        private readonly _dateProcessService: DateProcessService,
    ) {

    }

    async _findOneDB(dataBody: Model<any, any>, parameters: any): Promise<_response_I> {

        return new Promise(async (resolve, reject) => {

            let populate: any = (parameters.options) ? parameters.options.populate : parameters.populate;
            let select: any = (parameters.options) ? parameters.options.select : parameters.select;

            // dataBody.findOne

            await dataBody.findOne(parameters.findObject)
                .populate(populate)
                .select(select)
                .exec((error, response) => {

                    if (error) {
                        let l = {
                            ...error
                        }
                        const msgModel: _responseMessage_I[] = this._mongooseHelpers.orderErrorTypes([
                            l
                        ]);

                        const resp: _response_I = {
                            ok: false,
                            statusCode: 500,
                            err: { ...error },
                            message: msgModel
                        };

                        reject(resp);

                    }

                    if (!response) {

                        const resp: _response_I = {
                            ok: false,
                            statusCode: 404,
                            err: 'Sin resultados, respuesta inesperada',
                            message: [{
                                message: 'No hay resultados en este momento',
                                type: 'global'
                            }]

                        };
                        reject(resp);

                    }

                    const resp: _response_I = {
                        ok: true,
                        statusCode: 200,
                        data: response,
                    };

                    resolve(resp);


                });

        });
    }

    async _findPaginateDB(dataBody: any, parameters: _argsPagination = null): Promise<_response_I> {

        return new Promise(async (resolve, reject) => {

            await dataBody.paginate(
                parameters.findObject,
                parameters.options,
                (error, response) => {

                    if (error) {

                        // const errors: MongooseFieldsError_I[] = Object.values(error.errors);
                        // const msgModel: _responseMessage_I[] = this._mongooseHelpers.orderErrorTypes(errors);

                        const resp: _response_I = {
                            ok: false,
                            statusCode: 500,
                            err: { ...error },
                            message: [
                                {
                                    message: 'Algo ha salido mal, intente más tarde',
                                    type: 'global'
                                }
                            ]
                        };

                        reject(resp);
                    }


                    if (!response) {

                        const resp: _response_I = {
                            ok: false,
                            statusCode: 404,
                            err: 'Sin resultados, respuesta inesperada',
                            message: [{
                                message: 'No hay resultados en este momento',
                                type: 'global'
                            }],
                            data: []

                        };
                        reject(resp);

                    }

                    let resp: _response_I;


                    if (response.itemsList.length === 0) {

                        resp = {
                            ok: true,
                            statusCode: 200,
                            err: 'Sin resultados, respuesta inesperada',
                            message: [{
                                message: 'No hay resultados en este momento',
                                type: 'global'
                            }],
                            data: []
                        }

                    } else {

                        resp = {
                            ok: true,
                            statusCode: 200,
                            data: response.itemsList,
                            paginator: response.paginator
                        };

                    }
                    resolve(resp);

                });

        });

    }

    async _saveDB(dataBody: any, session: any = null): Promise<_response_I> {
        return new Promise(async (resolve, reject) => {


            dataBody.save(async (error: any, response: any) => {

                if (error) {

                    console.log('error', error);

                    const errors: MongooseFieldsError_I[] = Object.values(error.errors);
                    const msgModel: _responseMessage_I[] = this._mongooseHelpers.orderErrorTypes(errors);

                    const resp: _response_I = {
                        statusCode: 400,
                        err: error.errors,
                        message: msgModel
                    };

                    reject(resp);

                }
                if (response) {

                    const resp: _response_I = {
                        ok: true,
                        statusCode: 201,
                        data: response
                    };
                    resolve(resp);

                }

            }, { session: session });


        });

    }

    async _updateDB(dataBody: Model<any, any>, parameters: _argsUpdate): Promise<_response_I> {
        return new Promise(async (resolve, reject) => {

            await dataBody.findOneAndUpdate(
                parameters.findObject,
                parameters.set,
                { new: true }
            ).then((response) => {
                const resp: _response_I = {
                    ok: true,
                    statusCode: 200,
                    data: response,
                };
                resolve(resp);
            }).catch((err) => {
                const resp: _response_I = {
                    statusCode: 400,
                    err: err,
                    // message: msgModel
                };
                reject(resp);
            });

            /*
                       await dataBody.findOneAndUpdate(
                           parameters.findObject,
                           parameters.set,
                           { new: true }, (error, response) => {
                               console.log('error aca', error);

                               if (error) {
                                   console.log('error aca', error);
                                   // const errors: MongooseFieldsError_I[] = Object.values(error.errors);
                                   // const msgModel: _responseMessage_I[] = this._mongooseHelpers.orderErrorTypes(errors);

                                   const resp: _response_I = {
                                       statusCode: 400,
                                       err: error,
                                       // message: msgModel
                                   };

                                   reject(resp);
                               }

                               if (!response) {

                                   console.log('error sin respuesta');
                                   const resp: _response_I = {
                                       ok: false,
                                       statusCode: 404,
                                       err: 'Sin resultados, respuesta inesperada',
                                       message: [{
                                           message: 'No hay resultados en este momento',
                                           type: 'global'
                                       }]

                                   };
                                   reject(resp);

                               }

                               const resp: _response_I = {
                                   ok: true,
                                   statusCode: 200,
                                   data: response
                               };
                               resolve(resp);

                           }).populate(parameters.populate).then();

                       */


        });
    }




    async _deleteSoftDB(dataBody: any, id: string): Promise<_response_I> {
        return new Promise(async (resolve, reject) => {

            await dataBody.delete({
                _id: String(id)
            }).exec(function (error, response) {

                if (error) {
                    console.log('hubo error', error);
                    const resp: _response_I = {
                        ok: false,
                        statusCode: 500,
                        message: [
                            {
                                message: 'No se pudo eliminar, intente más tarde',
                                type: 'global'
                            }
                        ],
                        err: error,
                    };
                    reject(resp);
                }
                if (!response) {
                    const resp: _response_I = {
                        ok: true,
                        statusCode: 400,
                        message: [
                            {
                                message: 'No se pudo eliminar, intente más tarde',
                                type: 'global'
                            }
                        ],

                    };
                    reject(resp);
                }

                const resp: _response_I = {
                    ok: true,
                    statusCode: 200,
                    message: [
                        {
                            message: 'Elemento eliminado exitosamente',
                            type: 'global'
                        }
                    ],
                };
                resolve(resp);


            });

        });
    }



}
