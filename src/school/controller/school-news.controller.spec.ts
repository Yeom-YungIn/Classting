import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsController } from './school-news.controller';
import { NewsService } from '../service/news.service';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import {News} from "../entity/news.entity";

const TEST_CONTENT: string = "TEST_CONTENT";
const TEST_PAGE_ID: number = 1;
const TEST_NEWS_ID: number = 1;
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
      ],
    }).compile();

    controller = module.get<SchoolNewsController>(SchoolNewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  describe('createNews', () => {
    it('should called newsService.createNews', async () => {
      const newsDto: CreateNewsDto = new CreateNewsDto();
      newsDto.content = TEST_CONTENT
      const createdNews = new News();
      createdNews.pageId = TEST_PAGE_ID;

      jest.spyOn(newsService, 'createNews').mockResolvedValueOnce(createdNews);

      const result = await controller.createNews(newsDto);

      expect(result).toEqual(createdNews);
      expect(newsService.createNews).toHaveBeenCalledWith(newsDto);
    });
  });

  describe('updateNews', () => {
    it('should called newsService.updateNews', async () => {
      const newsId = TEST_NEWS_ID;
      const updateNewsDto: UpdateNewsDto = new UpdateNewsDto()
      updateNewsDto.content = TEST_CONTENT;
      const updatedNews = { result: "success", newsId: newsId};
      jest.spyOn(newsService, 'updateNews').mockResolvedValueOnce(updatedNews);

      const result = await controller.updateNews(newsId, updateNewsDto);

      expect(result).toEqual(updatedNews);
      expect(newsService.updateNews).toHaveBeenCalledWith(newsId, updateNewsDto.content);
    });
  });

  describe('deleteNews', () => {
    it('should called newsService.deleteNews', async () => {
      const newsId = TEST_NEWS_ID
      const deletedNews = { result: "success", newsId: newsId};
      jest.spyOn(newsService, 'deleteNews').mockResolvedValueOnce(deletedNews);

      const result = await controller.deleteNews(newsId);

      expect(result).toEqual(deletedNews);
      expect(newsService.deleteNews).toHaveBeenCalledWith(newsId);
    });
  });
});
