import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsController } from './school-news.controller';
import { NewsService } from '../service/news.service';
import {CreateNewsDTO, DeleteNewsDTO, UpdateNewsDTO} from '../dto/news-request.dto';
import { News } from "../entity/news.entity";
import { AuthGuard } from "@nestjs/passport";

const TEST_CONTENT: string = "TEST_CONTENT";
const TEST_PAGE_ID: number = 1;
const TEST_NEWS_ID: number = 1;
const TEST_ADMIN_USER = { id: "admin", role: "admin" };

describe('SchoolNewsController', () => {
  let controller: SchoolNewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolNewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            createNews: jest.fn(),
            updateNews: jest.fn(),
            deleteNews: jest.fn(),
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

    controller = module.get<SchoolNewsController>(SchoolNewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  describe('createNews', () => {
    it('should called newsService.createNews', async () => {
      const newsDto: CreateNewsDTO = new CreateNewsDTO();
      newsDto.pageId = TEST_PAGE_ID;
      newsDto.content = TEST_CONTENT

      const createdNews = new News();
      createdNews.pageId = TEST_PAGE_ID;
      createdNews.newsId = TEST_NEWS_ID;
      createdNews.content = TEST_CONTENT;

      jest.spyOn(newsService, 'createNews').mockResolvedValueOnce(createdNews);

      const result = await controller.createNews({...newsDto}, TEST_ADMIN_USER);

      expect(newsService.createNews).toHaveBeenCalledWith(newsDto.pageId, newsDto.content, TEST_ADMIN_USER.id);
      expect(result).toEqual(createdNews);
    });
  });

  describe('updateNews', () => {
    it('should call newsService.updateNews', async () => {
      const updateNewsDto: UpdateNewsDTO = new UpdateNewsDTO();
      updateNewsDto.newsId = TEST_NEWS_ID;
      updateNewsDto.content = TEST_CONTENT;
      const updatedNews = { result: "success", newsId: TEST_NEWS_ID };

      jest.spyOn(newsService, 'updateNews').mockResolvedValueOnce(updatedNews);

      const result = await controller.updateNews(updateNewsDto);

      expect(newsService.updateNews).toHaveBeenCalledWith(updateNewsDto.newsId, updateNewsDto.content);
      expect(result).toEqual(updatedNews);
    });
  });

  describe('deleteNews', () => {
    it('should call newsService.deleteNews', async () => {
      const deleteNews: DeleteNewsDTO = new DeleteNewsDTO();
      deleteNews.newsId = TEST_NEWS_ID;
      const deletedNews = { result: "success", newsId: TEST_NEWS_ID };

      jest.spyOn(newsService, 'deleteNews').mockResolvedValueOnce(deletedNews);

      const result = await controller.deleteNews(deleteNews);

      expect(newsService.deleteNews).toHaveBeenCalledWith(deleteNews.newsId);
      expect(result).toEqual(deletedNews);
    });
  });
});
