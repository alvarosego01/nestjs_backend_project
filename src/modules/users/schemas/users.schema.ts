
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";
import { e_init_dateTypeModel, _init_dateTypeModel, e_blank_dateTypeModel, _blank_dateTypeModel } from "../../../common/schemas";


@Schema()
export class Users {

    @Prop({
        required: true,
        default: null,
    })
    name: string;

    @Prop({
        required: true,
        default: null,
    })
    lastName: string;

    @Prop({
        required: true,
        unique: true
    })
    userName: string;

    @Prop({
        required: false,
        default: null,
    })
    nroMobile: string;

    @Prop({
        required: false,
        default: null,
    })
    genre: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        required: true
    })
    rol: string;

    @Prop({
        required: [true, 'La contraseña es requerida']
    })
    pass: string;

    @Prop({
        type: e_init_dateTypeModel,
        required: true,
        // default: _dateService.setDate(),
        default: new _init_dateTypeModel
    })
    createdAt: _init_dateTypeModel;

    @Prop({
        type: e_blank_dateTypeModel,
        required: false,
        // default: _dateService.setDate(),
        default: new _blank_dateTypeModel
    })
    updatedAt: _blank_dateTypeModel;

    @Prop({
        type: e_init_dateTypeModel,
        required: true,
        // default: _dateService.setDate(),
        default: new _init_dateTypeModel
    })
    last_session: _init_dateTypeModel;

}

export const UsersSchema = SchemaFactory.createForClass(Users)
    .plugin(uniqueValidator, {
        message: "El {PATH} {VALUE} ya está registrado en sistema",
    })
    .plugin(mongoosePaginate)
    .plugin(aggregatePaginate)
    .plugin(castAggregation)
    .plugin(mongoose_delete, { overrideMethods: 'all' });
