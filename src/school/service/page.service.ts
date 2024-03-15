import { Injectable } from '@nestjs/common';
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
        return await this.pageRepository.findOneBy({pageId});
    }

    async createPage(schoolName: string, location: string): Promise<Page> {
        const newPage: Page = this.pageRepository.create({
            schoolName,
            location,
        });

        return await this.pageRepository.save(newPage);
    }
}
