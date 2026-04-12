import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupportModule } from './support/support.module';

@Module({
  imports: [SupportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
