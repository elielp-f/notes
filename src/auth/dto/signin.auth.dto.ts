import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninAuthDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}