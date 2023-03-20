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


@ApiTags('questionarios')
@ApiBearerAuth()
@Controller('questionarios')
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request: name, description, userId, and perguntas are required fields.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Post()
  create(@Body() createQuestionarioDto: CreateQuestionarioDto, @Res() res) {
    return this.questionariosService.create(createQuestionarioDto, res);
  }

  @ApiResponse({ status: 200, description: 'All records has been successfully retrieved.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  findAll(@Query('page') page: number = 1,@Query('limit') limit: number = 10) {
    return this.questionariosService.findAll(page, limit);
  }

  @ApiResponse({ status: 200, description: 'Record successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'Questionario id not found.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.questionariosService.findOne(+id, res);
  }

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


  @Post(':id/respostas')
  createWithRespostas(@Param('id') id: string, @Body() createQuestionarioRespostasDto: CreateQuestionarioRespostasDto, @Res() res){
    return this.questionariosService.createWithRespostas(+id, createQuestionarioRespostasDto, res)
  }

  @Put(':formid/resposta/:questionid')
  updateResposta(@Body() updateQuestionarioRespostasDto: ArrayUpdateResposta, @Param('formid') formid: string, @Param('questionid') questionid: string, @Res() res){
    return this.questionariosService.updateResposta(updateQuestionarioRespostasDto, +formid, +questionid, res)
  }

  @Delete(':formid/respostas/:answerid')
  deleteRespostas(@Param('formid') formid: string, @Param('answerid') answerid: string, @Res() res){
    return this.questionariosService.deleteRespostas(+formid, +answerid, res);
  }

  @ApiResponse({ status: 200, description: 'Record successfully updated.'})
  @ApiResponse({ status: 404, description: 'Questionario record not found in the database.'})
  @ApiResponse({ status: 400, description: 'Question id is not associated with this questionario record or does not exist'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    return this.questionariosService.update(+id, updateQuestionarioDto, res);
  }

  @ApiResponse({ status: 200, description: 'Record successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Questionario record not found in the database.'})
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.questionariosService.remove(+id, res);
  }
}
