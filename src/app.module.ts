import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./typeorm.confing";
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeORMConfig),
      SchoolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
