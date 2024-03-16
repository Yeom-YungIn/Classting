import {Body, Controller, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {PageService} from "../service/page.service";
import {Subscribe} from "../entity/subscribe.entity";
import {CreatePageDto} from "../dto/page.dto";
import {SubscribeService} from "../service/subscribe.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {News} from "../entity/news.entity";
import {NewsService} from "../service/news.service";


@ApiTags("학교 페이지 컨트롤러")
@Controller('school-page')
export class SchoolPageController {
    constructor(
        private readonly pageService: PageService,
        private readonly newsService: NewsService,
        private readonly subscribeService: SubscribeService,
    ) {
    }

    @Post()
    @ApiOperation({summary: "학교 페이지 생성 API", description: "학교 관리자는 학교 페이지를 생성할 수 있다"})
    async savePage(@Body() createPageDto: CreatePageDto) {
        const {schoolName, location} = createPageDto;
        return await this.pageService.createPage(schoolName, location);
    }

    @Post("/subscription/:pageId")
    @ApiOperation({summary: "페이지 구독 API", description: "학생은 학교 페이지를 구독할 수 있다."})
    async subscribePage(@Param('pageId') pageId: number) {
        const foundPage = await this.pageService.findPageById(pageId);
        return await this.subscribeService.createSubscribe(foundPage.pageId, 'test');
    }

    @Patch("/subscription/cancel/:pageId")
    @ApiOperation({summary: "페이지 구독 취소 API", description: "학생은 학교 페이지를 구독 취소할 수 있다."})
    async cancelSubscribePage(@Param('pageId') pageId: number) {
        const foundPage = await this.pageService.findPageById(pageId);
        return await this.subscribeService.deleteSubscribe(foundPage.pageId, 'test');
    }

    @Get("/subscription/list")
    @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    async getSubscribePageList(): Promise<Subscribe[]> {
       return await this.subscribeService.getSubscribeList('test');
    }

    @Get("/subscription/news/:pageId")
    @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    async getSubscribePageNewsList(@Param('pageId') pageId: number): Promise<News[]> {
        const userSubscribePage = await this.subscribeService.getSubscribePage(pageId,'test');
        return await this.newsService.getNewsList(userSubscribePage.pageId);
    }

    // // @Get("/subscription/feeds")
    // @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    // async getScribeFeeds(): Promise<News[]> {
    //     const userSubscribePage = await this.subscribeService.getSubscribeList('test');
    //     return await this.newsService.getNewsList(pageId);
    // }
}
