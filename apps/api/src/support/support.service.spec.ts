import { Test, TestingModule } from '@nestjs/testing';
import { SupportService } from './support.service';

describe('SupportService', () => {
  let service: SupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportService],
    }).compile();

    service = module.get<SupportService>(SupportService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  // Given un DTO de contact/support valide
  // When on soumet la demande
  // Then le service renvoie un accusé de réception simple
  it('Given une demande valide, When submitContact est appelé, Then un accusé de réception est renvoyé', () => {
    expect(
      service.submitContact({
        name: 'Alice Dupont',
        email: 'alice@exemple.com',
        subject: 'Renseignements',
        message: 'Bonjour, je voudrais en savoir plus sur vos programmes.',
        category: 'other',
      }),
    ).toEqual({
      success: true,
      message:
        'Votre message a bien été reçu. Nous vous répondrons dans les plus brefs délais.',
    });
  });
});
