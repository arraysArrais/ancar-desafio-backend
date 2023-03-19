import { Module } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { QuestionariosController } from './questionarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questionario } from './entities/questionario.entity';
import { AppService } from 'src/app.service';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';
import { Resposta } from 'src/respostas/entities/resposta.entity';

@Module({
  imports:
    [
      SequelizeModule.forFeature(
        [
          Questionario,
          Pergunta,
          Resposta
        ]
      ),
    ],
  controllers: [QuestionariosController],
  providers: [QuestionariosService, AppService], 
  exports: [QuestionariosService]
})
export class QuestionariosModule {}
