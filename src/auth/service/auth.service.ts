import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import * as bycrpt from 'bcryptjs'
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
        const {name, password} = authCredentialDto;
        const foundUser: User = await this.userRepository.findOneBy({name});
        const compare = await bycrpt.compare(password, foundUser.password);
        if (foundUser && compare) {
            const payload = { name: foundUser.name, role: foundUser.role }
            const accessToken = this.jwtService.sign(payload);
            return {result: 'success', accessToken};
        }else {
            throw new UnauthorizedException();
        }
    }
}
