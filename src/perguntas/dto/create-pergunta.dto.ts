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
    IsDefined,} from 'class-validator';

export class CreatePerguntaDto {

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
}
