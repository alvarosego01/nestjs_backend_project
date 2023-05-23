import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { e_init_dateTypeModel, _init_dateTypeModel, e_blank_dateTypeModel, _blank_dateTypeModel } from "../../../common/schemas/date.schema";

import { RoleType } from "../enum/roletype.enum";

const rolesEnum = Object.values(RoleType);
const roles = {
    values: rolesEnum,
    message: 'El rol {VALUE} no esta permitido'
}; //array de rolesEnum


@Schema()
export class Roles {

    @Prop({
        type: String,
        required: true,
        default: 'ARTIST_ROLE',
        enum: roles,
        unique: true,
    })
    rol: string;

    @Prop({
        type: String,
        required: false,
        default: '',
    })
    description: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        default: '',
    })
    alias: string;

    @Prop({
        type: String,
        required: false,
        default: 'ACTIVE',
    })
    status: string;

    @Prop({
        type: e_init_dateTypeModel,
        required: true,
        default: new _init_dateTypeModel
    })
    createdAt: _init_dateTypeModel;

    @Prop({
        type: e_blank_dateTypeModel,
        required: false,
        default: new _blank_dateTypeModel
    })
    updatedAt: _blank_dateTypeModel;

}

export const RolesSchema = SchemaFactory.createForClass(Roles)
    .plugin(uniqueValidator, {
        message: "El {PATH} {VALUE} ya está registrado en sistema",
    })
    .plugin(mongoosePaginate)
    .plugin(aggregatePaginate)
    .plugin(castAggregation)
    .plugin(mongoose_delete, { overrideMethods: 'all' });



