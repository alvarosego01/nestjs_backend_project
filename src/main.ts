import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { _Configuration_Keys } from "./config/config.keys";

const Config = new ConfigService();
async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const logger = new Logger('Bootstrap');

    const allowedOrigins = Config.get(_Configuration_Keys.ALLOWEDORIGINS);

    app.use(helmet());

    app.enableCors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "Theeee CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle('BP Backend Restful Api')
        .setDescription('BP backend endpoints')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);

    await app.listen(Config.get(_Configuration_Keys.PORT), () => {
        logger.log(`App Nestjs running on port: ${Config.get(_Configuration_Keys.PORT)}`);
    });

}
bootstrap();


console.log(process.cwd());

