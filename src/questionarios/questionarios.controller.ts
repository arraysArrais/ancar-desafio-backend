import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


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
  @Get()
  findAll(@Query('page') page: number = 1) {
    return this.questionariosService.findAll(page);
  }

  @ApiResponse({ status: 200, description: 'Record successfully retrieved.'})
  @ApiResponse({ status: 404, description: 'Questionario id not found.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.questionariosService.findOne(+id, res);
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
