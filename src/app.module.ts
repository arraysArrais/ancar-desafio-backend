import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'desafio_ancar',
      autoLoadModels: true,
      synchronize: true,
      models: [User],
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    //protegendo todas as rotas da aplicação com acesso via jwt token
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
