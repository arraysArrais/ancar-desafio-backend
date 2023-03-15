import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  create(@Body() createQuestionarioDto: CreateQuestionarioDto) {
    return this.questionariosService.create(createQuestionarioDto);
  }

  @Get()
  findAll() {
    return this.questionariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto) {
    return this.questionariosService.update(+id, updateQuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionariosService.remove(+id);
  }
}
