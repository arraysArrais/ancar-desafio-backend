import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, Put } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { CreateQuestionarioRespostasDto } from './dto/create-questionario-respostas.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateQuestionarioRespostasDto } from './dto/update-questionario-respostas.dto';
import { TesteUpdateRespostaDto } from 'src/respostas/dto/teste-update-resposta.dto';
import { ArrayUpdateResposta } from 'src/respostas/dto/arrayUpdateResposta.dto';

let teste :any= {
  teste:"oie"
}



@ApiBearerAuth()
@Controller('questionarios')
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) {}

  @ApiTags('questionarios')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request: name, description, userId, and perguntas are required fields.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Post()
  create(@Body() createQuestionarioDto: CreateQuestionarioDto, @Res() res) {
    return this.questionariosService.create(createQuestionarioDto, res);
  }

  @ApiTags('questionarios')
  @ApiResponse({ status: 200, description: 'All records has been successfully retrieved.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  findAll(@Query('page') page: number = 1,@Query('limit') limit: number = 10) {
    return this.questionariosService.findAll(page, limit);
  }

  @ApiTags('questionarios')
  @ApiResponse({ status: 200, description: 'Record successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'Questionario id not found.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.questionariosService.findOne(+id, res);
  }
  
  @ApiTags('questionarios')
  @ApiResponse({ status: 200, description: 'Record successfully updated.'})
  @ApiResponse({ status: 404, description: 'Questionario record not found in the database.'})
  @ApiResponse({ status: 400, description: 'Question id is not associated with this questionario record or does not exist'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    return this.questionariosService.update(+id, updateQuestionarioDto, res);
  }

  @ApiTags('questionarios')
  @ApiResponse({ status: 200, description: 'Record successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Questionario record not found in the database.'})
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.questionariosService.remove(+id, res);
  }

  @ApiTags('respostas')
  @ApiResponse({ status: 200, description: 'Record successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'Record not found in the database.'})
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get(':id/respostas')
  findAllPerguntaWithResposta(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10, 
    @Param('id') id: string, 
    @Res() res) {
    return this.questionariosService.findAllPerguntaWithResposta(page, limit, +id, res);
  }

  @ApiTags('respostas')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Pergunta not associated with this questionario or does not exist.'})
  @Post(':id/respostas')
  createWithRespostas(@Param('id') id: string, @Body() createQuestionarioRespostasDto: CreateQuestionarioRespostasDto, @Res() res){
    return this.questionariosService.createWithRespostas(+id, createQuestionarioRespostasDto, res)
  }

  @ApiResponse({ status: 404, description: 'Questionario or pergunta record not found.'})
  @ApiResponse({ status: 400, description: 'Resposta not associated with this pergunta or questionario not associated with this pergunta.'})
  @ApiResponse({ status: 200, description: 'Record successfully updated.'})
  @ApiTags('respostas')
  @Put(':formid/resposta/:questionid')
  updateResposta(@Body() updateQuestionarioRespostasDto: ArrayUpdateResposta, @Param('formid') formid: string, @Param('questionid') questionid: string, @Res() res){
    return this.questionariosService.updateResposta(updateQuestionarioRespostasDto, +formid, +questionid, res)
  }

  @ApiResponse({ status: 200, description: 'Record successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Questionario or resposta record not found.'})
  @ApiResponse({ status: 400, description: 'Resposta not associated with this questionario or not found.'})
  @ApiTags('respostas')
  @Delete(':formid/respostas/:answerid')
  deleteRespostas(@Param('formid') formid: string, @Param('answerid') answerid: string, @Res() res){
    return this.questionariosService.deleteRespostas(+formid, +answerid, res);
  }
}
