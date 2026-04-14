import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { resolveApiEnvFilePaths } from './config/environment-files';
import { SupabaseModule } from './supabase/supabase.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolveApiEnvFilePaths(process.env['NODE_ENV']),
    }),
    SupabaseModule,
    SupportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
