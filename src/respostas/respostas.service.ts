import { Injectable } from '@nestjs/common';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';

@Injectable()
export class RespostasService {
  create(createRespostaDto: CreateRespostaDto) {
    return 'This action adds a new resposta';
  }

  findAll() {
    return `This action returns all respostas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resposta`;
  }

  update(id: number, updateRespostaDto: UpdateRespostaDto) {
    return `This action updates a #${id} resposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} resposta`;
  }
}
