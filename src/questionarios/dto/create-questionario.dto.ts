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
import { Pergunta } from './pergunta.dto';


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
        example: 'Pesquisa de satisfação do Shopping Nova América'
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
        example: [{ title: 'Quais Lojas você gostaria de ter no Shopping?' }, { title: 'O que poderiamos melhorar?' }, { title: 'Você recomenda o Shopping Nova América para amigos e familiares?' }],
        type: [Object],
      })
    @IsDefined()
    @IsArray()
    perguntas: Pergunta[]
}
