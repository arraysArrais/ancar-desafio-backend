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

    @Length(4,30)
    @IsString()
    @IsDefined()
    nome: string;

    @Length(8,20)
    @IsString()
    @IsDefined()
    senha: string;

    @Validate(ValidateCPF)
    @IsDefined()
    cpf: string;

}
