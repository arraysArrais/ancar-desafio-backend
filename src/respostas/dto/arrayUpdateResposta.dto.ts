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
    import { TesteUpdateRespostaDto } from 'src/respostas/dto/teste-update-resposta.dto';

export class ArrayUpdateResposta {

    @ApiProperty({
        description: 'Array de respostas',
        example: [
            {   
                id:1,
                name:"Resposta 1"
            },
            {   
                id:2,
                name:"Resposta 2"
            },
            {   
                id:3,
                name:"Resposta 3"
            }
        ]
    })
    @IsArray()
    @IsDefined()
    respostas: TesteUpdateRespostaDto[];
}
