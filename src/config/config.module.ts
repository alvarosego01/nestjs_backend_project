import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { _MONGOOSEMODULE } from "../database/mongo-config";
import { EnvConfigurations } from "./app.config";
import { ConfigProjectService } from "./config.service";


@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [EnvConfigurations],
        }),
        _MONGOOSEMODULE
    ],
    providers: [
        {
            provide: ConfigProjectService,
            useValue: new ConfigProjectService(
                new ConfigService()
            ),
        },
    ],
    exports: [ConfigProjectService],
})
export class ConfigProjectModule { }

