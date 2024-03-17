import {IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    id: string;
}