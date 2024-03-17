import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {AuthCredentialDto} from "../../common/dto/auth.dto";
import {JwtService} from "@nestjs/jwt";
const TEST_ID: string = "TEST";
const TEST_PW: string = "1234";


describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    let loginDto: AuthCredentialDto;

    beforeEach(() => {
      loginDto = new AuthCredentialDto();
      loginDto.id = TEST_ID;
    });

    it('should be defined & function', () => {
      expect(service.signIn).toBeDefined();
      expect(typeof service.signIn).toBe('function');
    });

    it('should call userRepository.findOneBy & jwtService', async () => {
      const foundUser: User = new User();
      foundUser.id = TEST_ID;
      foundUser.password = TEST_PW;

      repository.findOneBy = jest.fn().mockResolvedValueOnce(foundUser);
      jwtService.sign = jest.fn().mockReturnValueOnce('1234');

      await service.signIn(loginDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ name: TEST_ID });
      expect(jwtService.sign).toHaveBeenCalled();
    });

    it('should return accessToken', async () => {
      const foundUser: User = new User();
      foundUser.id = TEST_ID;
      foundUser.password = TEST_PW;

      repository.findOneBy = jest.fn().mockResolvedValueOnce(foundUser);

      jwtService.sign = jest.fn().mockReturnValueOnce('1234');

      const result = await service.signIn(loginDto);

      expect(result).toBeDefined();
      expect(result.result).toBe('success');
      expect(result.accessToken).toBe('1234');
    });
  });
});
