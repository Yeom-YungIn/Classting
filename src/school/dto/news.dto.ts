import {IsNumber, IsString} from "class-validator";

export class CreateNewsDto {
    @IsNumber()
    pageId: number;

    @IsString()
    content: string;
}

export class UpdateNewsDto {
    @IsString()
    content: string;
}