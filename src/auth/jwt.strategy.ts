import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {Repository} from "typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import * as config from 'config';


const jwtConfig = config.get('jwt')
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: jwtConfig.secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const {name} = payload
        const user: User = await this.userRepository.findOneBy({name})
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}