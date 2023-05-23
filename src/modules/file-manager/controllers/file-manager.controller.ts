import { Controller, Post, Body, Get, Param, Patch, Delete, Put, UploadedFiles } from "@nestjs/common";
import { diskStorage } from "multer";
import { ApiFiles } from "../decorators/api-files.decorator";
import { CreateFileManagerDto } from "../dto/create-file-manager.dto";
import { UpdateFileManagerDto } from "../dto/update-file-manager.dto";
import { ParseFile } from "../pipes/parse-file.pipe";
import { FileManagerService } from "../services";
import { imageFileFilter, editFileName } from "../validations";

import * as fs from 'fs';



@Controller('files')
export class FileManagerController {
    constructor(private readonly fileManagerService: FileManagerService) { }

    //   @UseGuards(AuthGuard('jwt'))
    // @Post('/avatar/:id')
    // @ApiFiles(
    //     'profilePic',
    //     true,
    //     1,
    //     {
    //         fileFilter: imageFileFilter,
    //         storage: diskStorage({
    //             destination: (req, file, cb) => {
    //                 // let p = `./files/users/${req.params['id']}/credentials`;
    //                 //   let dest = './files/users/' + req.params[ 'id' ] + '/profile/bio';
    //                 let dest = './files/images/';

    //                 if (!fs.existsSync(dest)) {
    //                     fs.mkdirSync(dest, {
    //                         recursive: true
    //                     });
    //                 }

    //                 cb(null, dest);

    //                 // return dir;
    //             },
    //             filename: editFileName,
    //         })
    //     }
    // )
    // async uploadAvatar(@UploadedFiles(ParseFile) file: Express.Multer.File[], @Param('id') id: string) {

    //     console.log('file', file);

    //     return file;
    //     // let _Response: responseInterface = await this._profileService.setProfilePic(id, file);

    //     // return res.status(_Response.statusCode).json(_Response);

    // }

}
