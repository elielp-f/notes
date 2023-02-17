import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateNoteDTO } from './dto';
import { NoteService } from './note.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private noteService : NoteService){}

    @Post('create-note')
    async createNote(@Body() dto: CreateNoteDTO){
        return await this.noteService.createNote(dto);
    }

    @Get(':id')
    async findNoteById(@Param('id') id: string){
        return await this.noteService.findNoteById(Number(id));
    }

    @Get('all/:authorId')
    async findNotesByAuthorId(@Param('authorId') authorId:string){
        return await this.noteService.findNotesByAuthorId(authorId);
    }

    @Delete(':id')
    async deleteNote(@Param('id') id: string){
        return await this.noteService.deleteNote(Number(id));
    }

}
