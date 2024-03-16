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
    async findPageById(pageId: number): Promise<Page> {
        const foundPage = await this.pageRepository.findOneBy({pageId});
        if (!foundPage) {
            throw new NotFoundException("page not found");
        }
        return foundPage
    }

    async createPage(schoolName: string, location: string): Promise<Page> {
        const newPage: Page = this.pageRepository.create({
            schoolName,
            location,
            publisherId: "test"
        });

        return await this.pageRepository.save(newPage);
    }
}
