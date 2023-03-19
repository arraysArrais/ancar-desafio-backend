import { Injectable, Res, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Questionario } from './entities/questionario.entity';
import { AppService } from '../app.service';
import { User } from 'src/users/entities/user.entity';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';
import { Resposta } from 'src/respostas/entities/resposta.entity';
import { UpdateQuestionarioRespostasDto } from './dto/update-questionario-respostas.dto';
import { TesteUpdateRespostaDto } from 'src/respostas/dto/teste-update-resposta.dto';
import { ArrayUpdateResposta } from 'src/respostas/dto/arrayUpdateResposta.dto';

@Injectable()
export class QuestionariosService {
  constructor(
    @InjectModel(Questionario)
    private questionarioModel: typeof Questionario,
    private readonly appService: AppService,
    @InjectModel(Pergunta)
    private readonly perguntaModel: typeof Pergunta,
    @InjectModel(Resposta)
    private readonly respostaModel: typeof Resposta,
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
        include: Pergunta.unscoped()
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


  async findAll(page: number = 1, limit: number = 10): Promise<Questionario[]> {
    // const limit = 10;
    const offset = (page - 1) * limit;

    return this.questionarioModel.findAll({
      offset,
      limit,
      include: Pergunta.unscoped(),
      order:['id']
    });
  }

  async findOne(id: number, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id, {
      include: Pergunta.unscoped()
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

  async findAllPerguntaWithResposta(page: number = 1, limit: number = 10, id: number, @Res() res): Promise<Pergunta[]> {
    // const limits = limit;
    const offset = (page - 1) * limit;

    let perguntas = await this.perguntaModel.findAll({
      offset,
      limit,
      where:{
        questionarioId:id
      },
      order:['id']
    });

    if (!perguntas) {
      return res.status(404).json({
        ...this.appService.resourceNotFoundResponse('pergunta')
      });
    }

    else {
      return res.json({
        error: false,
        perguntas
      })
    }
  }

  async createWithRespostas(id: number, createQuestionarioDto: CreateQuestionarioDto, @Res() res) {

    let perguntas = createQuestionarioDto.perguntas;

    for (const pergunta of perguntas) {
      let dbPergunta = await this.perguntaModel.findByPk(pergunta.id)

      if (dbPergunta === null || dbPergunta === undefined) {
        return res.status(400).json({
          error: true,
          msg: `id de pergunta fornecido não foi encontrado para este questionario ou não existe`
        })
      }

      if (dbPergunta.questionarioId !== id) {
        return res.status(400).json({
          error: true,
          msg: `id de pergunta fornecido não foi encontrado para este questionario ou não existe`
        })
      }

      for (const resposta of pergunta.respostas) {
        await this.respostaModel.create({
          name: resposta.name,
          perguntaId: pergunta.id
        });
      }
    }

    let questionario = await this.questionarioModel.scope('withPerguntas').findByPk(id);


    res.json({
      error: false,
      questionario
    });
  }

  async deleteRespostas(formid: number, questionid: number, @Res() res) {

    let questionario = await this.questionarioModel.scope('withPerguntas').findByPk(formid);

    if (!questionario) {
      return res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario')
      });
    }

    for (const pergunta of questionario.perguntas) {
      for (const resposta of pergunta.respostas) {
        if (resposta.id === questionid) {
          // console.log('PASSEI AQUI');
          await resposta.destroy();
        }
        else {
          return res.status(400).json({
            error: true,
            msg: `resposta id not associated with this questionario or not found`
          })
        }
      }
    }

    questionario = await this.questionarioModel.scope('withPerguntas').findByPk(formid);

    res.json({
      error: false,
      questionario
    })
  }

  async updateResposta(updateQuestionarioRespostasDto: ArrayUpdateResposta, formid: number, questionid: number, @Res() res) {

    let questionario = await this.questionarioModel.scope('withPerguntas').findByPk(formid);
    let pergunta = await this.perguntaModel.findByPk(questionid);

    if (!questionario || !pergunta) {
      return res.status(404).json({
        ...this.appService.resourceNotFoundResponse('questionario or pergunta')
      });
    }

    for (const resposta of updateQuestionarioRespostasDto.respostas) {
      let dbResposta = await this.respostaModel.findByPk(resposta.id);
      if (dbResposta == null || dbResposta == undefined || dbResposta.perguntaId !== questionid || pergunta.questionarioId !== questionario.id) {
        return res.status(404).json({
          error: true,
          msg: `id de resposta fornecido não está associado para esta pergunta, não existe ou id de questionario fornecido não está associado para esta pergunta`
        })
      }
      await dbResposta.update({
        name:resposta.name
      });

    }

    questionario = await this.questionarioModel.scope('withPerguntas').findByPk(formid);

    res.json({
      error: false,
      questionario
    })

  }

  async update(id: number, updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    let questionario = await this.questionarioModel.findByPk(id, {
      include: Pergunta.unscoped(),
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
      include: Pergunta.unscoped(),
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
