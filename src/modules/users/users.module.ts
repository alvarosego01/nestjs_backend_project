import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "../../common/common.module";
import { UsersController } from "./controllers";
import { Users, UsersSchema } from "./schemas";
import { UsersService } from "./services";


export const _USERSCHEMA = MongooseModule.forFeature([
    {
        name: Users.name,
        schema: UsersSchema,
    },
]);

@Module({
    controllers: [UsersController],
    providers: [
        UsersService
    ],
    imports: [
        _USERSCHEMA,
        CommonModule,
        // AuthModule
    ],
    exports: [
        MongooseModule,
        UsersService
    ]
})
export class UsersModule { }
