import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "../entity/news.entity";
import {Repository} from "typeorm";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>
    ) {
    }

    async createNews(newsObj: {pageId: number, content: string}): Promise<News> {
        const newNews = this.newsRepository.create({
            ...newsObj
        });

        return await this.newsRepository.save(newNews);
    }

    async getNewsList(pageId: number) {
        const where = {
            pageId,
            order: {createAt: 'DESC'},
            skip: 0,
            take: 10,
        };

        const option = {
            where,
            order: {createAt: 'DESC'},
            skip: 0,
            take: 10,
        }

        const found = await this.newsRepository.findBy(where)
        return found;
    }

    async getNewsById(newsId: number) {
        const foundNews: News = await this.newsRepository.findOneBy({newsId});
        if (!foundNews) {
            throw new NotFoundException();
        }
        return foundNews;
    }

    async updateNews(newsId: number, content: string) {
        const foundNews: News = await this.getNewsById(newsId);

        const updatedNews = await this.newsRepository.update({newsId: foundNews.newsId}, {content});

        if (updatedNews.affected) {
            return { result: "success", ...foundNews }
        }
    }

    async deleteNews(newsId: number) {
        const foundNews: News = await this.getNewsById(newsId);

        const deletedNews = await this.newsRepository.delete({newsId: foundNews.newsId});
        if (deletedNews.affected) {
            return { result: "success", ...foundNews }
        }
    }
}
