import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {PageService} from "../service/page.service";
import {Subscribe} from "../entity/subscribe.entity";
import {CreatePageDto} from "../dto/page.dto";
import {SubscribeService} from "../service/subscribe.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {News} from "../entity/news.entity";
import {NewsService} from "../service/news.service";
import {GetUser} from "../../common/decorator/get-user-decorator";
import {AuthGuard} from "@nestjs/passport";
import {UserRoleType} from "../../auth/types";


@ApiTags("/school-page")
@Controller('/school-page')
@UseGuards(AuthGuard())
export class SchoolPageController {
    constructor(
        private readonly pageService: PageService,
        private readonly newsService: NewsService,
        private readonly subscribeService: SubscribeService,
    ) {
    }

    @Post()
    @ApiOperation({summary: "학교 페이지 생성 API", description: "학교 관리자는 학교 페이지를 생성할 수 있다"})
    async savePage(
        @Body() createPageDto: CreatePageDto,
        @GetUser() user
    ) {
        if (user.role !== UserRoleType.ADMIN) {
            throw new UnauthorizedException();
        }
        const {schoolName, location} = createPageDto;
        return await this.pageService.createPage(schoolName, location, user);
    }

    @Post("/subscription/:pageId")
    @ApiOperation({summary: "페이지 구독 API", description: "학생은 학교 페이지를 구독할 수 있다."})
    async subscribePage(
        @Param('pageId') pageId: number,
        @GetUser() user
    ) {
        const foundPage = await this.pageService.findPageById(pageId);
        return await this.subscribeService.createSubscribe(foundPage.pageId, user.id);
    }

    @Patch("/subscription/cancel/:pageId")
    @ApiOperation({summary: "페이지 구독 취소 API", description: "학생은 학교 페이지를 구독 취소할 수 있다."})
    async cancelSubscribePage(
        @Param('pageId') pageId: number,
        @GetUser() user
    ) {
        const foundPage = await this.pageService.findPageById(pageId);
        return await this.subscribeService.deleteSubscribe(foundPage.pageId, user.id);
    }

    @Get("/subscription/list")
    @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    async getSubscribePageList( @GetUser() user ): Promise<Subscribe[]> {
       return await this.subscribeService.getSubscribeList(user.id);
    }

    @Get("/subscription/news/:pageId")
    @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    async getSubscribePageNewsList(
        @Param('pageId') pageId: number,
        @GetUser() user
    ): Promise<News[]> {
        const userSubscribePage = await this.subscribeService.getSubscribePage(pageId,user.id);
        return await this.newsService.getNewsList(userSubscribePage.pageId);
    }

    // // @Get("/subscription/feeds")
    // @ApiOperation({summary: "구독 페이지별 뉴스 조회 API", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    // async getScribeFeeds(): Promise<News[]> {
    //     const userSubscribePage = await this.subscribeService.getSubscribeList('test');
    //     return await this.newsService.getNewsList(pageId);
    // }
}
