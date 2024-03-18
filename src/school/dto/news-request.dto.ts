import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {SortTypes} from "../../common/types";

export class CreateNewsDTO {
    @ApiProperty({ example: 1, description: "페이지 ID" })
    @IsNumber()
    @IsNotEmpty()
    pageId: number;

    @ApiProperty({ example: 'example content', description: "뉴스 내용" })
    @IsString()
    content: string;
}

export class UpdateNewsDTO {
    @ApiProperty({ example: 1, description: "뉴스 ID" })
    @IsNumber()
    @IsNotEmpty()
    newsId: number;

    @ApiProperty({ example: 'example content', description: "뉴스 내용" })
    @IsString()
    content: string;
}

export class DeleteNewsDTO {
    @ApiProperty({ example: 1, description: "뉴스 ID" })
    @IsNumber()
    @IsNotEmpty()
    newsId: number;
}

export class SubscribePageNewsListDTO {
    @ApiProperty({ example: '1', description: "페이지 ID" })
    @IsNumber()
    @IsNotEmpty()
    pageId: number;

    @ApiProperty({ example: 'desc', description: "생성일 기준 정렬" })
    @IsOptional()
    @IsString()
    createdAt: SortTypes;

    @ApiProperty({ example: 'desc', description: "수정일 기준 정렬" })
    @IsOptional()
    @IsString()
    updatedAt: SortTypes;

    @ApiProperty({ example: 0, description: "offset" })
    @IsOptional()
    @IsNumber()
    skip: number;

    @ApiProperty({ example: 10, description: "limit" })
    @IsOptional()
    @IsNumber()
    take: number;
}