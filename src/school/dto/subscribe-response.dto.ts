import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Column, CreateDateColumn, DeleteDateColumn, ManyToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Page} from "../entity/page.entity";

export class ResponseSubscribeDTO {

    @ApiProperty({ example: "student", description: "유저 ID" })
    userId: string;

    @ApiProperty({ example: 1, description: "페이지 ID" })
    pageId: number;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "생성일" })
    createdAt: Date;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "수정일" })
    updatedAt: Date;

    @ApiProperty({ example: false, description: "삭제 여부" })
    isDeleted: boolean = false;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "삭제일" })
    deletedAt: Date;
}