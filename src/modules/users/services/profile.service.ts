import { HttpException, Injectable } from '@nestjs/common';
import { _argsFind, _response_I } from '../../../common/interfaces';
import { _argsUpdate } from '../../../common/interfaces/responseUpdate.interface';
import { ProcessDataService, DateProcessService } from '../../../common/adapters';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileUser } from '../schemas/profile.schema';
import { FileManagerService } from '../../file-manager/services';
import { OwnerRelation_I } from '../../file-manager/interfaces';


@Injectable()
export class ProfileService {

    constructor(
        private readonly _processData: ProcessDataService,
        private readonly _dateProcessService: DateProcessService,
        private readonly _fileManagerService: FileManagerService,
        @InjectModel(ProfileUser.name) private ProfileUserModel: Model<ProfileUser>,
    ) {

    }

    async getOneProfileByUser(id: string): Promise<_response_I> {

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                user: String(id),
            },

        }

        await this._processData._findOneDB(this.ProfileUserModel, args).then((r: _response_I) => {
            _Response = r;
        }, (err: _response_I) => {

            _Response = err;

            throw new HttpException({
                status: _Response.statusCode,
                error: _Response.message,
            }, _Response.statusCode, {
                cause: _Response.err
            });


        });

        return _Response;
    }

    async setProfilePic(id: string, files: Express.Multer.File[]): Promise<_response_I> {
        let _Response: _response_I;

        await this.getOneProfileByUser(id).then(async (resp: _response_I) => {

            _Response = resp;

        });

        let aux_profile = _Response.data;

        let ownerSetting: OwnerRelation_I = {
            id_owner: _Response.data._id,
            schemaRelation: 'ProfileUser'
        }

        await this._fileManagerService.saveFileStore(aux_profile.files?.profilePic || null, files, ownerSetting).then((resp: _response_I) => {

            aux_profile.files.profilePic = resp.data._id;

            if(resp.statusCode != 200){
                 throw new HttpException({
                status: _Response.statusCode,
                    error: _Response.message,
                }, _Response.statusCode, {
                    cause: _Response.err
                });

            }

        });

        aux_profile.updatedAt.date = this._dateProcessService.setDate();

        const args: _argsUpdate = {
            findObject: {
                _id: String(aux_profile._id),
            },
            set: {
                $set: aux_profile
            }
        }

        await this._processData._updateDB(this.ProfileUserModel, args).then((respo: _response_I) => {

            _Response = respo;
            _Response.message = [
                {
                    message: 'Foto de perfil actualizada',
                    type: 'global'
                }
            ];

        }, (error2: _response_I) => {

            _Response = error2;
            _Response.message = [
                {
                    message: 'No se pudo procesar el o los archivos',
                    type: 'global'
                }
            ]

            throw new HttpException({
                status: _Response.statusCode,
                error: _Response.message,
            }, _Response.statusCode, {
                cause: _Response.err
            });

        });

        return _Response;
    }

}