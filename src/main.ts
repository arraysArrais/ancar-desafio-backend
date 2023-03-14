import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const sequelize = new Sequelize({
  //   dialect:'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: '1234',
  //   database: 'desafio_ancar',
  // });
  // await sequelize.sync({ force: true });
  await app.listen(3000);
}
bootstrap();
