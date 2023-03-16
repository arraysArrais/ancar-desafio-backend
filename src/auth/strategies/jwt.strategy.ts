import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserFromJwt } from '../models/UserFromJwt';
// import { UserPayload } from '../models/UserPayload';
// import {User} from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload): any {
    console.log('Payload do token JWT: ');
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
      nome: payload.nome,
    };
  }

  // validate(payload: any): {
  //   console.log(payload);
  //   return payload
  // }
}