import { Module } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { QuestionariosController } from './questionarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questionario } from './entities/questionario.entity';

@Module({
  imports:
    [
      SequelizeModule.forFeature(
        [
          Questionario,

        ]
      ),
    ],
  controllers: [QuestionariosController],
  providers: [QuestionariosService],
  exports: [QuestionariosService]
})
export class QuestionariosModule {}
