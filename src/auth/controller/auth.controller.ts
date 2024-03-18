import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {AuthCredentialDto} from "../dto/auth.dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoginUserDto} from "../dto/login-user.dto";

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: "로그인"})
    @ApiOkResponse({
        status: 201,
        description: "login",
        type: LoginUserDto,
    })
    @Post('/login')
    async logIn(@Body() authCredentialDto: AuthCredentialDto) {
        return this.authService.signIn(authCredentialDto);
    }
}
