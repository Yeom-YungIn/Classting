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

    async getSubscribeList(userId: string): Promise<Subscribe[]> {
        return this.subscribeRepository.findBy({userId});
    }

    async getSubscribePage(pageId: number, userId: string): Promise<Subscribe> {
        const foundSubscribePage: Subscribe =  await this.subscribeRepository.findOneBy({pageId, userId})
        if(!foundSubscribePage) {
            throw new NotFoundException();
        }
        return foundSubscribePage;
    }

    async createSubscribe(pageId: number, userId: string) {
        const createdSubscribe = await this.subscribeRepository.create({
            pageId,
            userId,
        });

        return await this.subscribeRepository.save(createdSubscribe);
    }

    async deleteSubscribe(pageId: number, userId: string): Promise<{result: string, pageId: number}> {
        const foundSubscribe: Subscribe = await this.getSubscribePage(pageId, userId);

        const deleteSubscribe = await this.subscribeRepository
            .update({pageId, userId}, {isDeleted: true, deletedAt: new Date()});

        if (deleteSubscribe.affected) {
            return { result: "success", pageId: foundSubscribe.pageId }
        }
    }


}
