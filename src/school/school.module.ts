import { Module } from '@nestjs/common';
import { SchoolPageController } from './controller/school-page.controller';
import { NewsService } from './service/news.service';
import {PageService} from "./service/page.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Page} from "./entity/page.entity";
import {News} from "./entity/news.entity";
import {Subscribe} from "./entity/subscribe.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Page, News, Subscribe])],
  controllers: [SchoolPageController],
  providers: [
      NewsService,
      PageService,
      Subscribe,
  ]
})
export class SchoolModule {}
