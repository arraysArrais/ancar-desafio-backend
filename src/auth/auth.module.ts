import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '1h'},
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy] //sempre que tivermos um injectable, precisamos disponibilizá-lo num módulo.
                                          //ao fazer isso, o nest saberá como injetar esse cara quando solicitado
})
export class AuthModule {}
