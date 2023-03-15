require("dotenv").config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Desafio Ancar')
    .setDescription('APIs para o backend do desafio Ancar')
    .setVersion('1.0')
    // .addTag('teste')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(process.env.JWT_SECRET);
}
bootstrap();
