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
    
    @ApiProperty({
        description: 'Título da pergunta',
        example: 'Seu nome'
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
