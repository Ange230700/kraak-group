import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env['CORS_ALLOWED_ORIGINS'];
  if (corsOrigins) {
    app.enableCors({
      origin: corsOrigins.split(',').map((o) => o.trim()),
    });
  }

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);
}

bootstrap();
