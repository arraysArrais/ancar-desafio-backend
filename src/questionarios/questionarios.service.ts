import { Injectable, Res, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Questionario } from './entities/questionario.entity';
import { AppService } from '../app.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectModel(Questionario)
    private questionarioModel: typeof Questionario,
    private readonly appService: AppService
  ) { }

  async create(createQuestionarioDto: CreateQuestionarioDto, @Res() res) {
    if (createQuestionarioDto.name && createQuestionarioDto.description && createQuestionarioDto.userId) {
      let newQuestionario = await this.questionarioModel.create({
        name: createQuestionarioDto.name,
        description: createQuestionarioDto.description,
        userId: createQuestionarioDto.userId,
      });

      res.status(201).json({
        error: false,
        newQuestionario
      })
    }
  }

  async findAll(page: number = 1): Promise<Questionario[]> {
    const limit = 10;
    const offset = (page - 1) * limit;

    return this.questionarioModel.findAll({
      offset,
      limit,
    })

    // return this.questionarioModel.findAll({
    //   attributes:['id', 'name', 'description', 'createdAt', 'updatedAt'],
    //   offset,
    //   limit,
    //   include: User
    // });
  }

  async findOne(id: number, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id);

    if (!questionario) {
       res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario')
      });
    }

    else{
      res.json({
        error: false,
        questionario
      })
    }
    
  }

  async update(id: number, updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id);

    if (!questionario) {
      //parando a execução para não dar erro no console ao tentar mandar a response novamente
      return res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario')
      });
    }

    if (updateQuestionarioDto.name == null) {
      updateQuestionarioDto.name = questionario.name;
    }

    if (updateQuestionarioDto.description == null) {
      updateQuestionarioDto.description = questionario.description;
    }

    questionario.update({
      name: updateQuestionarioDto.name,
      description: updateQuestionarioDto.description,
    });

    res.json({
      error: false,
      questionario
    });
  }

  async remove(id: number, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id);

    if (!questionario) {
      res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario')
      });
    }

    else {
      questionario.destroy();
      res.status(404).json({
        error: false,
        msg: `questionario id ${id} deleted`
      });
    }
  }


}
