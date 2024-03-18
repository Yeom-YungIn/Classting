import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePageDTO {
    @ApiProperty({ example: 'TEST SCHOOL', description: "학교명" })
    @IsString()
    schoolName: string;

    @ApiProperty({ example: 'SEOUL', description: "학교 위치" })
    @IsString()
    location: string;
}