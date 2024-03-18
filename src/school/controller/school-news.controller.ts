import {Body, Controller, Delete, Patch, Post, UseGuards} from '@nestjs/common';
import {NewsService} from "../service/news.service";
import {CreateNewsDTO, DeleteNewsDTO, UpdateNewsDTO} from "../dto/news-request.dto";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../common/decorator/get-user-decorator";
import {SuccessResponseNewsDTO, ResponseNewsDTO} from "../dto/news-response.dto";
import {News} from "../entity/news.entity";


@ApiTags('/school-news')
@Controller('/school-news')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
export class SchoolNewsController {
    constructor(
        private readonly newsService : NewsService
    ) {
    }

    @Post()
    @ApiOperation({summary: "뉴스 생성", description: "학교 관지라는 학교 페이지 내에 소식을 작성할 수 있다."})
    @ApiCreatedResponse({
        status: 201,
        description: "create new news",
        type: ResponseNewsDTO,
    })
    async createNews(
        @Body() createNewsDto: CreateNewsDTO,
        @GetUser() user
    ): Promise<ResponseNewsDTO> {
        return await this.newsService.createNews(createNewsDto.pageId, createNewsDto.content, user.id);
    }

    @Patch()
    @ApiOperation({summary: "뉴스 수정", description: "학교 관지라는 작성된 소식을 수정할 수 있다."})
    @ApiOkResponse({
        status: 201,
        description: "update new news",
        type: SuccessResponseNewsDTO,
    })
    async updateNews(
        @Body() updateNewsDto: UpdateNewsDTO
    ): Promise<SuccessResponseNewsDTO> {
        const updatedNews =  await this.newsService.updateNews(updateNewsDto.newsId, updateNewsDto.content);
        return updatedNews;
    }

    @Delete()
    @ApiOperation({summary: "뉴스 삭제", description: "학교 관지라는 작성된 소식을 삭제할 수 있다."})
    @ApiOkResponse({
        status: 201,
        description: "delete new news",
        type: SuccessResponseNewsDTO,
    })
    async deleteNews(
        @Body() deleteNews: DeleteNewsDTO
    ): Promise<SuccessResponseNewsDTO> {
        return await this.newsService.deleteNews(deleteNews.newsId);
    }
}
