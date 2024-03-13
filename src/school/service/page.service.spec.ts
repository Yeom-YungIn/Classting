import { Test, TestingModule } from '@nestjs/testing';
import {PageService} from "./page.service";
import {Repository} from "typeorm";
import {Page} from "../entity/page.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {PageDto} from "../dto/page.dto";


describe('PageService', () => {
  let service: PageService;
  let repository: Repository<Page>;
  let newPage: PageDto;

  beforeEach(async () => {
    newPage = { schoolName: 'schoolName', location: 'location'};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
          PageService,
        {
          provide: getRepositoryToken(Page),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<PageService>(PageService);
    repository = module.get<Repository<Page>>(getRepositoryToken(Page));
  });

  it('PageService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('PageService.createPage', () => {
    beforeEach(() => {
      repository.create = jest.fn();
      repository.save = jest.fn().mockResolvedValueOnce(newPage);
    })

    it('createPage should be a defined & function', () => {
      expect(service.createPage).toBeDefined();
      expect(typeof service.createPage).toBe('function');
    });

    it('createPage should have called repository.{save & create} with newPage', async () => {
      await service.createPage(newPage);
      expect(repository.create).toHaveBeenCalledWith(newPage);
      expect(repository.save).toBeCalled();
    })

    it('createPage should return the created page', async () => {
      const result: Page = await service.createPage(newPage)
      expect(result.schoolName).toEqual(newPage.schoolName);
      expect(result.location).toEqual(newPage.location);
    })
  });
});
