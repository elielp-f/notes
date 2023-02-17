import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { NoteModule } from './note/note.module';
import { JwtMiddleware } from './auth/strategy/jwtmiddleware';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, RepositoriesModule, NoteModule],
})
export class AppModule {}
