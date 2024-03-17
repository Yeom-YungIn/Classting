import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    id: string;
}