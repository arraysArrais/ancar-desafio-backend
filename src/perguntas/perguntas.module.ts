import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pergunta } from './entities/pergunta.entity';
import { Resposta } from 'src/respostas/entities/resposta.entity';

@Module({
  imports:
    [
      SequelizeModule.forFeature(
        [
          Pergunta,
          Resposta
        ]
      ),
    ],
  controllers: [PerguntasController],
  providers: [PerguntasService],
  exports: [PerguntasService]
})
export class PerguntasModule {}
