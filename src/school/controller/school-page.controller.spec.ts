import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPageController } from './school-page.controller';
import { PageService } from '../service/page.service';
import { SubscribeService } from '../service/subscribe.service';
import { CreatePageDto } from '../dto/page.dto';
import { Subscribe } from '../entity/subscribe.entity';
import {NewsService} from "../service/news.service";
import {Page} from "../entity/page.entity";
import {AuthGuard} from "@nestjs/passport";
import {UserRoleType} from "../../auth/types";

const TEST_SCHOOL_NAME: string = "TEST_SCHOOL_NAME";
const TEST_LOCATION: string = "TEST_LOCATION";
const TEST_ADMIN_USER_ID: string = "admin";
const TEST_STUDENT_USER_ID: string = "student";
let ADMIN = {id: TEST_ADMIN_USER_ID, role: UserRoleType.ADMIN};
let STUDENT = {id: TEST_STUDENT_USER_ID, role: UserRoleType.STUDENT};
const TEST_PAGE_ID: number = 1;

describe('SchoolPageController', () => {
  let controller: SchoolPageController;
  let pageService: PageService;
  let subscribeService: SubscribeService;
  let foundPage: Page;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPageController],
      providers: [
        {
          provide: PageService,
          useValue: {
            createPage: jest.fn(),
            findPageById: jest.fn(),
          },
        },
        {
          provide: NewsService,
          useValue: {
            getNewsList: jest.fn(),
          },
        },
        {
          provide: SubscribeService,
          useValue: {
            createSubscribe: jest.fn(),
            deleteSubscribe: jest.fn(),
            getSubscribeList: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<SchoolPageController>(SchoolPageController);
    pageService = module.get<PageService>(PageService);
    subscribeService = module.get<SubscribeService>(SubscribeService);

    foundPage = new Page();
    foundPage.pageId = TEST_PAGE_ID;
    foundPage.schoolName = TEST_SCHOOL_NAME;
    foundPage.location = TEST_LOCATION;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('savePage', () => {
    it('should call pageService.createPage with correct arguments', async () => {
      const createPageDto: CreatePageDto = { schoolName: 'Test School', location: 'Test Location' };
      await controller.savePage(createPageDto, ADMIN);
      expect(pageService.createPage).toHaveBeenCalledWith(createPageDto.schoolName, createPageDto.location, ADMIN);
    });
  });

  describe('subscribePage', () => {
    beforeEach(() => {
      jest.spyOn(pageService, 'findPageById').mockResolvedValueOnce(foundPage);
    });

    it('should call pageService.{findPageById &createSubscribe}', async () => {
      await controller.subscribePage(TEST_PAGE_ID, STUDENT);

      expect(pageService.findPageById).toHaveBeenCalledWith(TEST_PAGE_ID);
      expect(subscribeService.createSubscribe).toHaveBeenCalledWith(TEST_PAGE_ID, TEST_STUDENT_USER_ID);
    });
  });


  describe('cancelSubscribePage', () => {
    it('should call pageService.findPageById and subscribeService.deleteSubscribe', async () => {
      jest.spyOn(pageService, 'findPageById').mockResolvedValueOnce(foundPage as any);

      await controller.cancelSubscribePage(TEST_PAGE_ID, STUDENT);

      expect(pageService.findPageById).toHaveBeenCalledWith(TEST_PAGE_ID);
      expect(subscribeService.deleteSubscribe).toHaveBeenCalledWith(TEST_PAGE_ID, TEST_STUDENT_USER_ID);
    });
  });

  describe('getSubscribeList', () => {
    it('should call subscribeService.getSubscribeList & should return result', async () => {
      const newSubscribe: Subscribe = new Subscribe();
      newSubscribe.pageId = TEST_PAGE_ID;
      newSubscribe.userId = TEST_STUDENT_USER_ID;
      const subscribeList: Subscribe[] = [newSubscribe];
      jest.spyOn(subscribeService, 'getSubscribeList').mockResolvedValueOnce(subscribeList);

      const result = await controller.getSubscribePageList(STUDENT);
      expect(subscribeService.getSubscribeList).toHaveBeenCalledWith(TEST_STUDENT_USER_ID);
      expect(result).toEqual(subscribeList);
    });
  });
});
