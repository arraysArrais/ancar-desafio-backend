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
    import { ValidateCPF } from './validateCPF';

export class CreateUserDto {

    @ApiProperty({
        description: 'Utilizado para representar o nome do usuário',
        example: 'João Mesquita'
    })
    @Length(4,30)
    @IsString()
    @IsDefined()
    nome: string;

    @ApiProperty({
        description: 'A password deve ter entre 8 e 20 caracteres',
        example: '12345678',
        required: true,
        nullable: false,
    })
    @Length(8,20)
    @IsString()
    @IsDefined()
    password: string;

    @ApiProperty({
        description: 'CPF do usuário. Deve ser enviado um CPF válido e o mesmo deve ser único na base.',
        example: '44554144011'
    })
    @ApiProperty()
    @Validate(ValidateCPF)
    @IsDefined()
    cpf: string;

    @ApiProperty({
        description: 'Email do usuário. Deve ser enviado um E-mail válido e o mesmo deve ser único na base.',
        example: 'teste@ancar.com.br'
    })
    @IsDefined()
    @IsEmail()
    email: string;

}
