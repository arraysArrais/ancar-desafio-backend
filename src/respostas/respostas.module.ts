import { Module } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { RespostasController } from './respostas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questionario } from 'src/questionarios/entities/questionario.entity';
import { Resposta } from './entities/resposta.entity';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';

@Module({
  imports:
    [
      SequelizeModule.forFeature(
        [
          Resposta,
          Questionario,
          Pergunta
        ]
      ),
    ],
  controllers: [RespostasController],
  providers: [RespostasService],
  exports: [RespostasService]
})
export class RespostasModule {}
