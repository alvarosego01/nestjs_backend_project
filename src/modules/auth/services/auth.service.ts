import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { DateProcessService, ProcessDataService } from "../../../common/adapters";
import { _response_I } from "../../../common/interfaces";
import { _argsUpdate } from "../../../common/interfaces/responseUpdate.interface";
import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
import { ExeptionsHandlersService } from "../../../common/services";
import { RolesService } from "../../roles/services/roles.service";
import { Users } from "../../users/schemas";
import { JwtPayload_I, session_I } from "../interfaces";


import { LoginUserDto } from "../dto/login-user.dto";
import { CreateUserDto } from "../../users/dto/create-user.dto";

import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Users.name) private UsersModel: Model<Users>,
        private readonly _jwtService: JwtService,
        private readonly _dateProcessService: DateProcessService,
        private readonly _processData: ProcessDataService,
        private readonly _roleService: RolesService,
        private readonly _exeptionsHandlersService: ExeptionsHandlersService,
        @InjectConnection() public connection: mongoose.Connection
    ) {

    }

    async create(CreateUserDto: CreateUserDto): Promise<_response_I> {

        const {
            pass,
            rol
        } = CreateUserDto;

        // console.log('llega aaqui');

        const user = new this.UsersModel(CreateUserDto);

        user.pass = bcrypt.hashSync(pass, 10);

        let _Response: _response_I;

        let rl: string = null;

        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        await this._roleService.getByRole(rol).then((r: _response_I) => {

            rl = r.data._id;
            user.rol = rl;

        }).catch((err: _response_I) => {

            console.log('regresa error aqui', err);
            _Response = err;
            return this._exeptionsHandlersService.exceptionEmitHandler(err);

        });

        await this._processData._saveDB(user, transactionSession).then(async (r: _response_I) => {

            _Response = r;
            _Response.message = [
                {
                    message: `Usuario registrado exitosamente`,
                    type: 'global'
                }
            ]

        }, (err: _response_I) => {

            _Response = err;

            return this._exeptionsHandlersService.exceptionEmitHandler(err);

        })

        if (_Response.ok == true) {

            await transactionSession.commitTransaction()
            await transactionSession.endSession();

        } else {

            this._exeptionsHandlersService.exceptionEmitHandler(_Response);

        }

        return _Response


    }

    async signin(LoginUserDto: LoginUserDto): Promise<_response_I> {

        const { email, pass } = LoginUserDto;

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                email: email
            },
            populate: [
                {
                    path: 'rol',
                    select: 'rol alias',
                    model: 'Roles', // <- si es un array de ids se debe especificar el model
                },
                // {
                //     path: 'profile',
                //     model: 'ProfileUser', // <- si es un array de ids se debe especificar el model
                // }
            ]
        }

        await this._processData._findOneDB(this.UsersModel, args).then(async (r: _response_I) => {
            _Response = r;

            if (!_Response.data) {

                _Response = {
                    ok: false,
                    statusCode: 404,
                    message: [
                        {
                            message: 'El usuario no existe',
                            type: 'global'
                        }
                    ]
                };
                this._exeptionsHandlersService.exceptionEmitHandler(_Response);
            }

            if (!bcrypt.compareSync(pass, r.data.pass)) {

                _Response = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            message: 'Contraseña incorrecta',
                            type: 'global'
                        }
                    ]
                };

                this._exeptionsHandlersService.exceptionEmitHandler(_Response);

            } else {

                const payload: JwtPayload_I = {
                    _id: r.data._id,
                    email: r.data.email,
                    rol: r.data.rol.rol
                };

                const token = await this._jwtService.sign(payload);

                const l: session_I = {
                    _id: r.data._id,
                    name: r.data.name,
                    userName: r.data.userName,
                    lastName: r.data.lastName,
                    rol: r.data.rol.alias,
                    rolName: r.data.rol.rol,
                    // profilePic: _.get(r.data.profile, 'files.profilePic', null),
                    token: token,

                }
                _Response.data = l;

                _Response.message = [
                    {
                        message: `Te damos la bienvenida, ${r.data.name}`,
                        type: 'global'
                    }
                ]


                await this.updateLastSession(r.data._id).then(r => { }, e => { });

                // let x = {
                //   _idUser: l._id,
                //   name: l.name,
                //   last_name: l.last_name,
                //   rol: l.rol
                // }
                // await this._visitGateway.anunciarLogin(x);

            }

        }, (err: _response_I) => {

            _Response = err;

            if (err.statusCode != 500) {
                _Response.message = [
                    {
                        message: 'Usuario o contraseña inválidos',
                        type: 'global'
                    }
                ]
            } else {
                _Response.message = [
                    {
                        message: 'Algo ha salido mal, intente más tarde',
                        type: 'global'
                    }
                ]
            }

            this._exeptionsHandlersService.exceptionEmitHandler(_Response);

        })


        return _Response;

    }

    updateLastSession(id: string) {

        return new Promise(async (resolve, reject) => {

            const data = {
                "last_session.date": this._dateProcessService.setDate()
            }

            const args: _argsUpdate = {
                findObject: {
                    _id: String(id),
                },
                set: {
                    $set: data
                },
                populate: {
                    path: 'rol',
                    select: 'alias'
                }
            }

            await this._processData._updateDB(this.UsersModel, args).then((r: _response_I) => {
                resolve(true);
            }, (err: _response_I) => {
                reject(false);

                this._exeptionsHandlersService.exceptionEmitHandler(err);
            });

        });

    }

}
