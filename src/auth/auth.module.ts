import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {JwtModule} from "@nestjs/jwt";
import * as config from 'config';
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {CustomPassportModule} from "../common/passport/passport.module";
const jwtConfig = config.get('jwt');
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secretKey,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    CustomPassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, CustomPassportModule],
})
export class AuthModule {
  constructor(private authService: AuthService)  {
    this.authService.createBasicUser();
  }
}
