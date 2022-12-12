import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateSignUpDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}
