import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {JwtService} from "@nestjs/jwt";
import {AuthCredentialDto} from "../../common/dto/auth.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{result: string, accessToken: string}> {
        const where = {...authCredentialDto};
        const foundUser: User = await this.userRepository.findOneBy(where);
        if (foundUser) {
            const payload = { name: foundUser.id, role: foundUser.role }
            const accessToken = this.jwtService.sign(payload);
            return {result: 'success', accessToken};
        }else {
            throw new UnauthorizedException();
        }
    }
}
