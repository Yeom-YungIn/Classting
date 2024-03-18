import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthCredentialDto {
    @ApiProperty({ example: 'admin', description: "유저 ID" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    id: string;
}