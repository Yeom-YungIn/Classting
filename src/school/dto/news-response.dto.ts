import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SuccessResponseNewsDTO {
    constructor() {
    }

    @ApiProperty({ example: 'success', description: "결과" })
    @IsString()
    result: string;

    @ApiProperty({ example: 1, description: "뉴스 ID" })
    @IsNumber()
    @IsNotEmpty()
    newsId: number;
}

export class ResponseNewsDTO {
    @ApiProperty({ example: "1", description: "뉴스 ID" })
    @IsNumber()
    newsId: number;

    @ApiProperty({ example: "1", description: "페이지 ID" })
    @IsNumber()
    pageId: number;

    @ApiProperty({ example: "TEST_CONTENT", description: "뉴스 내용" })
    @IsString()
    content: string;

    @ApiProperty({ example: "admin", description: "뉴스 ID" })
    @IsString()
    publisherId: string;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "생성일" })
    createdAt: Date;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "수정일" })
    updatedAt: Date;

    @ApiProperty({ example: false, description: "삭제 여부" })
    isDeleted: boolean  = false;

    @ApiProperty({ example: null, description: "삭제일" })
    deletedAt: Date;
}