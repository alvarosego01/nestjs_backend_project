import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProcessDataService } from "../../../common/adapters";
import { _response_I } from "../../../common/interfaces";
import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
import { _dataPaginator, _configPaginator, _argsPagination } from "../../../common/interfaces/_responsePaginator.interface";
import { CreateRoleDto } from "../dto/create-role.dto";
import { Roles } from "../schemas";

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Roles.name) private readonly RolesModel: Model<Roles>,
        private readonly _processData: ProcessDataService,
    ) {

    }

    async create(createRoleDto: CreateRoleDto): Promise<_response_I> {

        let _Response: _response_I;

        const data = new this.RolesModel(createRoleDto);

        await this._processData._saveDB(data).then((r: _response_I) => {

            _Response = r;
            _Response.message = [
                {
                    message: 'Rol creado exitosamente',
                    type: 'global'
                }
            ]

        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }

    async findAll(page: number = 1): Promise<_response_I> {

        let _Response: _response_I;

        const parameters: _dataPaginator = { // <- paginate parameters

            page: page || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },

        }

        const args: _argsPagination = {

            findObject: {},
            options: parameters

        }

        await this._processData._findPaginateDB(this.RolesModel, args).then(r => {
            _Response = r;
        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }

    async getByRole(rol: string): Promise<_response_I> {

        return new Promise(async (resolve, reject) => {

            const args: _argsFind = {
                findObject: {
                    rol: rol,
                }

            }

            await this._processData._findOneDB(this.RolesModel, args).then(r => {

                resolve(r);

            }, (err: _response_I) => {
                let x: _response_I = err;
                x.message = [
                    {
                        message: 'No existe el tipo de usuario',
                        type: 'global'
                    }
                ]
                reject(x);
            });

        });

    }


    async findOne(id: string): Promise<_response_I> {

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                _id: id,
            },
            populate: null
        }

        await this._processData._findOneDB(this.RolesModel, args).then(r => {
            _Response = r;
        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }



}
