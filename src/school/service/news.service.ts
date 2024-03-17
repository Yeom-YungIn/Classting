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


    /**
     * 뉴스 생성
     * @param pageId 페이지 ID
     * @param content 뉴스 내용
     * @param publisherId 생성자 ID
     * */
    async createNews(pageId: number, content: string, publisherId: string): Promise<News> {
        const newNews = this.newsRepository.create({
            pageId,
            content,
            publisherId,
        });

        return await this.newsRepository.save(newNews);
    }

    /**
     * 페이지 뉴스 조회
     * @param pageId 페이지 ID
     * */
    async getNewsList(pageId: number) {
        const found = await this.newsRepository.find({
            where: { pageId },
            order: { createdAt: 'DESC' },
            skip: 0,
            take: 10,
        });
        return found;
    }

    /**
     * 뉴스 조회
     * @param newsId 뉴스 ID
     * */
    async getNewsById(newsId: number) {
        const foundNews: News = await this.newsRepository.findOneBy({newsId});
        if (!foundNews) {
            throw new NotFoundException();
        }
        return foundNews;
    }

    /**
     * 뉴스 수정
     * @param newsId 뉴스 ID
     * @param content  뉴스 내용
     * */
    async updateNews(newsId: number, content: string): Promise<{ result: string, newsId: number}> {
        const foundNews: News = await this.getNewsById(newsId);

        const updatedNews = await this.newsRepository.update({newsId: foundNews.newsId}, {content});

        if (updatedNews.affected) {
            return { result: "success", newsId: foundNews.newsId }
        }
    }

    /**
     * 뉴스 삭제
     * @param newsId 뉴스 ID
     * */
    async deleteNews(newsId: number) {
        const foundNews: News = await this.getNewsById(newsId);

        const deletedNews = await this.newsRepository.update({newsId: foundNews.newsId}, {isDeleted: true, deletedAt: new Date()});
        if (deletedNews.affected) {
            return { result: "success", newsId: foundNews.newsId }
        }
    }
}
