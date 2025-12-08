import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Włączamy walidację globalnie (dla DTO)
  app.useGlobalPipes(new ValidationPipe());

  // Konfiguracja Swaggera
  const config = new DocumentBuilder()
    .setTitle('CRUiU API')
    .setDescription('Dokumentacja API systemu zarządzania urządzeniami')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();