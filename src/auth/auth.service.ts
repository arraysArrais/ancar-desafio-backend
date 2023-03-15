import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

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
