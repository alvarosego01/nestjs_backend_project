import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ProcessDataService, DateProcessService } from "../../../common/adapters";
import { _response_I } from "../../../common/interfaces";
import { _argsUpdate } from "../../../common/interfaces/responseUpdate.interface";
import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
import { _dataPaginator, _configPaginator, _argsPagination } from "../../../common/interfaces/_responsePaginator.interface";
import { UpdateUserDto } from "../dto";
import { Users } from "../schemas";



@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private readonly UsersModel: Model<Users>,
        private readonly _processData: ProcessDataService,
        private readonly _dateProcessService: DateProcessService,
        @InjectConnection() public connection: mongoose.Connection
    ) {



    }

    async findAll(page: number = 1): Promise<_response_I> {

        let _Response: _response_I;

        const parameters: _dataPaginator = { // <- paginate parameters

            page: page || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },
            select: '-pass',
            populate: [
                {
                    path: 'rol',
                    select: 'rol alias',
                    model: 'Roles', // <- si es un array de ids se debe especificar el model
                },
                {
                    path: 'profile',
                    model: 'ProfileUser', // <- si es un array de ids se debe especificar el model
                    select: '-user',
                    populate: [
                        {
                            path: 'files.profilePic',
                            model: 'FileStore',
                            select: 'src'
                        }
                    ]
                }
            ]

        }

        const args: _argsPagination = {

            findObject: {},
            options: parameters

        }

        await this._processData._findPaginateDB(this.UsersModel, args).then((r: _response_I) => {

            _Response = r;

        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }


    async findOne(id: string): Promise<_response_I> {

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                _id: id,
            },
            select: '-pass',
            populate: [
                {
                    path: 'rol',
                    select: 'rol alias',
                    model: 'Roles', // <- si es un array de ids se debe especificar el model
                },
                {
                    path: 'profile',
                    model: 'ProfileUser', // <- si es un array de ids se debe especificar el model
                    select: '-user',
                    populate: [
                        {
                            path: 'files.profilePic',
                            model: 'FileStore',
                            select: 'src'
                        }
                    ]
                }
            ]
        }

        await this._processData._findOneDB(this.UsersModel, args).then(r => {
            _Response = r;
        }, err => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<_response_I> {

        let _Response: _response_I;

        if (updateUserDto.rol) {
            delete updateUserDto.rol;
        }

        const data = {
            ...updateUserDto,
            "updatedAt.date": this._dateProcessService.setDate()
        }

        const args: _argsUpdate = {
            findObject: {
                _id: String(id),
            },
            set: {
                $set: data
            },
            populate: null
        }

        await this._processData._updateDB(this.UsersModel, args).then((r: _response_I) => {
            _Response = r;
            _Response.message = [
                {
                    message: 'Usuario actualizado',
                    type: 'global'
                }
            ]
        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);
        });

        return _Response;

    }

    async remove(id: string): Promise<_response_I> {

        let _Response: _response_I;

        await this._processData._deleteSoftDB(this.UsersModel, id).then((r: _response_I) => {
            _Response = r;
            _Response.message = [
                {
                    message: 'Usuario eliminado',
                    type: 'global'
                }
            ]
        }, (err: _response_I) => {

            throw new HttpException(err, err.statusCode);

        });

        return _Response;

    }

}
