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

export class TesteUpdateRespostaDto {

    @ApiProperty({
        description: 'Id da resposta',
        example: 1
    })
    @IsString()
    @IsDefined()
    id: number;

    @ApiProperty({
        description: 'Nome da resposta',
        example: 'Sim'
    })
    @IsString()
    @IsDefined()
    name: string;
}
