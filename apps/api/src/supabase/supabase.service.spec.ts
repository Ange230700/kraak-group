import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('SupabaseService', () => {
  let service: SupabaseService;
  const mockClient = { from: jest.fn() };
  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      if (key === 'SUPABASE_URL') {
        return 'https://example.supabase.co';
      }

      if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
        return 'service-role-key';
      }

      throw new Error(`Unexpected config key: ${key}`);
    }),
  };

  beforeEach(async () => {
    jest.mocked(createClient).mockReturnValue(mockClient as never);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupabaseService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SupabaseService>(SupabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  // Given les variables Supabase sont disponibles
  // When le module initialise le service
  // Then un client partagé est créé avec ces valeurs
  it("Given la configuration Supabase, When onModuleInit est appelé, Then le client partagé est créé", () => {
    service.onModuleInit();

    expect(createClient).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'service-role-key',
    );
    expect(service.getClient()).toBe(mockClient);
  });
});
