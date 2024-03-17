import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./typeorm.confing";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
