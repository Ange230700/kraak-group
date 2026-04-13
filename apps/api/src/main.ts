import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env['CORS_ALLOWED_ORIGINS'];
  if (corsOrigins) {
    app.enableCors({
      origin: corsOrigins.split(',').map((o) => o.trim()),
    });
  } else {
    app.enableCors();
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KRAAK API')
    .setDescription(
      'API backend du projet KRAAK — formation, gestion de projet et conseil en immigration.',
    )
    .setVersion('0.1.0')
    .addTag('Health', "Vérification de l'état de l'API")
    .addTag('Support', 'Formulaire de contact et demandes de support')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
}

bootstrap();
