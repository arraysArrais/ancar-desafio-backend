import { CreatePerguntaDto } from 'src/perguntas/dto/create-pergunta.dto';
import { ApiProperty } from '@nestjs/swagger';
import {validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString,
    IsNumber,
    MinLength,
    MaxLength,
    Validate,
    IsDefined,
    IsArray,} from 'class-validator';
import { Type } from 'class-transformer';
import { Pergunta } from 'src/perguntas/entities/pergunta.entity';


export class CreateQuestionarioDto {

    @ApiProperty({
        description: 'Utilizado para representar o nome do questionário',
        example: 'NPS - SNA'
    })
    @Length(4,30)
    @IsString()
    @IsDefined()
    name: string;


    @ApiProperty({
        description: 'Descrição do formulário',
        example: 'Das lojas abaixo, quais você gostaria de trazer para o Shopping Nova América?'
    })
    @Length(4,120)
    @IsString()
    @IsDefined()
    description: string;

    @IsNumber()
    @IsDefined()
    @ApiProperty({
        description: 'id do usuário para vincular a criação do formulário',
        example: '1'
    })
    userId: number;

    @ApiProperty({
        // type: ()=>[CreatePerguntaDto],
        example:[{title:'Renner'}, {title:'Polo Wear'}, {title:'Brownieria'}]
    })
    @IsDefined()
    @IsArray()
    perguntas: CreatePerguntaDto[];
}
