import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';
import { Questionario } from 'src/questionarios/entities/questionario.entity';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { Resposta } from './entities/resposta.entity';

@Injectable()
export class RespostasService {
  constructor(
  @InjectModel(Questionario)
  private questionarioModel: typeof Questionario,
  ){}

  create(createRespostaDto: CreateRespostaDto) {
    return 'This action adds a new resposta';
  }

  findAll() {
    return `This action returns all respostas`;
  }

  async findOne(id: number) {
    return `This action updates a #${id} resposta`;
  }

  update(id: number, updateRespostaDto: UpdateRespostaDto) {
    return `This action updates a #${id} resposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} resposta`;
  }
}
