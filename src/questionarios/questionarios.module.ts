import { Module } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { QuestionariosController } from './questionarios.controller';

@Module({
  controllers: [QuestionariosController],
  providers: [QuestionariosService]
})
export class QuestionariosModule {}
