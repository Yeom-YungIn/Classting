import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./typeorm.confing";
import { SchoolModule } from './school/school.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      SchoolModule,
      AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
