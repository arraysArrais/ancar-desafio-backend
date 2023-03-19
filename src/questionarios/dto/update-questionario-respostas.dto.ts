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
import { UpdatePerguntaRespostaDto } from 'src/perguntas/dto/update-pergunta-resposta.dto';


export class UpdateQuestionarioRespostasDto {

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
                id: 115,
                title:'Você recomendaria o Shopping a algum familiar?',
                respostas: [
                    { 
                        id: 121,
                        name: 'Sim, recomendaria!' 
                    },
                    {
                        id: 122,
                        name: 'Não recomendaria' 
                    },
                    {
                        id: 123,
                        name: 'Talvez' 
                    },
                  ],
            }, 
            {
                id: 116,
                title:'Qual loja mais gostaria de trazer para o Shopping?',
                respostas: [
                    {
                        id: 124, 
                        name: 'Loja 1' 
                    },
                    { 
                        id: 125, 
                        name: 'Loja 2' 
                    },
                    { 
                        id: 126, 
                        name: 'Loja 3' 
                    },
                  ],
            }, 
            {
                id: 117,
                title:'Nosso estacionamento lhe atende?',
                respostas: [
                    {   
                        id: 127,
                        name: 'Sim, atende bem' 
                    },
                    { 
                        id: 128,
                        name: 'Não atende muito bem' 
                    },
                    { 
                        id: 129,
                        name: 'Não atende bem' 
                    },
                  ],
            }]
    })
    @IsDefined()
    @IsArray()
    perguntas: UpdatePerguntaRespostaDto[];
}
