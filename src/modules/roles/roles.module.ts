import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { CommonModule } from '../../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './schemas';


export const _ROLESSCHEMA = MongooseModule.forFeature([
    {
        name: Roles.name,
        schema: RolesSchema,
    },
]);


@Module({
    controllers: [RolesController],
    providers: [
        RolesService
    ],
    imports: [
        _ROLESSCHEMA,
        CommonModule,
        // AuthModule
    ],
    exports: [
        MongooseModule,
        RolesService
    ]
})
export class RolesModule { }
