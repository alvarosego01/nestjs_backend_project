import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ProcessDataService } from "../../../common/adapters";
import { _response_I } from "../../../common/interfaces";
import { _argsFind } from "../../../common/interfaces/_responseFindParameters.interface";
import { _Configuration_Keys } from "../../../config/config.keys";
import { ConfigProjectService } from "../../../config/config.service";
import { Users } from "../../users/schemas";
import { JwtPayload_I } from "../interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(Users.name) private readonly UsersModel: Model<Users>,
        private readonly _processData: ProcessDataService,
        private _ConfigProjectService: ConfigProjectService
    ) {

        super({
            secretOrKey: _ConfigProjectService._get(_Configuration_Keys.JWT_SECRET),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });

    }


    async validate(payload: JwtPayload_I) {

        const { _id } = payload;

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                _id: _id,
            },
            populate: {
                path: 'rol',
                select: 'rol'
            },
        }

        await this._processData._findOneDB(this.UsersModel, args).then(async (r: _response_I) => {

            payload.rol = r.data.rol.rol;
            _Response = r;

        }, (err) => {

            throw new UnauthorizedException();


        });


        if (!_Response.data) {
            throw new UnauthorizedException('Token not valid');
        }

        // if (!user.isActive) {
        //     throw new UnauthorizedException('Token not active');
        // }

        // console.log('el pay', payload);

        return payload;


    }

    /*

   */

}