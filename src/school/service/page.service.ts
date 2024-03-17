import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Page} from "../entity/page.entity";
import {Repository} from "typeorm";

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(Page)
        private readonly pageRepository: Repository<Page>
    ) {
    }
    /**
     * 페이지 ID 조회
     * @param pageId 페이지 ID
     * */
    async findPageById(pageId: number): Promise<Page> {
        const foundPage = await this.pageRepository.findOneBy({pageId});
        if (!foundPage) {
            throw new NotFoundException("page not found");
        }
        return foundPage
    }

    /**
     * 페이지 생성
     * @param schoolName 학교명
     * @param location 학교위치
     * @param publisherId 생성자 ID
     * */
    async createPage(schoolName: string, location: string, publisherId: string): Promise<Page> {
        const newPage: Page = this.pageRepository.create({
            schoolName,
            location,
            publisherId,
        });

        return await this.pageRepository.save(newPage);
    }
}
