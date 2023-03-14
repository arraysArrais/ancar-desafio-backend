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
    Validate,} from 'class-validator';
    import { ValidateCPF } from './validateCPF';

export class CreateUserDto {

    @Length(4,30)
    @IsString()
    nome: string;

    @Length(8,20)
    @IsString()
    senha: string;

    @Validate(ValidateCPF)
    cpf: string;

}
