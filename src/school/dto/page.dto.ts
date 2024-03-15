import {IsString} from "class-validator";

export class PageDto {
    @IsString()
    schoolName: string;

    @IsString()
    location: string;
}