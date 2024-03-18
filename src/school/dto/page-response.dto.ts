import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SuccessResponsePageDTO {

    @ApiProperty({ example: 'success', description: "결과" })
    @IsString()
    result: string;

    @ApiProperty({ example: 1, description: "페이지 ID" })
    @IsNumber()
    @IsNotEmpty()
    pageId: number;
}


export class ResponsePageDTO {
    @ApiProperty({ example: 1, description: "페이지 ID" })
    pageId: number;

    @ApiProperty({ example: "TEST SCHOOL", description: "학교명" })
    schoolName: string;

    @ApiProperty({ example: "SEOUL", description: "학교 위치" })
    location: string;

    @ApiProperty({ example: "admin", description: "생성자" })
    publisherId: string;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "생성일" })
    createdAt: Date;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "수정일" })
    updatedAt: Date;

    @ApiProperty({ example: false, description: "삭제 여부" })
    isDeleted: boolean = false;

    @ApiProperty({ example: "2024-03-17 15:50:54.304", description: "삭제일" })
    deletedAt: Date;
}
