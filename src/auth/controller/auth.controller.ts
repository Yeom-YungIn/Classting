import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {AuthCredentialDto} from "../dto/auth.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: "로그인"})
    @Post('/login')
    async logIn(@Body() authCredentialDto: AuthCredentialDto) {
        return this.authService.signIn(authCredentialDto);
    }
}
