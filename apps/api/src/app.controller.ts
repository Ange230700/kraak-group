import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }

  @Get('debug/env')
  getDebugEnv(): Record<string, string> {
    return {
      corsOriginsSet: process.env['CORS_ALLOWED_ORIGINS'] ? 'true' : 'false',
      corsOriginsLength: String(
        process.env['CORS_ALLOWED_ORIGINS']?.length ?? 0,
      ),
      nodeEnv: process.env['NODE_ENV'] ?? 'NOT_SET',
      port: process.env['PORT'] ?? 'NOT_SET',
    };
  }
}
