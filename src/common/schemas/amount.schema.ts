import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class _amount  {

    @Prop({
        required: false,
        default: null,
    })
    amount: string;

    @Prop({
        required: false,
        default: 'USD',
    })
    currency: string

}
export const e_amount = SchemaFactory.createForClass(_amount);