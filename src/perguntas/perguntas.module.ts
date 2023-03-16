import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pergunta } from './entities/pergunta.entity';

@Module({
  imports:
    [
      SequelizeModule.forFeature(
        [
          Pergunta,
        ]
      ),
    ],
  controllers: [PerguntasController],
  providers: [PerguntasService],
  exports: [PerguntasService]
})
export class PerguntasModule {}
