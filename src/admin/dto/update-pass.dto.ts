import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: '5432!ytrewQ', description: 'Admin new password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    new_password: string;

    @ApiProperty({ example: '5432!ytrewQ', description: 'Admin new password confirm'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    confirm_password: string;
}