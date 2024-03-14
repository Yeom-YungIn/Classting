import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {News} from "../entity/news.entity";

describe('newsService', () => {
  let service: NewsService;
  let repository: Repository<News>;
  let news: News;

  beforeEach(async () => {
    news = new News();
    news.pageId = 1;
    news.content = "content";

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
    let spySave: object, spyCreate: object;

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
      await service.createNews(newNews);
      expect(spyCreate).toHaveBeenCalledWith(newNews);
      expect(spySave).toHaveBeenCalled();
    });

    it('should return created news', async () => {
      const result = await service.createNews(newNews);
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
      repository.findBy = jest.fn().mockResolvedValueOnce(foundNews);
    })

    it('should be defined & function', () => {
      expect(service.getNewsList).toBeDefined();
      expect(typeof service.getNewsList).toBe('function');
    });

    it('should have called repository.findBy', async () => {
      await service.getNewsList(pageId);
      expect(repository.findBy).toBeCalled();
    });

    it('should return respository.findBy result', async () => {
      const foundNews = await service.getNewsList(pageId);
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
      newsId = 1;
      foundNews = {...news}
      foundNews.newsId = 1;

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
      newsId = 1;
      foundNews = {...news};
      foundNews.newsId = 1;

      deletedNews = new News();
      deletedNews.newsId = newsId;

      service.getNewsById = jest.fn().mockResolvedValue(foundNews);
      repository.delete = jest.fn().mockResolvedValueOnce({raw: [], affected: 1});
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
      expect(repository.delete).toBeCalled()
    });

    it('should return result ', async () => {
      const result = await service.deleteNews(newsId);
      expect(result).toBeDefined();
      expect(result.result).toBe('success');
      expect(result.newsId).toBe(newsId);
    });
  })
});
