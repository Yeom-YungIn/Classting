import {
    Body,
    Controller, ForbiddenException,
    Get,
    Param,
    Patch,
    Post, Query,
    UseGuards
} from '@nestjs/common';
import {PageService} from "../service/page.service";
import {Subscribe} from "../entity/subscribe.entity";
import {SubscribeService} from "../service/subscribe.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {News} from "../entity/news.entity";
import {NewsService} from "../service/news.service";
import {GetUser} from "../../common/decorator/get-user-decorator";
import {AuthGuard} from "@nestjs/passport";
import {UserRoleType} from "../../common/types";
import {User} from "../../auth/entity/user.entity";
import {SubscribePageNewsListDTO} from "../dto/news-request.dto";
import {CreatePageDTO} from "../dto/page-request.dto";
import {ResponsePageDTO, SuccessResponsePageDTO} from "../dto/page-response.dto";
import {Page} from "../entity/page.entity";
import {ResponseSubscribeDTO} from "../dto/subscribe-response.dto";
import {ResponseNewsDTO} from "../dto/news-response.dto";


@ApiTags("/school-page")
@Controller('/school-page')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
export class SchoolPageController {
    constructor(
        private readonly pageService: PageService,
        private readonly newsService: NewsService,
        private readonly subscribeService: SubscribeService,
    ) {
    }

    @Post()
    @ApiOperation({summary: "학교 페이지 생성", description: "학교 관리자는 학교 페이지를 생성할 수 있다"})
    @ApiCreatedResponse({
        status: 201,
        description: "create new page",
        type: ResponsePageDTO,
    })
    async savePage(
        @Body() createPageDto: CreatePageDTO,
        @GetUser() user
    ): Promise<ResponsePageDTO> {
        if (user.role !== UserRoleType.ADMIN) {
            throw new ForbiddenException();
        }
        const {schoolName, location} = createPageDto;
        return await this.pageService.createPage(schoolName, location, user.id);
    }

    @Post("/subscription/:pageId")
    @ApiOperation({summary: "페이지 구독", description: "학생은 학교 페이지를 구독할 수 있다."})
    @ApiCreatedResponse({
        status: 201,
        description: "create new subscribe",
        type: ResponseSubscribeDTO,
    })
    async subscribePage(
        @Param('pageId') pageId: number,
        @GetUser() user
    ): Promise<ResponseSubscribeDTO> {
        if (user.role !== UserRoleType.STUDENT) {
            throw new ForbiddenException();
        }
        const foundPage = await this.pageService.findPageById(pageId);
        return await this.subscribeService.createSubscribe(foundPage.pageId, user.id);
    }

    @Patch("/subscription/cancel/:pageId")
    @ApiOperation({summary: "페이지 구독 취소", description: "학생은 학교 페이지를 구독 취소할 수 있다."})
    @ApiOkResponse({
        status: 201,
        description: "create new subscribe",
        type: SuccessResponsePageDTO,
    })
    async cancelSubscribePage(
        @Param('pageId') pageId: number,
        @GetUser() user
    ): Promise<SuccessResponsePageDTO> {
        if (user.role !== UserRoleType.STUDENT) {
            throw new ForbiddenException();
        }

        const foundPage: Page = await this.pageService.findPageById(pageId);
        return await this.subscribeService.deleteSubscribe(foundPage.pageId, user.id);
    }

    @Get("/subscription/list")
    @ApiOperation({summary: "구독 목록 조회", description: "학생은 구독중인 학교의 목록을 볼 수 있다."})
    @ApiOkResponse({
        status: 201,
        description: "create new subscribe",
        type: [ResponseSubscribeDTO]
    })
    async getSubscribePageList( @GetUser() user ): Promise<Subscribe[]> {
       return await this.subscribeService.getSubscribeList(user.id);
    }

    @Get("/subscription/news")
    @ApiOperation({summary: "구독 페이지별 뉴스 조회", description: "학생은 구독중인 학교 페이지별 소식을 볼 수 있다."})
    @ApiOkResponse({
        status: 201,
        description: "create new subscribe",
        type: ResponseNewsDTO,
    })
    async getSubscribePageNewsList(
        @Query() query: SubscribePageNewsListDTO,
        @GetUser() user: User
    ): Promise<News[]> {
        const {pageId, createdAt, updatedAt, skip, take} = query;
        const userSubscribePage = await this.subscribeService.getSubscribePage(pageId,user.id);
        return await this.newsService.getNewsList(userSubscribePage.pageId,createdAt, updatedAt, skip, take);
    }

}
