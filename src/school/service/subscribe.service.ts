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
            isDeleted: false
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
        const createdSubscribe = await this.subscribeRepository.create({
            pageId,
            userId,
        });

        return await this.subscribeRepository.save(createdSubscribe);
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
}
