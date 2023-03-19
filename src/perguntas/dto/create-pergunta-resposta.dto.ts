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
    IsArray} from 'class-validator';
import { CreateRespostaDto } from 'src/respostas/dto/create-resposta.dto';

export class CreatePerguntaRespostaDto {

    @ApiProperty({
        description: 'Id da Pergunta',
        example: 5
    })
    id: number;
    
    @ApiProperty({
        description: 'Título da pergunta',
        example: 'Você recomendaria o Shopping a algum amigo/familiar?'
    })
    @Length(4,30)
    @IsString()
    @IsDefined()
    title: string;

    @ApiProperty({
        description: 'id do questionário para vincular a pergunta',
        example: '1'
    })
    @IsNumber()
    @IsDefined()
    questionarioId: number;

    @ApiProperty({
        type:[CreateRespostaDto],
        description: 'Respostas da pergunta em questão',
        example:[{name:'Sim, recomendaria!'}, {name:'Não recomendaria'}, {name:'Talvez'}]
    })
    @IsDefined()
    @IsArray()
    respostas: CreateRespostaDto[];
}
