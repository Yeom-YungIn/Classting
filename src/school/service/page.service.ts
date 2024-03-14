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

    async createPage(newPageData: {schoolName: string, location: string}): Promise<Page> {
        const newPage: Page = this.pageRepository.create({
            ...newPageData,
        });

        return await this.pageRepository.save(newPage);
    }
}
