import {IsString} from "class-validator";

export class CreatePageDto {
    @IsString()
    schoolName: string;

    @IsString()
    location: string;
}