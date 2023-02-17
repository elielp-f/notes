import { Injectable, UseGuards } from '@nestjs/common';
import { NoteRepository } from 'src/repositories/note.repository';
import { CreateNoteDTO } from './dto';



@Injectable()
export class NoteService {
    constructor(private noteRepository:NoteRepository){}

    async createNote(dto: CreateNoteDTO){
        const note = await this.noteRepository.create(
            dto.title,
            dto.content,
            dto.authorName,
            dto.authorId
        );

        return note;
    }

    async findNoteById(id: number){
        const note = await this.noteRepository.findNoteById(id);
        return note;
    }

    async findNotesByAuthorId(authorId: string){
        const notes = await this.noteRepository.findNotesByAuthorId(authorId);
        return notes;
    }

    async deleteNote(id: number){
        const note = await this.noteRepository.deleteNoteById(id);
        return note;
    }
}
