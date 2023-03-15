import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy] //sempre que tivermos um injectable, precisamos disponibilizá-lo num módulo.
                                          //ao fazer isso, o nest saberá como injetar esse cara quando solicitado
})
export class AuthModule {}
