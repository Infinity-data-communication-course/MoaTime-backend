import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class validator 세팅
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://moatime-client.vercel.app',
      'https://moatime.vercel.app',
    ],
    credentials: true,
  });
  app.use(cookieParser());

  // swagger 세팅
  const config = new DocumentBuilder()
    .setTitle('MoaTime Server')
    .setDescription('MoaTime API description')
    .setVersion('1.0')
    .addTag('MoaTime')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
