import { Module } from "@nestjs/common";
import { CommonModule } from "../../common/common.module";
import { AuthModule } from "../auth/auth.module";
import { RolesModule } from "../roles/roles.module";
import { UsersModule } from "../users/users.module";
import { SeedController } from "./controllers/seed.controller";
import { SeedService } from "./services/seed.service";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        RolesModule,
        CommonModule
    ],
    controllers: [SeedController],
    providers: [
        SeedService
    ]

})
export class SeedModule { }
