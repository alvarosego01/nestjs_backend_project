import { Controller, Param, Post, UploadedFiles } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { Auth_SameIdOrAdmin } from "../../auth/decorators";
import { ApiFiles } from "../../file-manager/decorators";
import { ParseFile } from "../../file-manager/pipes/parse-file.pipe";
import { imageFileFilter, editFileName } from "../../file-manager/validations";
import { ProfileService } from "../services";
import * as fs from 'fs';



@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly _profileService: ProfileService
    ) { }


    @Post('/avatar/:id')
    @Auth_SameIdOrAdmin()
    @ApiFiles(
        'profilePic',
        true,
        1,
        {
            fileFilter: imageFileFilter,
            storage: diskStorage({
                destination: (req, file, cb) => {

                    let dest = './files/images/';

                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(dest, {
                            recursive: true
                        });
                    }

                    cb(null, dest);

                },
                filename: editFileName,
            })
        }
    )
    async uploadAvatar(@UploadedFiles(ParseFile) file: Express.Multer.File[], @Param('id') id: string) {

        console.log('file', file);

        return this._profileService.setProfilePic(id, file);


    }



}