import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddAdminDto {
    @ApiProperty({ example: 'firstname', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'username', description: 'Admin last name'})
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}