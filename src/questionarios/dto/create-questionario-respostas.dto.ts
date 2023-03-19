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
import { CreatePerguntaRespostaDto } from 'src/perguntas/dto/create-pergunta-resposta.dto';


export class CreateQuestionarioRespostasDto {

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
        example:[
            {   
                id: 5,
                title:'Você recomendaria o Shopping a algum familiar?',
                respostas: [
                    { name: 'Sim, recomendaria!' },
                    { name: 'Não recomendaria' },
                    { name: 'Talvez' },
                  ],
            }, 
            {
                id: 6,
                title:'Qual loja mais gostaria de trazer para o Shopping?',
                respostas: [
                    { name: 'Loja 1' },
                    { name: 'Loja 2' },
                    { name: 'Loja 3' },
                  ],
            }, 
            {
                id: 7,
                title:'Nosso estacionamento lhe atende?',
                respostas: [
                    { name: 'Sim, atende bem' },
                    { name: 'Não atende muito bem' },
                    { name: 'Não atende bem' },
                  ],
            }]
    })
    @IsDefined()
    @IsArray()
    perguntas: CreatePerguntaRespostaDto[];
}
