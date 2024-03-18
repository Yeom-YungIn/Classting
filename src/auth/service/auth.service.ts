import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {JwtService} from "@nestjs/jwt";
import {AuthCredentialDto} from "../dto/auth.dto";
import {BasicUser} from "../../common/database/data/basic-user";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    /**
     * admin, student 유저 생성
     * */
    async createBasicUser(): Promise<void> {
        const createUsers = this.userRepository.create(BasicUser);
        await this.userRepository.save(createUsers);
    }

    /**
     * 로그인
     * @param AuthCredentialDto
     * */
    async signIn(authCredentialDto: AuthCredentialDto): Promise<{result: string, accessToken: string}> {
        const where = {...authCredentialDto};
        const foundUser: User = await this.userRepository.findOneBy(where);
        console.log(foundUser)
        if (foundUser) {
            const payload = { id: foundUser.id, role: foundUser.role }
            const accessToken = this.jwtService.sign(payload);
            return {result: 'success', accessToken};
        }else {
            throw new UnauthorizedException();
        }
    }
}
