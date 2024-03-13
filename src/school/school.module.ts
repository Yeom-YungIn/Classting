import { Module } from '@nestjs/common';
import { SchoolController } from './controller/school.controller';
import { SchoolService } from './service/school.service';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule {}
