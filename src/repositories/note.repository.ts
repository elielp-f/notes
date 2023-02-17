import { PrismaClient } from "@prisma/client";

export class NoteRepository extends PrismaClient{
    async create(title: string, content: string, authorName: string, authorId: string){
        const note = await this.note.create({
            data: {
                title,
                content,
                authorName,
                authorId
            }
        });
        return note;
    }

    async findNoteById(id: number){
        const note = await this.note.findUnique({
            where: {
                id,
            }
        });
        return note;
    }

    async findNotesByAuthorId(authorId: string){
        const notes = await this.note.findMany({
            where:{
                authorId,
            }
        });
        return notes;
    }

    async deleteNoteById(id: number){
        const deletedNote = await this.note.delete({
            where:{
                id,
            }
        });
        return deletedNote;
    }
}