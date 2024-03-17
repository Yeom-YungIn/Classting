import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SchoolModule } from './school/school.module';
import {typeORMConfig} from "./common/database/typeorm.confing";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      AuthModule,
      SchoolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
