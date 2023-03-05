import { Request, Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth_SameIdOrAdmin } from '../../auth/decorators';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    findAll(@Request() req: any) {
        return this.usersService.findAll(req.page);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @Auth_SameIdOrAdmin()
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Auth_SameIdOrAdmin()
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }


}
