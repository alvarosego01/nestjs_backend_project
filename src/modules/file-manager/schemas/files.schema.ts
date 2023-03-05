import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { e_init_dateTypeModel, _init_dateTypeModel, e_blank_dateTypeModel, _blank_dateTypeModel } from "../../../common/schemas";



@Schema()
class _ownerRelation {

    @Prop({
        required: false,
        default: null,
    })
    id_owner: string;

    @Prop({
        required: false,
        default: null,
    })
    schemaRelation: string;

}
const e_ownerRelation = SchemaFactory.createForClass(_ownerRelation);

@Schema()
export class FileStore {

    @Prop({
        required: false,
        default: null,
    })
    name: string;

    @Prop({
        required: false,
        default: null,
    })
    type: string;

    @Prop({
        required: false,
        default: null,
    })
    file: string;

    @Prop({
        required: false,
        default: null,
    })
    format: string;

    @Prop({
        required: false,
        default: null,
    })
    folder: string;

    @Prop({
        required: false,
        default: null,
    })
    src: string;

    @Prop({
        type: Object,
        required: false,
        default: null,
    })
    details: object;

    @Prop({
        type: e_ownerRelation,
        required: false,
        default: new _ownerRelation
    })
    ownerRelation: _ownerRelation;

    // @Prop({
    //   type: Mongoose.Schema.Types.ObjectId,
    //   ref: "StatusOrders",
    //   required: false,
    //   default: null,
    // })
    // statusOrder: string;

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

export const FileStoreSchema = SchemaFactory.createForClass(FileStore)
    .plugin(uniqueValidator, {
        message: "El {PATH} {VALUE} ya está registrado en sistema",
    })
    .plugin(mongoosePaginate)
    .plugin(aggregatePaginate)
    .plugin(castAggregation)
    .plugin(mongoose_delete, { overrideMethods: 'all' });



