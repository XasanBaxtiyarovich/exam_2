import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'user_name', description: 'Admin username'})
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsNotEmpty()
    password: string;
}