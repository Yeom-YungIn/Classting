import { Test, TestingModule } from '@nestjs/testing';
import {PageService} from "./page.service";
import {Repository} from "typeorm";
import {Page} from "../entity/page.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {
  TEST_ADMIN_USER_ID,
  TEST_LOCATION,
  TEST_PAGE,
  TEST_PAGE_ID,
  TEST_SCHOOL_NAME
} from "../../../test/data/test.data";

describe('pageService', () => {
  let pageId: number, schoolName: string, location: string;
  let service: PageService;
  let repository: Repository<Page>;
  let page;

  beforeEach(async () => {
    page = TEST_PAGE

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPageById', () => {
    let foundPage;
    beforeEach(() => {
      foundPage = {...page};
      repository.findOneBy = jest.fn().mockResolvedValueOnce(foundPage);
    })

    it('should be a defined & function', () => {
      expect(service.findPageById).toBeDefined();
      expect(typeof service.findPageById).toBe('function');
    });

    it('should have called repository.findOneBy', async () => {
      await service.findPageById(pageId);
      expect(repository.findOneBy).toHaveBeenCalledWith({pageId});
    })

    it(`should return foundPage`, async () => {
      const result: Page = await service.findPageById(pageId)
      expect(result).toBeDefined();
      expect(result.pageId).toEqual(foundPage.pageId);
      expect(result.schoolName).toEqual(foundPage.schoolName);
    })
  });

  describe('createPage', () => {
    let newPage, publisherId = TEST_ADMIN_USER_ID;
    beforeEach(() => {
      newPage = {...page};
      repository.create = jest.fn();
      repository.save = jest.fn().mockResolvedValueOnce(newPage);
    })

    it('should be a defined & function', () => {
      expect(service.createPage).toBeDefined();
      expect(typeof service.createPage).toBe('function');
    });

    it('should have called repository.{save & create} with newPage', async () => {
      await service.createPage(schoolName, location, publisherId);
      expect(repository.create).toHaveBeenCalledWith({schoolName, location, publisherId});
      expect(repository.save).toBeCalled();
    });

    it(`should return newPage`, async () => {
      const result: Page = await service.createPage(schoolName, newPage, publisherId);
      expect(result).toBeDefined();
      expect(result.pageId).toEqual(newPage.pageId);
      expect(result.schoolName).toEqual(newPage.schoolName);
      expect(result.location).toEqual(newPage.location);
    });
  });
});
