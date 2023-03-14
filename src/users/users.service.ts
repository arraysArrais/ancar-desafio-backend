import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
// import {Request, Response} from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }


  async create(createUserDto: CreateUserDto, @Res() res) {
    // await bcrypt.loadSynchronized();
    if (createUserDto.nome && createUserDto.cpf && createUserDto.senha) {
      let credentials = {
        nome: createUserDto.nome,
        senha: createUserDto.senha,
        cpf: createUserDto.cpf
      };

      let hasUser = await this.userModel.findOne({
        where: {
          cpf: credentials.cpf
        }
      });

      if (!hasUser) {
        const salt: any = await bcrypt.genSalt(10);
        credentials.senha = await bcrypt.hash(credentials.senha, salt);

        let user = new this.userModel({
          nome: credentials.nome,
          senha: credentials.senha,
          cpf: credentials.cpf
        });

        await user.save();
        res.status(201).json({
          error:false,
          user:{
            id:user.id,
            nome:user.nome,
            cpf:user.cpf,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt

          }
        });
        
      }
      else {
        res.status(400).json({
          error: "CPF já existente"
        });
      }

      // return await this.userModel.create(credentials as any);
    }



  }

  findAll() {
    return this.userModel.findAll({
      attributes:['id', 'nome', 'cpf', 'updatedAt', 'createdAt']
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto, @Res() res) {

    //validando campos enviados pelo request body
    if (updateUserDto.nome && updateUserDto.cpf && updateUserDto.senha) {
      let user = await this.userModel.findByPk(id);

      //verificando se usuário existe
      if (user) {
        user.update({
          nome: updateUserDto.nome,
          senha: updateUserDto.senha,
          cpf: updateUserDto.cpf
        });
        res.json({
          error: false,
          user
        })
      }
      else {
        res.status(404).json({
          error: true,
          msg: 'User not Found'
        });
      }
    }
    else {
      res.status(422).json({
        error: true,
        msg: 'Invalid data'
      });
    }
  }

  async remove(id: number, @Res() res) {
    let user = await this.userModel.findByPk(id);
    user.destroy();

    res.json({
      error: false,
      msg: `User id ${id} deleted`
    });
  }
}
