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
        example: 'Pesquisa de Satisfação do Shopping Nova América'
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
        example:[{title:'Você recomendaria o Shopping a algum familiar?'}, {title:'Qual loja mais gostaria de trazer para o Shopping?'}, {title:'Nosso estacionamento lhe atende?'}]
    })
    @IsDefined()
    @IsArray()
    perguntas: CreatePerguntaDto[];
}
