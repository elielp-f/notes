import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDTO{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    authorName:string;

    @IsString()
    @IsNotEmpty()
    authorId:string;
}