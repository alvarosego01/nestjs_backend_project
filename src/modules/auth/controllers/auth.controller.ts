import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../../users/dto";
import { AuthService } from "../services/auth.service";


import { LoginUserDto } from "../dto/login-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('signup')
    async registerUser(@Body() createAuthDto: CreateUserDto) {

        return await this._authService.create(createAuthDto);

    }

    @Post('signin')
    async login(@Body() LoginUserDto: LoginUserDto) {

        return await this._authService.signin(LoginUserDto);

    }

    // @Get('private3')
    // @Auth(RoleType.ARTIST_ROLE, RoleType.ADMIN_ROLE)
    // testPrivateRoute3(
    //     // @GetUser() user: any
    // ) {

    //     return {
    //         ok: 'true',
    //         message: 'Hola private 2',
    //     }

    // }

    // @Get('same/:id')
    // @Auth_SameID()
    // testSame(
    // ) {

    //     return {
    //         ok: 'true',
    //         message: 'Hola same test',
    //     }

    // }

    // @Get('sameAdmin/:id')
    // @Auth_SameIdOrAdmin()
    // testSameAdmin(
    // ) {

    //     return {
    //         ok: 'true',
    //         message: 'Hola same Admin test',
    //     }

    // }

}



// const resp: _responseMessage_I[] = [
//     {
//         message: 'Mensaje de error',
//         type: 'global'
//     }
// ]
// throw new InternalServerErrorException(resp, {
//     cause: new Error(), description: 'Some error description'
// }
// )