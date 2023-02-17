import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { _response_I } from "../../../common/interfaces";
import { ExeptionsHandlersService } from "../../../common/services";
import { AuthService } from "../../auth/services/auth.service";
import { Roles } from "../../roles/schemas";
import { RolesService } from "../../roles/services/roles.service";
import { Users } from "../../users/schemas";
import { UsersService } from "../../users/services";
import { seed_initialData, SeedRole_I, seedUser_I } from "../data/seed-data";



@Injectable()
export class SeedService {

    constructor(
        @InjectModel(Users.name) private readonly UsersModel: Model<Users>,
        @InjectModel(Roles.name) private readonly RolesModel: Model<Roles>,
        private readonly _exeptionsHandlersService: ExeptionsHandlersService,
        private readonly _userServices: UsersService,
        private readonly _rolesService: RolesService,
        private readonly _authService: AuthService
    ) {

    }

    async runSeed(): Promise<_response_I> {

        let _Response: _response_I;

        let msg: any[] = [];

        await this.setRolesSeed(seed_initialData.roles).then((r: _response_I) => {
            _Response = r;
            msg.push(...r.message);
        }, (err: _response_I) => {
            _Response = err;
            msg.push(...err.message);
        });

        await this.setUsersSeed(seed_initialData.users).then((r: _response_I) => {
            _Response = r;
            msg.push(...r.message);
        }, (err: _response_I) => {
            _Response = err;
            msg.push(...err.message);
        });

        _Response.message = msg;

        if (_Response.ok === false) {
            this._exeptionsHandlersService.exceptionEmitHandler(_Response);
        }

        return _Response;

    }


    private setRolesSeed(rolesData: SeedRole_I[]): Promise<any> {

        return new Promise(async (resolve, reject) => {


            const roles = await this._rolesService.findAll().then((r: _response_I) => {

                if (r.ok == true && r.data.length >= 1) {
                    return r.data;
                } else {

                    return null;

                }

            });

            if (roles != null) {

                let _Response: _response_I = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            message: 'No puede ejecutarse el seed para Roles, se requiere la colección vacia',
                            type: 'global'
                        }
                    ],
                    err: 'No puede ejecutarse el seed para Roles, se requiere la colección vacia',
                }

                reject(_Response)

            } else {


                // seed_initialData

                let _Response: _response_I;


                var promises = rolesData.map((element) => {
                    return this._rolesService.create(element).then((r: _response_I) => {
                        return r;
                    })
                });

                await Promise.all(promises).then((r) => {
                })

                /*
                 await rolesData.forEach(async (element: SeedRole_I, idx) => {

                    _Response = await this._rolesService.create(element).then((r: _response_I) => {
                        return r;
                    })

                });
                */

                _Response = {
                    ok: true,
                    statusCode: 201,
                    message: [
                        {
                            message: 'Seed de Roles ejecutado',
                            type: 'global'
                        }
                    ]
                }

                resolve(_Response)

            }

        })

    }

    private setUsersSeed(usersData: seedUser_I[]): Promise<any> {

        return new Promise(async (resolve, reject) => {



            const Users = await this._userServices.findAll().then((r: _response_I) => {

                if (r.ok == true && r.data.length >= 1) {
                    return r.data;
                } else {

                    return null;

                }

            });

            if (Users != null) {

                let _Response: _response_I = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            message: 'No puede ejecutarse el seed para Usuarios, se requiere la colección vacia',
                            type: 'global'
                        }
                    ],
                    err: 'No puede ejecutarse el seed para Usuarios, se requiere la colección vacia',
                }

                reject(_Response)

            } else {

                // seed_initialData

                let _Response: _response_I;
                var promises = usersData.map((element) => {
                    return this._authService.create(element).then((r: _response_I) => {
                        return r;
                    })
                });

                await Promise.all(promises).then((r) => {
                })

                /*
                let x = await usersData.forEach(async (element: seedUser_I, idx) => {


                    _Response = await this._authService.create(element).then((r: _response_I) => {
                        return r;
                    })

                });
                */


                _Response = {
                    ok: true,
                    statusCode: 201,
                    message: [
                        {
                            message: 'Seed de usuarios ejecutado',
                            type: 'global'
                        }
                    ]
                }

                resolve(_Response)
            }

        })

    }



}
