import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
    validate,
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
    IsArray
} from 'class-validator';
import { UpdatePerguntaDto } from 'src/perguntas/dto/update-pergunta.dto';
import { CreateQuestionarioDto } from './create-questionario.dto';

export class UpdateQuestionarioDto {
    @ApiProperty({
        description: 'Utilizado para representar o nome do questionário',
        example: 'NPS - SNA'
    })
    @Length(4, 30)
    @IsString()
    @IsDefined()
    name: string;


    @ApiProperty({
        description: 'Descrição do formulário',
        example: 'Qual loja você gostaria de trazer para o Shopping Nova América?'
    })
    @Length(4, 120)
    @IsString()
    @IsDefined()
    description: string;

    @ApiProperty({
        example: 
    [
        {
            id: 1,
            title: 'Você recomendaria o Shopping a algum familiar?'
        }, 
        {
            id: 2,
            title: 'Qual loja mais gostaria de trazer para o Shopping?'
        }, 
        {
            id: 3,
            title: 'Nosso estacionamento lhe atende?'
        }
    ]
    })
    @IsDefined()
    @IsArray()
    perguntas: UpdatePerguntaDto[];
}
