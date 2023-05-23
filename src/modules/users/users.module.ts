import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from "../../common/common.module";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/services/auth.service";
import { FileManagerModule } from "../file-manager/file-manager.module";
import { RolesModule } from "../roles/roles.module";
import { ProfileController, UsersController } from "./controllers";
import { Users, UsersSchema } from "./schemas";
import { ProfileUser, ProfileUserSchema } from "./schemas/profile.schema";
import { ProfileService, UsersService } from "./services";


export const _USERSCHEMA = MongooseModule.forFeature([
    {
        name: Users.name,
        schema: UsersSchema,
    },
]);

export const _PROFILESCHEMA = MongooseModule.forFeature([
    {
        name: ProfileUser.name,
        schema: ProfileUserSchema,
    },
]);

@Module({
    controllers: [
        UsersController,
        ProfileController
    ],
    providers: [
        UsersService,
        ProfileService,

    ],
    imports: [
        _USERSCHEMA,
        _PROFILESCHEMA,
        CommonModule,
        FileManagerModule,
        RolesModule
    ],
    exports: [
        MongooseModule,
        UsersService,
        ProfileService
    ]
})
export class UsersModule {

}
