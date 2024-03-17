import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as process from "process";

// const dbConfig = config.get('db');
export const typeORMConfig : TypeOrmModuleOptions = {
    type: "postgres",
    host:  '127.0.0.1',
    port:  5432,
    database: "classting",
    username: "admin",
    password:  "qneldkf15*",
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    autoLoadEntities: true,
    logging: ["query", "error"]
}