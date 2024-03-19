import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Subscribe} from "../entity/subscribe.entity";
import {Repository} from "typeorm";

@Injectable()
export class SubscribeService {
    constructor(
        @InjectRepository(Subscribe)
        private readonly subscribeRepository: Repository<Subscribe>
    ) {
    }
    /**
     * 페이지 구독 목록 조회
     * @param userId 유저 ID
     * */
    async getSubscribeList(userId: string): Promise<Subscribe[]> {
        return this.subscribeRepository.findBy({
            userId,
            isDeleted: false,
        });
    }

    /**
     * 페이지 구독 여부 조회
     * @param pageId 페이지 ID
     * @param userId 유저 ID
     * */
    async getSubscribePage(pageId: number, userId: string): Promise<Subscribe> {
        const foundSubscribePage: Subscribe =  await this.subscribeRepository.findOneBy({pageId, userId, isDeleted: false})
        if(!foundSubscribePage) {
            throw new NotFoundException();
        }
        return foundSubscribePage;
    }

    /**
     * 구독 생성
     * @param pageId 페이지 ID
     * @param userId 유저 ID
     * */
    async createSubscribe(pageId: number, userId: string): Promise<Subscribe> {
        const existingSubscribe = await this.subscribeRepository.findOne({ where: { pageId, userId } });

        if (existingSubscribe) {
            existingSubscribe.isDeleted = false;
            existingSubscribe.deletedAt = null;
            return await this.subscribeRepository.save(existingSubscribe);
        } else {
            const createdSubscribe = await this.subscribeRepository.create({
                pageId,
                userId,
            });
            return await this.subscribeRepository.save(createdSubscribe);
        }
    }

    /**
     * 구독 삭제
     * @param pageId 페이지 ID
     * @param userId 유저 ID
     * */
    async deleteSubscribe(pageId: number, userId: string): Promise<{result: string, pageId: number}> {
        const foundSubscribe: Subscribe = await this.getSubscribePage(pageId, userId);

        const deleteSubscribe = await this.subscribeRepository
            .update({pageId, userId}, {isDeleted: true, deletedAt: new Date()});

        if (deleteSubscribe.affected) {
            return { result: "success", pageId: foundSubscribe.pageId }
        }
    }

    /**
     * 뉴스 피드 조회
     * @param userId 유저 ID
     * */
    async getNewsFeeds(userId: string): Promise<{newsId: number, content: string}[]> {
        return await this.subscribeRepository
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.page', 'p')
            .innerJoinAndSelect('p.news', 'n')
            .where('s.userId = :userId', { userId })
            .andWhere('((s.isDeleted = true and s.deletedAt > n.createdAt) or (s.isDeleted = false and n.createdAt >= s.createdAt))')
            .select([
                'n.newsId AS newsId',
                'n.content AS content'
            ])
            .orderBy('n.updatedAt', 'DESC')
            .orderBy('n.createdAt', 'DESC')
            .getRawMany();
    }
}
