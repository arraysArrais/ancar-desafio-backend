import { Module } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { RespostasController } from './respostas.controller';

@Module({
  controllers: [RespostasController],
  providers: [RespostasService],
  exports: [RespostasService]
})
export class RespostasModule {}
