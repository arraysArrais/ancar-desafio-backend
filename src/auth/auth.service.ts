import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService,
        ){}

    login(user: User): UserToken {
        //Transforma o user em JWT
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.nome,
        };

        const jwtToken = this.jwtService.sign(payload);
        return {
            access_token: jwtToken
        }
    }
    

    async validateUser(email: string, password: string) {
        const user: any = await this.userService.findByEmail(email);
        if(user){
            //batendo password enviada no payload da request com hash que está no banco
            let isPasswordValid = await bcrypt.compare(password, user.password);

            if(isPasswordValid){
                return{
                    ...user,
                    password: undefined,
                }
            }
        }
        //Não encontrou usuário ou password inválida
        throw new Error('Email ou password incorretos');
    }
}
