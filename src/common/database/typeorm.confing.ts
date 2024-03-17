import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as config from 'config';
import * as process from "process";

const dbConfig = config.get('db');
export const typeORMConfig : TypeOrmModuleOptions = {
    type: dbConfig.type,
    host:  process.env.RDS_HOST || dbConfig.host,
    port:  process.env.RDS_PORT || dbConfig.port,
    database:  process.env.RDS_DATABASE || dbConfig.database,
    username:  process.env.RDS_USERNAME || dbConfig.username,
    password:  process.env.RDS_PASSWORD || dbConfig.password,
    entities: ["dist/**/*.entity.js"],
    synchronize: dbConfig.synchronize,
    autoLoadEntities: dbConfig.autoLoadEntities
}