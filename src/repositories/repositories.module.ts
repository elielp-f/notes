import { Global, Module } from '@nestjs/common';
import { NoteRepository } from './note.repository';
import { userRepository } from './user.repository';

@Global()
@Module({
    providers: [userRepository, NoteRepository],
    exports: [userRepository, NoteRepository]
})
export class RepositoriesModule {}
export { userRepository };

