import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { DateProcessService } from "../adapters";

const _dateService = new DateProcessService();


@Schema()
export class _blank_dateTypeModel {

    @Prop({
        required: false,
        default: null,
    })
    date: string;

    @Prop({
        required: false,
        default: 'Date',
    })
    type: string;

}
export const e_blank_dateTypeModel = SchemaFactory.createForClass(_blank_dateTypeModel);

@Schema()
export class _init_dateTypeModel {

    @Prop({
        required: true,
        default: _dateService.setDate(),
    })
    date: string;

    @Prop({
        required: false,
        default: 'Date',
    })
    type: string;


}
export const e_init_dateTypeModel = SchemaFactory.createForClass(_init_dateTypeModel);