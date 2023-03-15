import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  validate,
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
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Utilizado para representar o nome do usuário',
    example: 'João Mesquita'
  })
  @Length(4, 30)
  @IsString()
  // @IsDefined()
  nome: any;

  @ApiProperty({
    description: 'A password deve ter entre 8 e 20 caracteres',
    example: '12345678',
    required: true,
    nullable: false,
  })
  @Length(8, 20)
  @IsString()
  // @IsDefined()
  password: string;
  // cpf: any;
}
