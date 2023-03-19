import { Injectable, Res, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Questionario } from './entities/questionario.entity';
import { AppService } from '../app.service';
import { User } from 'src/users/entities/user.entity';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectModel(Questionario)
    private questionarioModel: typeof Questionario,
    private readonly appService: AppService,
    @InjectModel(Pergunta)
    private readonly perguntaModel: typeof Pergunta,
  ) { }

  async create(createQuestionarioDto: CreateQuestionarioDto, @Res() res) {
    if (createQuestionarioDto.name && createQuestionarioDto.description && createQuestionarioDto.userId && createQuestionarioDto.perguntas) {
      const { name, description, userId, perguntas } = createQuestionarioDto;
      const newQuestionario = await this.questionarioModel.create({
        name,
        description,
        userId,
      });

      for (const pergunta of perguntas) {
        await this.perguntaModel.create({
          title: pergunta.title,
          questionarioId: newQuestionario.id,
        });
      }

      //buscando questionario criado na base
      let responseQuestionario = await this.questionarioModel.findByPk(newQuestionario.id, {
        include: Pergunta
      });

      res.status(201).json({
        error: false,
        questionario: responseQuestionario
      });
    }
    else {
      res.status(400).json({
        error: true,
        message: 'Bad Request: name, description, userId, and perguntas are required fields',
      });
    }
  }


  async findAll(page: number = 1): Promise<Questionario[]> {
    const limit = 10;
    const offset = (page - 1) * limit;

    return this.questionarioModel.scope('withPerguntas').findAll({
      offset,
      limit,
    });
  }

  async findOne(id: number, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id, {
      include: Pergunta
    });

    if (!questionario) {
      res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario')
      });
    }

    else {
      res.json({
        error: false,
        questionario
      })
    }

  }

  async update(id: number, updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id, {
      include: Pergunta,
    });

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

    let perguntasRequest = updateQuestionarioDto.perguntas;
    // console.log(perguntasRequest);

    // recebendo o payload de perguntas enviado pela request e percorrendo cada elemento
    // buscando cada pergunta no banco pelo id enviado na request e atualizando o titulo de acordo com o valor enviado na request
    const promises = perguntasRequest.map(async (e) => {
      let perguntaToUpdate = await this.perguntaModel.findOne({
        where: {
          id: e.id,
          questionarioId: questionario.id
        }
      });
      // console.log("ENTREI AQUI!!!");
      // console.log(perguntaToUpdate);

      if (perguntaToUpdate == null || perguntaToUpdate == undefined) {
        return res.status(400).json({
          error: true,
          msg: `id de pergunta fornecido não foi encontrado para este questionario ou não existe`
        })
      }

      await perguntaToUpdate.update({
        title: e.title
      });
    });

    await Promise.all(promises);

    await questionario.update({
      name: updateQuestionarioDto.name,
      description: updateQuestionarioDto.description,
    });

    questionario = await this.questionarioModel.findByPk(id, {
      include: Pergunta
    })

    return await res.json({
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
      res.status.json({
        error: false,
        msg: `questionario id ${id} deleted`
      });
    }
  }


}
