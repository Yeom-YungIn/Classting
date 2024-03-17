import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {AuthCredentialDto} from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async logIn(@Body() authCredentialDto: AuthCredentialDto) {
        return this.authService.signIn(authCredentialDto);
    }
}
