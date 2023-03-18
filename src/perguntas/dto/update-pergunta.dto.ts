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

import { PartialType } from '@nestjs/swagger';
import { CreatePerguntaDto } from './create-pergunta.dto';

export class UpdatePerguntaDto extends PartialType(CreatePerguntaDto) {
    @ApiProperty({
        description: 'Id da pergunta a ser editada. Este id precisa ser de uma pergunta relacionada ao questionário enviado no payload da requisição',
        example: 1
    })
    @IsNumber()
    @IsDefined()
    id: number;
    
    @ApiProperty({
        description: 'Título da pergunta',
        example: 'Você recomendaria o Shopping a algum amigo/familiar?'
    })
    @Length(4,30)
    @IsString()
    @IsDefined()
    title: string;

}
