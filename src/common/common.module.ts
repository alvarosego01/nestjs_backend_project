import { Module, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DateProcessService, ProcessDataService } from './adapters';
import { HttpExceptionFilter } from './filters';
import { MiddlewareModule } from './middlewares/middleware.module';
import { CommonService, ExeptionsHandlersService } from './services';
import { SocketsGateway } from './sockets/sockets.gateway';
import { SocketsService } from './sockets/sockets.service';


@Global()
@Module({
    // controllers: [],
    imports: [
        MiddlewareModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        CommonService,
        ProcessDataService,
        DateProcessService,

        SocketsGateway,
        SocketsService,

        ExeptionsHandlersService

    ],
    exports: [
        CommonService,
        ProcessDataService,
        DateProcessService,
        SocketsService,
        ExeptionsHandlersService
    ]
})
export class CommonModule { }
