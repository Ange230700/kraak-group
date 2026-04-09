import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Given le serveur API est démarré
  // When un client envoie GET /health
  // Then la réponse contient { status: "ok" }
  it('GET /health — should return status ok', () => {
    expect(controller.getHealth()).toEqual({ status: 'ok' });
  });
});
