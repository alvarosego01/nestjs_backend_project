import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileManagerController } from "./controllers";
import { FileStore, FileStoreSchema } from "./schemas/files.schema";
import { FileManagerService } from "./services";

export const _FILESTORESCHEMA = MongooseModule.forFeature([
    {
        name: FileStore.name,
        schema: FileStoreSchema,
    },
]);

@Module({
    controllers: [FileManagerController],
    providers: [FileManagerService],
    exports: [FileManagerService],
    imports: [
        _FILESTORESCHEMA
    ]
})
export class FileManagerModule { }
