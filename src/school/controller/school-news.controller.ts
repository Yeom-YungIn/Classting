import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {NewsService} from "../service/news.service";
import {CreateNewsDto, UpdateNewsDto} from "../dto/news.dto";
import {ApiOperation} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../common/decorator/get-user-decorator";


@Controller('school-news')
@UseGuards(AuthGuard())
export class SchoolNewsController {
    constructor(
        private readonly newsService : NewsService
    ) {
    }

    @Post()
    @ApiOperation({summary: "뉴스 생성 API", description: "학교 관지라는 학교 페이지 내에 소식을 작성할 수 있다."})
    async createNews(
        @Body() newsDto: CreateNewsDto,
        @GetUser() user
    ) {
        const {pageId, content} = newsDto;
        return await this.newsService.createNews(pageId, content, user.id);
    }

    @Patch('/:newsId')
    @ApiOperation({summary: "뉴스 수정 API", description: "학교 관지라는 작성된 소식을 수정할 수 있다."})
    async updateNews(
        @Param('newsId') newsId: number,
        @Body() updateNewsDto: UpdateNewsDto
    ) {
        const updatedNews =  await this.newsService.updateNews(newsId, updateNewsDto.content);
        return updatedNews;
    }

    @Delete('/:newsId')
    @ApiOperation({summary: "뉴스 삭제 API", description: "학교 관지라는 작성된 소식을 삭제할 수 있다."})
    async deleteNews(@Param('newsId') newsId: number) {
        return await this.newsService.deleteNews(newsId);
    }
}
