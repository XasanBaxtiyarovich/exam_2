import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDataDto {
    @ApiProperty({ example: 'firstname', description: 'Admin first name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'lastname', description: 'Admin last name'})
    @IsString()
    @IsNotEmpty()
    user_name: string;
}