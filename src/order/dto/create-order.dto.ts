import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: 'name', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'username', description: 'Admin last name'})
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsEmail()
    @IsNotEmpty()
    email: string;
}