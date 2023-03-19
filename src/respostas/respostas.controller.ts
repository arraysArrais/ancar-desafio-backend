import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('respostas')
@ApiBearerAuth()
@Controller('respostas')
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @Post()
  create(@Body() createRespostaDto: CreateRespostaDto) {
    return this.respostasService.create(createRespostaDto);
  }

  @Get()
  findAll() {
    return this.respostasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respostasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespostaDto: UpdateRespostaDto) {
    return this.respostasService.update(+id, updateRespostaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respostasService.remove(+id);
  }
}
