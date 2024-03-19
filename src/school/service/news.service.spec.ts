import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {News} from "../entity/news.entity";
import {TEST_ADMIN_USER,  TEST_NEWS, TEST_NEWS_ID} from "../../../test/data/test.data";

describe('newsService', () => {
  let service: NewsService;
  let repository: Repository<News>;
  let news;

  beforeEach(async () => {
    news = TEST_NEWS

    const module: TestingModule = await Test.createTestingModule({
      providers: [
          NewsService,
        {
          provide: getRepositoryToken(News),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repository = module.get<Repository<News>>(getRepositoryToken(News));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNews', () => {
    let newNews: News;
    let spySave, spyCreate;

    beforeEach(() => {
      newNews = {...news}

      repository.create = jest.fn();
      repository.save = jest.fn();
      spyCreate = jest.spyOn(repository, 'create');
      spySave = jest.spyOn(repository, "save").mockResolvedValueOnce(newNews);
    });

    it('should be defined & function', () => {
      expect(service.createNews).toBeDefined();
      expect(typeof service.createNews).toBe('function');
    });

    it('should have called newsRepository.{save & create}', async () => {
      await service.createNews(news.pageId, news.content, TEST_ADMIN_USER.id);
      expect(spySave).toHaveBeenCalled();
    });

    it('should return created news', async () => {
      const result = await service.createNews(news.pageId, news.content, TEST_ADMIN_USER.id);
      expect(result.pageId).toBe(newNews.pageId);
      expect(result.content).toBe(newNews.content);

    })
  });

  describe('getNewsList', () => {
    let foundNews: News;
    let pageId: number;

    beforeEach(() => {
      foundNews = {...news};
      pageId = news.pageId;
      repository.find = jest.fn().mockResolvedValueOnce(foundNews);
    })

    it('should be defined & function', () => {
      expect(service.getNewsList).toBeDefined();
      expect(typeof service.getNewsList).toBe('function');
    });

    it('should have called repository.findBy', async () => {
      await service.getNewsList(pageId, 'DESC', 'DESC', 0, 10);
      expect(repository.find).toBeCalled();
    });

    it('should return repository.findBy result', async () => {
      const foundNews = await service.getNewsList(pageId, 'DESC', 'DESC', 0, 10);
      expect(foundNews).toBe(foundNews);
    });
  });

  describe('getNewsById', () => {
    let newsId: number;
    let foundNews: News;

    beforeEach(() => {
      newsId = 1;
      foundNews = {...news};
      repository.findOneBy = jest.fn().mockResolvedValueOnce(foundNews);
    });

    it('should be defined & function', () => {
      expect(service.getNewsById).toBeDefined();
      expect(typeof service.getNewsById).toBe('function');
    });

    it('should have called repository.findOneBy', async () => {
      await service.getNewsById(newsId);
      expect(repository.findOneBy).toBeCalled();
    });

    it('should return news', async () => {
      const result = await service.getNewsById(newsId);
      expect(result).toBe(foundNews);
    });

  })

  describe('updateNews', () => {
    let foundNews: News;
    let newsId: number;

    beforeEach(() => {
      newsId = TEST_NEWS_ID;
      foundNews = {...news}
      foundNews.newsId = TEST_NEWS_ID;

      service.getNewsById = jest.fn().mockResolvedValue(foundNews);
      repository.update = jest.fn().mockResolvedValue({affected: 1});
    });

    it('should be defined & function', () => {
      expect(service.updateNews).toBeDefined();
      expect(typeof service.updateNews).toBe('function');
    });

    it('should have called service.getNewsById', async () => {
      await service.updateNews(newsId, "update");
      expect(service.getNewsById).toBeCalled();
    });

    it('should have called repository.update', async () => {
      await service.updateNews(newsId, "update");
      expect(repository.update).toBeCalled();
    });

    it('should return result', async () => {
      const result = await service.updateNews(newsId, "update");
      expect(result).toBeDefined();
      expect(result.result).toBe('success');
      expect(result.newsId).toBe(newsId);
    });

  })


  describe('deleteNews', () => {
    let newsId: number;
    let foundNews: News;
    let deletedNews: News;

    beforeEach(() => {
      newsId = TEST_NEWS_ID;
      foundNews = {...news};
      foundNews.newsId = TEST_NEWS_ID;

      deletedNews = new News();
      deletedNews.newsId = newsId;

      service.getNewsById = jest.fn().mockResolvedValue(foundNews);
      repository.update = jest.fn().mockResolvedValueOnce({raw: [], affected: 1});
    });

    it('should be defined & function',() => {
      expect(service.deleteNews).toBeDefined();
      expect(typeof service.deleteNews).toBe('function');
    })

    it('should have called getNewsById', async () => {
      await service.deleteNews(newsId);
      expect(service.getNewsById).toBeCalled();
    });

    it('should have called repository.delete', async () => {
      await service.deleteNews(newsId);
      expect(repository.update).toBeCalled()
    });

    it('should return result ', async () => {
      const result = await service.deleteNews(newsId);
      expect(result).toBeDefined();
      expect(result.result).toBe('success');
      expect(result.newsId).toBe(newsId);
    });
  })
});
