import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Questionario } from './entities/questionario.entity';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectModel(Questionario)
    private questionarioModel: typeof Questionario,
  ) { }

  create(createQuestionarioDto: CreateQuestionarioDto) {
    return 'olar'
  }

  findAll() {
    return this.questionarioModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} questionario`;
  }

  update(id: number, updateQuestionarioDto: UpdateQuestionarioDto) {
    return `This action updates a #${id} questionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionario`;
  }
}
