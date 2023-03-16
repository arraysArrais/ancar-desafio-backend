import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query } from '@nestjs/common';
import { QuestionariosService } from './questionarios.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('questionario')
@ApiBearerAuth()
@Controller('questionarios')
export class QuestionariosController {
  constructor(private readonly questionariosService: QuestionariosService) {}

  @Post()
  create(@Body() createQuestionarioDto: CreateQuestionarioDto, @Res() res) {
    return this.questionariosService.create(createQuestionarioDto, res);
  }

  @ApiQuery({ name: 'page', required: false })
  @Get()
  findAll(@Query('page') page: number = 1) {
    return this.questionariosService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    return this.questionariosService.findOne(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto, @Res() res) {
    return this.questionariosService.update(+id, updateQuestionarioDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.questionariosService.remove(+id, res);
  }
}
