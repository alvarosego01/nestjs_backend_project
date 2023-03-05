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
class _profileFiles {

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        refer: "FileStore",
        required: false,
        default: null
    })
    profilePic: string;

}
const e_profileFiles = SchemaFactory.createForClass(_profileFiles);

@Schema()
export class ProfileUser {

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        refer: "Users",
        required: true
    })
    user: string;

    @Prop({
        type: e_profileFiles,
        required: false,
        default: new _profileFiles

    })
    files: _profileFiles;

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



export const ProfileUserSchema = SchemaFactory.createForClass(ProfileUser)
    .plugin(uniqueValidator, {
        message: "El {PATH} {VALUE} ya está registrado en sistema",
    })
    .plugin(mongoosePaginate)
    .plugin(aggregatePaginate)
    .plugin(castAggregation)
    .plugin(mongoose_delete, { overrideMethods: 'all' });