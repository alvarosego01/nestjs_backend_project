import { Request, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { RoleType } from '../enum/enum.index';


@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @Auth(RoleType.ADMIN_ROLE)
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @Auth(RoleType.ADMIN_ROLE)
    findAll(@Request() req: any) {
        return this.rolesService.findAll(req.page);
    }

    @Get(':id')
    @Auth(RoleType.ADMIN_ROLE)
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    //     return this.rolesService.update(+id, updateRoleDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.rolesService.remove(+id);
    // }
}
