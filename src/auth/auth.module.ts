import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {JwtModule} from "@nestjs/jwt";
import * as config from 'config';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
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
    PassportModule.register({
      defaultStrategy: 'jwt',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {
  constructor(private authService: AuthService)  {
    this.authService.createBasicUser();
  }
}
