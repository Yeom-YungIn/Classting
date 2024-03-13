import { Test, TestingModule } from '@nestjs/testing';
import {PageService} from "./page.service";
import {Repository} from "typeorm";
import {Page} from "../entity/page.entity";
import {getRepositoryToken} from "@nestjs/typeorm";



describe('PageService', () => {
  let service: PageService;
  let repository: Repository<Page>;


  beforeEach(async () => {


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

});
