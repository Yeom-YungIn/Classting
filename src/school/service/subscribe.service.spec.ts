import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeService } from "./subscribe.service";
import {Repository} from "typeorm";
import {Subscribe} from "../entity/subscribe.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {response} from "express";
import {NotFoundException} from "@nestjs/common";

describe('SchoolService', () => {
  let service: SubscribeService;
  let repository: Repository<Subscribe>;
  let pageId: number, userId: string;

  beforeEach(async () => {
    pageId = 1;
    userId = 'testUser';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
          SubscribeService,
        {
          provide: getRepositoryToken(Subscribe),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<SubscribeService>(SubscribeService);
    repository = module.get<Repository<Subscribe>>(getRepositoryToken(Subscribe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSubscribeList',() => {
    let foundSubList: Subscribe[];
    beforeEach(() => {
      foundSubList = [new Subscribe()];
      foundSubList[0].pageId = pageId;
      foundSubList[0].userId = userId;

      repository.findBy = jest.fn().mockResolvedValueOnce(foundSubList);
    });

    it('should be defined & function', () => {
      expect(service.getSubscribeList).toBeDefined();
      expect(typeof service.getSubscribeList).toBe('function');
    });

    it('should have call service.getSubscribePage & repository.update', async () => {
      await service.getSubscribeList(userId);
      expect(repository.findBy).toHaveBeenCalledWith({userId});
    });

    it('should return result', async () => {
      const result = await service.getSubscribeList(userId);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result[0].pageId).toBe(pageId);
      expect(result[0].userId).toBe(userId);
    });
  });

  describe('getSubscribePage',() => {
    let foundSubPage: Subscribe;
    beforeEach(() => {
      foundSubPage = new Subscribe();
      foundSubPage.pageId = pageId;
      foundSubPage.userId = userId;
      foundSubPage.isDeleted = false;

      repository.findOneBy = jest.fn().mockResolvedValueOnce(foundSubPage);
    });

    it('should be defined & function', () => {
      expect(service.getSubscribePage).toBeDefined();
      expect(typeof service.getSubscribePage).toBe('function');
    });

    it('should have call repository.findOneBy', async () => {
      await service.getSubscribePage(pageId, userId);
      expect(repository.findOneBy).toHaveBeenCalledWith({pageId, userId});
    });

    it('should throw NotFoundException if subscribe not found', async () => {
      repository.findOneBy = jest.fn().mockResolvedValueOnce(null); // pageId와 userId를 찾지 못하는 경우
      await expect(service.getSubscribePage(pageId, userId)).rejects.toThrowError(NotFoundException);
    });

    it('should return result', async () => {
      const result = await service.getSubscribePage(pageId, userId);
      expect(result).toBeDefined();
      expect(result.pageId).toBe(pageId);
      expect(result.userId).toBe(userId);
      expect(result.isDeleted).toBe(false);
    });
  });

  describe('createSubscribe', () => {
    let newSubscribe: Subscribe
    beforeEach(() => {
      newSubscribe = new Subscribe();
      newSubscribe.pageId = pageId;
      newSubscribe.userId = userId;

      repository.create = jest.fn();
      repository.save = jest.fn().mockResolvedValue(newSubscribe);
    });

    it('should be defined & function', () => {
      expect(service.createSubscribe).toBeDefined();
      expect(typeof service.createSubscribe).toBe('function');
    });

    it('should have call repository.{create & save}', async () => {
      await service.createSubscribe(pageId, userId);
      expect(repository.create).toBeCalledWith({pageId, userId});
      expect(repository.save).toBeCalled();
    });

    it('return new subscribe object', async () => {
      const result = await service.createSubscribe(pageId, userId);
      expect(result).toBeDefined();
      expect(result.pageId).toBe(pageId);
      expect(result.userId).toBe(userId);
    });
  });

  describe('deleteSubscribe', () => {
    let deletedSubscribe: Subscribe;
    beforeEach(() => {
      deletedSubscribe = new Subscribe();
      deletedSubscribe.userId = userId;
      deletedSubscribe.pageId = pageId;

      service.getSubscribePage = jest.fn().mockResolvedValueOnce(deletedSubscribe);
      repository.update = jest.fn().mockResolvedValue({affected: 1});
    });

    it('should be defined & function',() => {
      expect(service.deleteSubscribe).toBeDefined();
      expect(typeof service.deleteSubscribe).toBe('function');
    });


    it('should have call service.getSubscribePage & repository.update', async () => {
      await service.deleteSubscribe(pageId, userId);
      expect(service.getSubscribePage).toHaveBeenCalledWith(pageId, userId);
      expect(repository.update).toHaveBeenCalled();
    });

    it('should return result', async () => {
      const result = await service.deleteSubscribe(pageId, userId);
      expect(result).toBeDefined();
      expect(result.result).toBe('success');
      expect(result.pageId).toBe(pageId)
    });
  });

});
