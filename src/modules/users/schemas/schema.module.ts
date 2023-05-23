import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileUser, ProfileUserSchema } from "./profile.schema";
import { Users, UsersSchema } from "./users.schema";

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
    imports: [
        _USERSCHEMA,
        _PROFILESCHEMA,

    ],
    exports: [
        MongooseModule,

    ]
})
export class UsersSchemaModule {}
