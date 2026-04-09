import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Given le service AppService est instancié
  // When on appelle getHealth()
  // Then on reçoit { status: "ok" }
  it('getHealth — should return { status: "ok" }', () => {
    expect(service.getHealth()).toEqual({ status: 'ok' });
  });
});
