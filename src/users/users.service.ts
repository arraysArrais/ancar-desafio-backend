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
        let newUser = await this.userModel.create(credentials);
        res.status(201).json({
          error: false,
          user: {
            id: newUser.id,
            nome: newUser.nome,
            cpf: newUser.cpf,
            updatedAt: newUser.updatedAt,
            createdAt: newUser.createdAt

          }
        });
      }
      else {
        res.status(400).json({
          error: "CPF já existente"
        });
      }
    }



  }

  findAll() {
    return this.userModel.findAll({
      attributes: ['id', 'nome', 'cpf', 'updatedAt', 'createdAt']
    });
  }

  async findOne(id: number, @Res() res) {
    let user = await this.userModel.findByPk(id, {
      attributes:['id', 'nome', 'cpf', 'updatedAt', 'createdAt']
    });

    if (!user) {
      res.status(404).json({
        error: 'true',
        msg: 'user not found'
      });
    }

    else{
      res.json({
        error: false,
        user
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, @Res() res) {

    let user = await this.userModel.findByPk(id);
    if (!user) {
      res.status(404).json({
        error: 'true',
        msg: 'user not found'
      });
    }

    //caso sejam enviados valores nulos na request..
    if (updateUserDto.nome === null) {
      updateUserDto.nome = user.nome;
    }

    if (updateUserDto.senha === null) {
      updateUserDto.senha = user.senha;
    }

    // if(updateUserDto.cpf === null){
    //   updateUserDto.cpf = user.cpf;
    // }

    user.update({
      nome: updateUserDto.nome,
      senha: updateUserDto.senha,
      // cpf:updateUserDto.cpf
    });

    res.json({
      error: false,
      user: {
        id: user.id,
        nome: user.nome,
        cpf: user.cpf,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      }
    });


  }

  async remove(id: number, @Res() res) {
    let user = await this.userModel.findByPk(id);

    if (!user) {
      res.status(404).json({
        error: 'true',
        msg: 'user not found'
      });
    }
    else {
      user.destroy();

      res.json({
        error: false,
        msg: `User id ${id} deleted`
      });
    }

  }
}
