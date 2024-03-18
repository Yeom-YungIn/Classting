import { IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({ example: "success", description: "login result" })
    result: string;

    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN0dWRlbnQiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTcxMDc0OTg1NSwiZXhwIjoxNzEwNzUzNDU1fQ.423cy72Cl29Rp6bpPU8E9Y93vADfqXwleZtXq7V", description: "jwt token"})
    @IsString()
    accessToken: string
}