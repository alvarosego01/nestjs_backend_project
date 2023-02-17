import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigProjectModule } from "./config/config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RolesModule } from "./modules/roles/roles.module";
import { SeedModule } from "./modules/seed/seed.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        ConfigProjectModule,
        CommonModule,
        AuthModule,
        SeedModule,
        UsersModule,
        RolesModule
    ],
})
export class AppModule { }

