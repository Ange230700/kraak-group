import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  // Given un DTO de contact valide
  // When on appelle submit()
  // Then la réponse indique le succès et contient un message de confirmation
  it('submit — devrait renvoyer success:true avec un message de confirmation', () => {
    const result = service.submit({
      name: 'Alice Dupont',
      email: 'alice@exemple.com',
      subject: 'Renseignements',
      message: 'Bonjour, je voudrais en savoir plus sur vos programmes.',
    });

    expect(result.success).toBe(true);
    expect(result.message).toBeTruthy();
  });
});
